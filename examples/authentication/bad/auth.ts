// WHY WRONG: localStorage tokens are accessible to XSS, no server-side
// validation means forged requests go through, no refresh logic.

export function signIn(email: string, password: string) {
  return fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json());
}

export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function setToken(token: string) {
  localStorage.setItem("auth_token", token);
}

export function getUser(): any {
  const token = getToken();
  if (!token) return null;

  // Decoding JWT on client — signature NOT verified
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload;
}

// Client-side route protection — easily bypassed
export function isAuthenticated(): boolean {
  return !!getToken();
}

// No refresh logic, no cookie management, no server validation
export function signOut() {
  localStorage.removeItem("auth_token");
  window.location.href = "/login";
}
