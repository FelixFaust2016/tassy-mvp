import type { NextApiRequest, NextApiResponse } from "next";
import { scrapeFashionphile } from "@/lib/scrapers/fashionphile";
import { recommendBag } from "@/lib/scrapers/recommend";
import { saveRecommendation } from "@/lib/store";
import { randomUUID } from "crypto";

type TypeformAnswer = {
  field: { ref: string };
  number?: number;
  choice?: { label: string };
};

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { form_response } = req.body;
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

  res.status(200).json({ id, recommended: recommendation });

  console.log("User input:", input);
  console.log("Recommended bag:", recommendation);

  res.status(200).json({ id, recommended: recommendation });
}
