import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { usePetInfoAndPlansOptions } from "./usePetInfoAndPlansOptions";
import { generatePlans } from "./generatePlans";

const API_BASE = import.meta.env.VITE_API_BASE;

async function getWithFallback(paths) {
  for (let i = 0; i < paths.length; i++) {
    try {
      const res = await axios.get(`${API_BASE}${paths[i]}`);
      return res.data ?? [];
    } catch (e) {
      // 如果不是最後一個就繼續試下一個
      if (i === paths.length - 1) throw e;
    }
  }
  return [];
}

// 小工具：checkbox toggle
function toggleInArray(arr, value) {
  const list = Array.isArray(arr) ? arr : [];
  if (list.includes(value)) return list.filter((x) => x !== value);
  return [...list, value];
}

// 小工具：把 option 轉成 { value, label }（兼容多種資料形狀）
function toOption(x) {
  const value =
    x?.code ?? x?.value ?? x?.id ?? (typeof x === "string" ? x : "");
  const label =
    x?.name ??
    x?.label ??
    x?.title ??
    (typeof x === "string" ? x : String(value));
  return { value: String(value), label: String(label) };
}

export default function PlanGeneratorTest() {
  // 1) 表單選項（你已經做好的 hook）
  const {
    options,
    loading: optLoading,
    error: optError,
  } = usePetInfoAndPlansOptions();

  // 2) 方案生成需要的 db（toys/treats/household/plans）
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState(null);
  const [db, setDb] = useState({
    plans: [],
    toys: [],
    treats: [],
    household: [],
  });

  // 3) 表單資料
  const [formData, setFormData] = useState({
    petName: "豆豆",
    size: "",
    dietStage: "",
    allergy: [],
    playStyle: [],
    healthCare: [],
  });

  // 4) 產生結果
  const [resultPlans, setResultPlans] = useState([]);

  // options 來了之後，幫你填預設 size / dietStage（避免 null）
  useEffect(() => {
    const sizeList = (options?.size ?? []).map(toOption);
    const stageList = (options?.dietStage ?? []).map(toOption);

    setFormData((prev) => {
      const next = { ...prev };
      if (!next.size && sizeList.length > 0) next.size = sizeList[0].value;
      if (!next.dietStage && stageList.length > 0)
        next.dietStage = stageList[0].value;
      return next;
    });
  }, [options]);

  // 把 db 拉齊：plans 用 hook 的 options.plans；另外抓 toys/treats/household
  useEffect(() => {
    let cancelled = false;

    const loadDb = async () => {
      try {
        setDbLoading(true);
        setDbError(null);

        // plans 已經在 options 裡拿到
        const plans = options?.plans ?? [];

        // toys / treats 有些人命名可能是 toy/treat（我做 fallback）
        const toys = await getWithFallback(["/toys", "/toy"]);
        const treats = await getWithFallback(["/treats", "/treat"]);
        const household = await getWithFallback(["/household"]);

        if (cancelled) return;

        setDb({
          plans,
          toys,
          treats,
          household,
        });
      } catch (e) {
        if (cancelled) return;
        setDbError(e);
      } finally {
        if (cancelled) return;
        setDbLoading(false);
      }
    };

    // options 先出現再載 db（至少 plans 有了）
    loadDb();

    return () => {
      cancelled = true;
    };
  }, [options?.plans]);

  // 把 options 整理成好用的資料
  const sizeOptions = useMemo(
    () => (options?.size ?? []).map(toOption),
    [options],
  );
  const stageOptions = useMemo(
    () => (options?.dietStage ?? []).map(toOption),
    [options],
  );
  const ingredientOptions = useMemo(
    () => (options?.ingredients ?? []).map(toOption),
    [options],
  );
  const playStyleOptions = useMemo(
    () => (options?.playStyle ?? []).map(toOption),
    [options],
  );
  const healthCareOptions = useMemo(
    () => (options?.healthCare ?? []).map(toOption),
    [options],
  );

  const handleGenerate = () => {
    try {
      const plans = generatePlans(formData, db);
      setResultPlans(plans);
    } catch (e) {
      alert(`generatePlans 發生錯誤：${e?.message ?? e}`);
      console.log(e);
    }
  };

  const isLoading = optLoading || dbLoading;
  const hasError = optError || dbError;

  return (
    <div style={{ padding: 16, maxWidth: 980, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12 }}> Plan Generator Test</h2>

      {isLoading && <p>載入中...</p>}
      {hasError && (
        <pre style={{ background: "#fff3f3", padding: 12, borderRadius: 8 }}>
          {String((optError || dbError)?.message ?? (optError || dbError))}
        </pre>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        {/* 左：表單 */}
        <div
          style={{ border: "1px solid #ddd", borderRadius: 10, padding: 16 }}
        >
          <h3 style={{ marginTop: 0 }}>🐶 Pet Info</h3>

          <div style={{ marginBottom: 10 }}>
            <label>毛孩名字</label>
            <input
              value={formData.petName}
              onChange={(e) =>
                setFormData({ ...formData, petName: e.target.value })
              }
              style={{ width: "100%", padding: 8, marginTop: 6 }}
              placeholder="例如：豆豆"
            />
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <div>
              <label>體型 size</label>
              <select
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              >
                {sizeOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>年齡階段 dietStage</label>
              <select
                value={formData.dietStage}
                onChange={(e) =>
                  setFormData({ ...formData, dietStage: e.target.value })
                }
                style={{ width: "100%", padding: 8, marginTop: 6 }}
              >
                {stageOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr style={{ margin: "14px 0" }} />

          <div style={{ marginBottom: 10 }}>
            <label>過敏原 allergy（可複選）</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 8,
              }}
            >
              {ingredientOptions.map((o) => (
                <label key={o.value} style={{ display: "flex", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={formData.allergy.includes(o.value)}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        allergy: toggleInArray(prev.allergy, o.value),
                      }))
                    }
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>玩耍偏好 playStyle（可複選）</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 8,
              }}
            >
              {playStyleOptions.map((o) => (
                <label key={o.value} style={{ display: "flex", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={formData.playStyle.includes(o.value)}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        playStyle: toggleInArray(prev.playStyle, o.value),
                      }))
                    }
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label>保健需求 healthCare（可複選）</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 8,
              }}
            >
              {healthCareOptions.map((o) => (
                <label key={o.value} style={{ display: "flex", gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={formData.healthCare.includes(o.value)}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        healthCare: toggleInArray(prev.healthCare, o.value),
                      }))
                    }
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              style={{ padding: "8px 12px" }}
            >
              生成方案
            </button>

            <button
              type="button"
              onClick={() => setResultPlans([])}
              style={{ padding: "8px 12px" }}
            >
              清空結果
            </button>
          </div>

          <hr style={{ margin: "14px 0" }} />

          {/* Debug：讓你快速確認資料 */}
          <details>
            <summary>🔎 Debug（formData / db counts）</summary>
            <pre
              style={{ background: "#f7f7f7", padding: 10, borderRadius: 8 }}
            >
              {JSON.stringify(
                {
                  formData,
                  dbCounts: {
                    plans: db.plans?.length ?? 0,
                    toys: db.toys?.length ?? 0,
                    treats: db.treats?.length ?? 0,
                    household: db.household?.length ?? 0,
                  },
                },
                null,
                2,
              )}
            </pre>
          </details>
        </div>

        {/* 右：結果 */}
        <div
          style={{ border: "1px solid #ddd", borderRadius: 10, padding: 16 }}
        >
          <h3 style={{ marginTop: 0 }}>📦 生成結果</h3>

          {resultPlans.length === 0 && (
            <p style={{ color: "#666" }}>
              右邊會顯示 generatePlans 產生的方案（預設 3 個）
            </p>
          )}

          <div style={{ display: "grid", gap: 12 }}>
            {resultPlans.map((p, idx) => (
              <div
                key={`${p?.name ?? "plan"}-${idx}`}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <strong>{p?.name ?? "（未命名方案）"}</strong>
                  <span>NT$ {p?.planPrice ?? 0}</span>
                </div>

                <div style={{ color: "#666", marginTop: 6 }}>
                  {p?.subtitle ?? ""}
                </div>

                <div style={{ marginTop: 8 }}>
                  <small>{p?.summaryText ?? ""}</small>
                </div>

                <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
                  <div>🍪 Treats：{p?.items?.treats?.length ?? 0}</div>
                  <div>🧸 Toys：{p?.items?.toys?.length ?? 0}</div>
                  <div>🧼 Household：{p?.items?.household?.length ?? 0}</div>
                </div>

                <details style={{ marginTop: 10 }}>
                  <summary>查看內容物</summary>
                  <pre
                    style={{
                      background: "#f7f7f7",
                      padding: 10,
                      borderRadius: 8,
                    }}
                  >
                    {JSON.stringify(p?.items ?? {}, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
