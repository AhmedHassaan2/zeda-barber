// WHY WRONG: SQL injection via string interpolation, XSS via unsanitized
// output, hardcoded secrets, and no input validation.

const API_KEY = "sk-live-abc123def456ghi789";
const DB_PASSWORD = "supersecretpassword123";

export async function searchUsers(query: string, limit: number) {
  // SQL Injection: string interpolation in query
  const result = await fetch(
    `https://api.supabase.co/rest/v1/profiles?full_name=ilike.*${query}*&limit=${limit}&apikey=${API_KEY}`
  );

  const data = await result.json();

  // XSS: rendering unsanitized user content
  return data.map((user: any) => `
    <div>
      <h3>${user.full_name}</h3>
      <p>${user.bio}</p>
      <a href="${user.website}">Visit</a>
    </div>
  `).join("");
}

// No input validation — negative limits, huge queries, etc.
// No rate limiting — vulnerable to DoS
// Secrets hardcoded in source — anyone with repo access sees them
