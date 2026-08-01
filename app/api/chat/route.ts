import { NextResponse } from "next/server";
import OpenAI from "openai";
import { chatSystemPrompt } from "@/lib/portfolio-data";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: chatSystemPrompt },
        ...messages,
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply =
      response.choices[0]?.message?.content ||
      "I'm drawing a blank on that one... ask me about Sraavya's projects instead!";

    return NextResponse.json({ role: "assistant", content: reply });
  } catch (error: any) {
    console.error("OpenAI Chat API Error:", error);

    return NextResponse.json(
      { error: "Failed to generate AI twin response." },
      { status: 500 }
    );
  }
}