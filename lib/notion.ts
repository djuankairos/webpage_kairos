const NOTION_VERSION = "2022-06-28";
const NOTION_API = "https://api.notion.com/v1";

export type NotionPost = {
  id: string;
  titulo: string;
  slug: string;
  fecha: string | null;
  extracto: string;
  meta_descripcion: string;
  tags: string[];
  imagen_destacada: string | null;
  contenido_html: string;
};

function getDatabaseId(): string {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) throw new Error("Falta la variable de entorno NOTION_DATABASE_ID");
  return id;
}

function notionHeaders(): Record<string, string> {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("Falta la variable de entorno NOTION_TOKEN");
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

export function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "post";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RichText = any[];

export function richTextToHtml(richText: RichText | undefined): string {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function blocksToHtml(blocks: any[]): string {
  let html = "";
  let listBuffer: string[] = [];
  let listType: string | null = null;

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
        if (block.paragraph.rich_text.length) {
          html += `<p>${richTextToHtml(block.paragraph.rich_text)}</p>`;
        }
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
        break; // tipos de bloque no soportados se omiten
    }
  }

  flushList();
  return html;
}

async function fetchBlockChildren(blockId: string): Promise<unknown[]> {
  const results: unknown[] = [];
  let cursor: string | undefined;

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

async function queryPublishedPages(): Promise<unknown[]> {
  const databaseId = getDatabaseId();
  const results: unknown[] = [];
  let cursor: string | undefined;

  do {
    const res = await fetch(`${NOTION_API}/databases/${databaseId}/query`, {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function plainTextFrom(richText: any[] | undefined): string {
  return (richText || []).map((rt) => rt.plain_text || "").join("");
}

export async function getPublishedPosts(): Promise<NotionPost[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages = (await queryPublishedPages()) as any[];
  const usedSlugs = new Set<string>();
  const posts: NotionPost[] = [];

  for (const page of pages) {
    const props = page.properties || {};
    const titulo = plainTextFrom(props.Nombre?.title) || "Sin título";
    const category: string | null = props.category?.select?.name || null;
    const fecha: string | null = props.date?.date?.start || null;
    const extracto = plainTextFrom(props.excerpt?.rich_text);
    const coverFile = props.cover?.files?.[0];
    const imagen_destacada: string | null = coverFile?.file?.url || coverFile?.external?.url || null;

    let slugBase = slugify(titulo);
    let slug = slugBase;
    let i = 2;
    while (usedSlugs.has(slug)) {
      slug = `${slugBase}-${i++}`;
    }
    usedSlugs.add(slug);

    const blocks = await fetchBlockChildren(page.id);
    const contenido_html = blocksToHtml(blocks);

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

  return posts.sort((a, b) => new Date(b.fecha || 0).getTime() - new Date(a.fecha || 0).getTime());
}
