// Genera public/blog/<slug>.html y public/data/posts.json a partir de los
// posts "Published" de una base de datos de Notion.
//
// Requiere las variables de entorno NOTION_TOKEN y NOTION_DATABASE_ID
// (en local: archivo .env.local; en Vercel: Project Settings > Environment Variables).
//
// Uso: node scripts/generate-blog-posts.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "blog");
const POSTS_JSON_PATH = path.join(ROOT, "public", "data", "posts.json");
const SITE_URL = "https://kairospro.online";
const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!match) return;
    const key = match[1];
    let value = match[2] || "";
    value = value.replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  });
}

loadEnvLocal();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

function notionHeaders() {
  return {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugify(text) {
  return (
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "post"
  );
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

function plainTextFrom(richText) {
  return (richText || []).map((rt) => rt.plain_text || "").join("");
}

function plainTextToHtml(text) {
  if (!text) return "";
  return text
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => `<p>${escapeHtml(para).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function richTextToHtml(richText) {
  if (!richText || !richText.length) return "";
  return richText
    .map((rt) => {
      let text = escapeHtml(rt.plain_text || "");
      const ann = rt.annotations || {};
      if (ann.code) text = `<code>${text}</code>`;
      if (ann.bold) text = `<strong>${text}</strong>`;
      if (ann.italic) text = `<em>${text}</em>`;
      if (rt.href) text = `<a href="${rt.href}" target="_blank" rel="noopener">${text}</a>`;
      return text;
    })
    .join("");
}

function blocksToHtml(blocks) {
  let html = "";
  let listBuffer = [];
  let listType = null;

  function flushList() {
    if (listBuffer.length) {
      const tag = listType === "numbered_list_item" ? "ol" : "ul";
      html += `<${tag}>${listBuffer.join("")}</${tag}>`;
      listBuffer = [];
      listType = null;
    }
  }

  for (const block of blocks) {
    const type = block.type;

    if (type === "bulleted_list_item" || type === "numbered_list_item") {
      if (listType && listType !== type) flushList();
      listType = type;
      listBuffer.push(`<li>${richTextToHtml(block[type].rich_text)}</li>`);
      continue;
    }

    flushList();

    switch (type) {
      case "paragraph":
        if (block.paragraph.rich_text.length) html += `<p>${richTextToHtml(block.paragraph.rich_text)}</p>`;
        break;
      case "heading_1":
      case "heading_2":
        html += `<h2>${richTextToHtml(block[type].rich_text)}</h2>`;
        break;
      case "heading_3":
        html += `<h3>${richTextToHtml(block.heading_3.rich_text)}</h3>`;
        break;
      case "quote":
        html += `<blockquote>${richTextToHtml(block.quote.rich_text)}</blockquote>`;
        break;
      case "image": {
        const url = block.image?.file?.url || block.image?.external?.url;
        if (url) html += `<img src="${escapeHtml(url)}" alt="" loading="lazy" />`;
        break;
      }
      case "divider":
        html += "<hr />";
        break;
      default:
        break;
    }
  }

  flushList();
  return html;
}

async function fetchBlockChildren(blockId) {
  const results = [];
  let cursor;

  do {
    const url = new URL(`${NOTION_API}/blocks/${blockId}/children`);
    url.searchParams.set("page_size", "100");
    if (cursor) url.searchParams.set("start_cursor", cursor);

    const res = await fetch(url.toString(), { headers: notionHeaders() });
    if (!res.ok) throw new Error(`Notion blocks fetch failed: ${res.status}`);
    const data = await res.json();
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return results;
}

async function queryPublishedPages() {
  const results = [];
  let cursor;

  do {
    const res = await fetch(`${NOTION_API}/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({
        filter: { property: "published", status: { equals: "Published" } },
        sorts: [{ property: "date", direction: "descending" }],
        start_cursor: cursor,
        page_size: 100,
      }),
    });
    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Notion database query failed: ${res.status} ${errBody}`);
    }
    const data = await res.json();
    results.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return results;
}

async function getPublishedPosts() {
  const pages = await queryPublishedPages();
  const usedSlugs = new Set();
  const posts = [];

  for (const page of pages) {
    const props = page.properties || {};
    const titulo = plainTextFrom(props.Nombre?.title) || "Sin título";
    const category = props.category?.select?.name || null;
    const fecha = props.date?.date?.start || null;
    const extracto = plainTextFrom(props.excerpt?.rich_text);
    const contentProp = plainTextFrom(props.content?.rich_text);
    const coverFile = props.cover?.files?.[0];
    const imagen_destacada = coverFile?.file?.url || coverFile?.external?.url || null;

    let slugBase = slugify(titulo);
    let slug = slugBase;
    let i = 2;
    while (usedSlugs.has(slug)) slug = `${slugBase}-${i++}`;
    usedSlugs.add(slug);

    // El cuerpo del post puede vivir en la propiedad "content" (texto plano,
    // típico de posts importados de LinkedIn) o como bloques de la página
    // en Notion. Se usa lo que haya; si ambos existen, prevalece "content".
    let contenido_html = plainTextToHtml(contentProp);
    if (!contenido_html) {
      const blocks = await fetchBlockChildren(page.id);
      contenido_html = blocksToHtml(blocks);
    }

    posts.push({
      id: page.id,
      titulo,
      slug,
      fecha,
      extracto,
      meta_descripcion: extracto,
      tags: category ? [category] : [],
      imagen_destacada,
      contenido_html,
    });
  }

  return posts.sort((a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0));
}

function template(post) {
  const url = `${SITE_URL}/blog/${post.slug}.html`;
  const image = post.imagen_destacada
    ? post.imagen_destacada
    : `${SITE_URL}/logo-kairos.png`;
  const tagsHtml = post.tags.map((t) => `<span class="blog-post-tag">${escapeHtml(t)}</span>`).join("");
  const shareText = encodeURIComponent(post.titulo);
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`;
  const heroImage = post.imagen_destacada
    ? `<img class="blog-post-cover" src="${escapeHtml(post.imagen_destacada)}" alt="${escapeHtml(post.titulo)}" />`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(post.titulo)} | Kairos · Juan Camilo Alvarado</title>
  <meta name="description" content="${escapeHtml(post.meta_descripcion)}" />
  <link rel="canonical" href="${url}" />

  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(post.titulo)}" />
  <meta property="og:description" content="${escapeHtml(post.meta_descripcion)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:locale" content="es_CO" />
  <meta property="article:published_time" content="${post.fecha || ""}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(post.titulo)}" />
  <meta name="twitter:description" content="${escapeHtml(post.meta_descripcion)}" />
  <meta name="twitter:image" content="${image}" />
  <meta name="twitter:site" content="@Djuank" />

  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="/css/blog.css" />

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${escapeHtml(post.titulo)}",
    "description": "${escapeHtml(post.meta_descripcion)}",
    "datePublished": "${post.fecha || ""}",
    "author": { "@type": "Person", "name": "Juan Camilo Alvarado" },
    "image": "${image}",
    "mainEntityOfPage": "${url}"
  }
  </script>
</head>
<body class="blog-body" data-post-slug="${escapeHtml(post.slug)}">
  <header class="blog-header">
    <div class="blog-container blog-header-inner">
      <a class="blog-logo" href="/blog/index.html">Kairos<span>.</span></a>
      <nav class="blog-nav">
        <a href="/blog/index.html#posts">Artículos</a>
        <a href="/blog/index.html#suscribete">Suscríbete</a>
        <a href="/">Kairos Automatizaciones</a>
      </nav>
    </div>
  </header>

  <main class="blog-container blog-post-layout">
    <article>
      <p class="blog-post-breadcrumb"><a href="/blog/index.html">← Volver al blog</a></p>
      <div class="blog-post-tags">${tagsHtml}</div>
      <h1 class="blog-post-title">${escapeHtml(post.titulo)}</h1>
      <p class="blog-post-subtitle">${escapeHtml(post.extracto)}</p>
      <div class="blog-post-meta">
        <span>Juan Camilo Alvarado</span>
        <span>·</span>
        <time datetime="${post.fecha || ""}">${formatDate(post.fecha)}</time>
      </div>

      ${heroImage}

      <div class="blog-post-content">
        ${post.contenido_html}
      </div>

      <div class="blog-share">
        <a class="blog-share-btn blog-share-linkedin" href="${linkedinShare}" target="_blank" rel="noopener">Compartir en LinkedIn</a>
        <a class="blog-share-btn blog-share-twitter" href="${twitterShare}" target="_blank" rel="noopener">Compartir en X</a>
      </div>
    </article>

    <aside class="blog-sidebar">
      <div class="blog-sidebar-box">
        <h4>Sobre el autor</h4>
        <img class="blog-author-avatar" src="/logo-kairos.png" alt="Juan Camilo Alvarado" />
        <p class="blog-author-name">Juan Camilo Alvarado</p>
        <p class="blog-author-bio">Fundador de Kairos Automatizaciones. Escribo sobre liderazgo, ventas y las conexiones que de verdad importan en el trabajo.</p>
        <div class="blog-sidebar-socials">
          <a href="https://www.linkedin.com/in/juan-camilo-alvarado-luna-0b248741/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://x.com/Djuank" target="_blank" rel="noopener">X</a>
        </div>
      </div>

      <div class="blog-sidebar-box">
        <h4>Últimos posts</h4>
        <ul class="blog-sidebar-list" id="blog-sidebar-recent"></ul>
      </div>

      <div class="blog-sidebar-box">
        <h4>Temas</h4>
        <div class="blog-sidebar-tags" id="blog-sidebar-tags"></div>
      </div>
    </aside>
  </main>

  <footer class="blog-footer">
    <div class="blog-container">
      <p>© <span id="blog-year"></span> Juan Camilo Alvarado · Kairos es un proyecto personal, independiente de <a href="/">Kairos Automatizaciones</a>.</p>
    </div>
  </footer>

  <script>
    document.getElementById("blog-year").textContent = new Date().getFullYear();
  </script>
  <script src="/js/blog.js"></script>
</body>
</html>
`;
}

async function main() {
  if (!NOTION_TOKEN || !DATABASE_ID) {
    console.error(
      "Faltan NOTION_TOKEN y/o NOTION_DATABASE_ID (revisa .env.local o las variables de entorno de Vercel). Se omite la generación."
    );
    process.exit(1);
  }

  console.log("Consultando posts publicados en Notion...");
  const posts = await getPublishedPosts();
  console.log(`Encontrados ${posts.length} posts publicados.`);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  posts.forEach((post) => {
    const outPath = path.join(OUT_DIR, `${post.slug}.html`);
    fs.writeFileSync(outPath, template(post), "utf-8");
    console.log(`Generado: public/blog/${post.slug}.html`);
  });

  const listingData = posts.map(({ contenido_html, ...rest }) => rest);
  fs.mkdirSync(path.dirname(POSTS_JSON_PATH), { recursive: true });
  fs.writeFileSync(POSTS_JSON_PATH, JSON.stringify(listingData, null, 2), "utf-8");
  console.log("Actualizado: public/data/posts.json");
}

main().catch((err) => {
  console.error("Error generando el blog desde Notion:", err);
  process.exit(1);
});
