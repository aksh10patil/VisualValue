import { NextRequest, NextResponse } from "next/server";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY!;
const MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";

export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  const prompt = `Suggest 5 popular books for someone interested in "${topic}". 
For each book, include the title in quotes, the author, and a 1-2 line description. Format like this:
"Title" by Author – Description.`;

  const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        return_full_text: false,
      },
    }),
  });

  // Handle edge case: model not ready or error response
  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  const generated = data?.[0]?.generated_text || "No result";

  const books = generated
    .split("\n")
    .map((line: string) => {
      const match = line.match(/"(.+?)" by (.+?)\s[–-]\s(.+)/);
      if (!match) return null;
      const [, title, author, description] = match;
      return { title, author, description };
    })
    .filter(Boolean);

  return NextResponse.json({ books });
}
