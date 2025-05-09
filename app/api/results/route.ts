import { NextRequest, NextResponse } from "next/server";
import { getRecommendation } from "@/lib/store";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const recommendation = getRecommendation(id);
  if (!recommendation)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ recommendation });
}
