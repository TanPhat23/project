import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

interface ChatCompletionRequestMessage {
  role: string;
  content: string;
}
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
  timeout: 120 * 1000,
});
const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator, You must answer in only markdown code snippet. Use code snippet for explanation",
};
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();  
    const { messages } = body;
    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
