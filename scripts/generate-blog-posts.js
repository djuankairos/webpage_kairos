// Genera public/blog/<slug>.html para cada post en public/data/posts.json
// Uso: node scripts/generate-blog-posts.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const POSTS_PATH = path.join(ROOT, "public", "data", "posts.json");
const OUT_DIR = path.join(ROOT, "public", "blog");
const SITE_URL = "https://kairospro.online";

const posts = JSON.parse(fs.readFileSync(POSTS_PATH, "utf-8"));

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function template(post) {
  const url = `${SITE_URL}/blog/${post.slug}.html`;
  const image = post.imagen_destacada.startsWith("http")
    ? post.imagen_destacada
    : `${SITE_URL}${post.imagen_destacada}`;
  const tagsHtml = post.tags
    .map((t) => `<span class="blog-post-tag">${escapeHtml(t)}</span>`)
    .join("");
  const shareText = encodeURIComponent(post.titulo);
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(url)}`;

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
  <meta property="article:published_time" content="${post.fecha}" />

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
    "datePublished": "${post.fecha}",
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
        <time datetime="${post.fecha}">${formatDate(post.fecha)}</time>
      </div>

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

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

posts.forEach((post) => {
  const outPath = path.join(OUT_DIR, `${post.slug}.html`);
  fs.writeFileSync(outPath, template(post), "utf-8");
  console.log(`Generado: public/blog/${post.slug}.html`);
});
