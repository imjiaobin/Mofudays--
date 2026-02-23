// 日期格式 : YYYY-MM-DD
export function formatYMD(value) {
  if (!value || typeof value !== "string") return "—";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);

  return value.slice(0, 10) || "—";
}

export const nowISO = () => new Date().toISOString();