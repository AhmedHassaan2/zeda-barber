// WHY: Input validation at boundaries, parameterized queries, and
// output sanitization prevent injection, XSS, and data corruption.

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const SearchSchema = z.object({
  query: z.string().min(1).max(200).trim(),
  limit: z.number().int().min(1).max(50).default(10),
  offset: z.number().int().min(0).default(0),
});

type SearchInput = z.infer<typeof SearchSchema>;

export async function searchUsers(input: unknown) {
  const validated = SearchSchema.parse(input);

  const supabase = createClient();

  // Parameterized query — no string interpolation
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .ilike("full_name", `%${validated.query}%`)
    .range(validated.offset, validated.offset + validated.limit - 1);

  if (error) throw new Error("SEARCH_FAILED");

  return data.map((row) => ({
    id: row.id,
    name: sanitizeOutput(row.full_name),
    email: row.email,
  }));
}

// Prevent stored XSS by sanitizing user-generated content
function sanitizeOutput(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Environment variable validation at startup
function validateEnv() {
  const required = ["DATABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "NEXTAUTH_SECRET"] as const;
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
