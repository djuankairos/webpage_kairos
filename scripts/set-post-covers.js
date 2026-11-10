// Asigna una imagen de portada (property "cover", tipo Files) a posts
// Published en Notion, por slug. Uso puntual, no se deja programado.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
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

function headers() {
  return {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

const COVERS = {
  "el-cambio-es-un-modo-de-vida":
    "https://images.unsplash.com/photo-1603492501465-2d1bf970b974?auto=format&fit=crop&w=1200&q=80",
  "serie-liderazgo-55-los-lideres-son-lectores":
    "https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?auto=format&fit=crop&w=1200&q=80",
  "serie-liderazgo-35-las-ventas-no-comienzan-con-un-producto-comienzan-con-una-persona":
    "https://images.unsplash.com/photo-1752159400890-d906038f1b35?auto=format&fit=crop&w=1200&q=80",
  "serie-liderazgo-15-martesdeliderazgo-cuando-dejas-de-ser-el-jefe-que-pide":
    "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?auto=format&fit=crop&w=1200&q=80",
  "serie-liderazgo-25-el-objetivo-del-escalador":
    "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=1200&q=80",
  "el-espejismo-del-iva-exento":
    "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&w=1200&q=80",
  "el-costo-oculto-de-evitar-una-conversacion-incomoda-a-tiempo":
    "https://images.unsplash.com/photo-1758520144437-f068ecaf0d83?auto=format&fit=crop&w=1200&q=80",
  "por-que-la-jerarquia-tradicional-esta-destruyendo-la-agilidad-en-las-organizaciones-modernas":
    "https://images.unsplash.com/photo-1758691736548-073bc97cdff4?auto=format&fit=crop&w=1200&q=80",
};

async function main() {
  const postsPath = path.join(ROOT, "public", "data", "posts.json");
  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

  for (const post of posts) {
    const coverUrl = COVERS[post.slug];
    if (!coverUrl) {
      console.log(`Sin portada definida para: ${post.slug} (se omite)`);
      continue;
    }
    const res = await fetch(`${NOTION_API}/pages/${post.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify({
        properties: {
          cover: {
            files: [
              {
                name: "cover.jpg",
                external: { url: coverUrl },
              },
            ],
          },
        },
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`FALLO ${post.slug}: ${res.status} ${body}`);
      continue;
    }
    console.log(`OK: ${post.slug}`);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
