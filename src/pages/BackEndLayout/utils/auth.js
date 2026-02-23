const TOKEN_KEY = "admin_token";

export function authHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  };
}