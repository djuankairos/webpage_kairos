// Script temporal de diagnóstico: lista todas las páginas de la base de datos
// (sin filtro) y muestra los nombres/tipos de propiedades reales.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

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

async function main() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page_size: 10 }),
  });

  if (!res.ok) {
    console.error("Error consultando Notion:", res.status, await res.text());
    return;
  }

  const data = await res.json();
  console.log(`Total de páginas encontradas (sin filtro): ${data.results.length}`);

  data.results.forEach((page, i) => {
    console.log(`\n--- Página ${i + 1} (${page.id}) ---`);
    for (const [key, prop] of Object.entries(page.properties)) {
      let value;
      switch (prop.type) {
        case "title":
          value = prop.title.map((t) => t.plain_text).join("");
          break;
        case "status":
          value = prop.status?.name;
          break;
        case "select":
          value = prop.select?.name;
          break;
        case "date":
          value = prop.date?.start;
          break;
        case "rich_text":
          value = prop.rich_text.map((t) => t.plain_text).join("");
          break;
        case "files":
          value = prop.files.map((f) => f.name);
          break;
        default:
          value = JSON.stringify(prop[prop.type]);
      }
      console.log(`  "${key}" (${prop.type}): ${JSON.stringify(value)}`);
    }
  });
}

main().catch((err) => console.error(err));
