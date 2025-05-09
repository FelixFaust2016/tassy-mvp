import { NextResponse } from "next/server";
import { scrapeFashionphile } from "@/lib/scrapers/fashionphile";
import { recommendBag } from "@/lib/scrapers/recommend";
import { saveRecommendation } from "@/lib/store";
import { randomUUID } from "crypto";

type TypeformAnswer = {
  field: { ref: string };
  number?: number;
  choice?: { label: string };
};

export async function POST(request: Request) {
  const body = await request.json();
  const { form_response } = body;
  const answers: TypeformAnswer[] = form_response?.answers || [];

  // Parse answers into usable format
  const input = {
    budget: answers.find((a) => a.field.ref === "budget")?.number ?? 2000,
    brand:
      answers
        .find((a) => a.field.ref === "brand")
        ?.choice?.label?.toLowerCase() || "",
    color:
      answers
        .find((a) => a.field.ref === "color")
        ?.choice?.label?.toLowerCase() || "",
    occasion:
      answers
        .find((a) => a.field.ref === "occasion")
        ?.choice?.label?.toLowerCase() || "",
  };

  const bags = await scrapeFashionphile();
  const recommendation = recommendBag(input, bags);

  const id = randomUUID();
  saveRecommendation(id, recommendation);

  console.log("User input:", input);
  console.log("Recommended bag:", recommendation);
  console.log("id", id);

  const redirectUrl = `https://tassy-mvp.vercel.app/result?id=${id}`;

  return NextResponse.redirect(redirectUrl);
}
