/* 
    功能: 時間用相關 function, 包含產生時間, 時間格式化, 是否為當日/月/年 
    最新更新時間: 2025/03/05
    更新內容: 整理所有後台管理系統之時間相關function
*/

// 建立時間, 因為我們用 JSON Server, 模擬後端建立時間
export const nowISO = () => new Date().toISOString();

// 日期格式化 : YYYY-MM-DD
export function formatYMD(value) {
  if (!value || typeof value !== "string") return "—";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const d = new Date(value);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);

  return value.slice(0, 10) || "—";
}

export function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(value) {
  const d = toDate(value);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}/${m}/${day}`;
}

export function formatDateTime(value) {
  const d = toDate(value);
  if (!d) return "-";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${y}/${m}/${day} ${hh}:${mm}`;
}

export function isToday(value) {
  const d = toDate(value);
  if (!d) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function isThisMonth(value) {
  const d = toDate(value);
  if (!d) return false;
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth()
  );
}

export function sortByDateDesc(list, dateKey) {
  return [...list].sort((a, b) => {
    const aTime = toDate(a?.[dateKey])?.getTime() || 0;
    const bTime = toDate(b?.[dateKey])?.getTime() || 0;
    return bTime - aTime;
  });
}

export function formatDateTimeDisplay(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function nowDateTimeDisplay() {
  return formatDateTimeDisplay(new Date());
}
