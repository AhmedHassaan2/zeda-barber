// WHY: Streaming responses, input validation, rate limiting, error
// boundaries, and guardrails make AI integrations production-ready.

import { openai } from "@/lib/openai/client";

interface GenerateRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

interface GenerateResponse {
  content: string;
  tokensUsed: number;
  finishReason: "stop" | "length" | "content_filter";
}

const GUARDRAILS = {
  maxTokens: 4096,
  maxTemperature: 1.0,
  blockedPatterns: [/how to hack/i, /bomb making/i, /illegal activity/i],
  systemPrompt: "You are a helpful assistant. Respond concisely and accurately.",
};

export async function generateContent(
  input: GenerateRequest,
  signal?: AbortSignal
): Promise<GenerateResponse> {
  if (!input.prompt || input.prompt.trim().length === 0) {
    throw new Error("EMPTY_PROMPT");
  }
  if (input.prompt.length > 10000) {
    throw new Error("PROMPT_TOO_LONG");
  }

  for (const pattern of GUARDRAILS.blockedPatterns) {
    if (pattern.test(input.prompt)) {
      throw new Error("CONTENT_POLICY_VIOLATION");
    }
  }

  const tokens = Math.min(input.maxTokens ?? 1024, GUARDRAILS.maxTokens);
  const temp = Math.min(input.temperature ?? 0.7, GUARDRAILS.maxTemperature);

  try {
    const stream = await openai.chat.completions.create(
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: GUARDRAILS.systemPrompt },
          { role: "user", content: input.prompt },
        ],
        max_tokens: tokens,
        temperature: temp,
        stream: true,
      },
      { signal }
    );

    let content = "";
    let tokensUsed = 0;

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? "";
      content += delta;
      tokensUsed = chunk.usage?.total_tokens ?? tokensUsed;

      if (signal?.aborted) {
        throw new Error("ABORTED");
      }
    }

    return {
      content,
      tokensUsed,
      finishReason: content.length >= tokens ? "length" : "stop",
    };
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new Error("ABORTED");
    }
    console.error("[AI] Generation failed:", error);
    throw new Error("GENERATION_FAILED");
  }
}
