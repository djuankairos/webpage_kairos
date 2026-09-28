import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// NOTA: en Vercel producción el filesystem es de solo lectura fuera de /tmp,
// por lo que este archivo NO persiste entre despliegues/invocaciones en prod.
// Es funcional para desarrollo local. La fase 2 (Vercel KV/Blob) reemplazará
// este almacenamiento por uno persistente.
const EMAILS_PATH = path.join(process.cwd(), "data", "emails.json");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readEmails(): Promise<Array<{ name: string; email: string; date: string }>> {
  try {
    const raw = await fs.readFile(EMAILS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();

  if (name.length < 2 || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Nombre o correo inválido" }, { status: 400 });
  }

  if (process.env.VERCEL === "1" && process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "La suscripción aún no está disponible en producción (falta conectar almacenamiento persistente). Vuelve pronto.",
      },
      { status: 503 }
    );
  }

  const entries = await readEmails();
  if (entries.some((e) => e.email === email)) {
    return NextResponse.json({ ok: true, message: "Ya estabas suscrito" });
  }

  entries.push({ name, email, date: new Date().toISOString() });

  await fs.mkdir(path.dirname(EMAILS_PATH), { recursive: true });
  await fs.writeFile(EMAILS_PATH, JSON.stringify(entries, null, 2), "utf-8");

  return NextResponse.json({ ok: true });
}
