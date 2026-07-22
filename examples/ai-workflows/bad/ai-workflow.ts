// WHY WRONG: No input validation, no guardrails, no streaming,
// no error handling, hardcoded secrets, no rate limiting.

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: "sk-live-abc123..." });

export async function generateContent(prompt: string) {
  // No validation — empty prompts, massive inputs, injection attacks
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "user", content: prompt },
    ],
    // No max_tokens — could generate infinite tokens
    // No temperature control
    // No streaming — client waits for full response
    // No abort signal — can't cancel
  });

  // No error handling — unhandled promise rejection
  return response.choices[0].message.content;
}

// No guardrails — can generate harmful content
// No rate limiting — vulnerable to abuse
// No token tracking — cost unmonitored
// No system prompt — inconsistent behavior
// Hardcoded API key — security risk
// Synchronous response — blocks on large generations
