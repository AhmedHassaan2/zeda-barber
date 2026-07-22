const SECRET = process.env.AUTH_SECRET || "default-dev-secret-change-in-production";

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSha256(message: string, key: string): Promise<string> {
  const keyBytes = new TextEncoder().encode(key);
  const msgBytes = new TextEncoder().encode(message);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, msgBytes);
  return bytesToHex(new Uint8Array(sig));
}

export async function createToken(): Promise<string> {
  const random = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
  const hmac = await hmacSha256(random, SECRET);
  return `${random}.${hmac}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [random, hmac] = parts;
  const expected = await hmacSha256(random, SECRET);
  return hmac === expected;
}
