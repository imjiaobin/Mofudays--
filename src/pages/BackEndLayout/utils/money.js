/* 
    功能: 金額用相關 function, 千分位轉換 
    最新更新時間: 2025/03/05
    更新內容: 
*/

export function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString("zh-TW")}`;
}