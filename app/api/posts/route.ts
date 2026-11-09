import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching Notion posts:", error);
    return NextResponse.json({ error: "No se pudieron obtener los posts de Notion" }, { status: 500 });
  }
}
