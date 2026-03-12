// usePetInfoAndPlansOptions.js
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export function usePetInfoAndPlansOptions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [options, setOptions] = useState({
    ingredients: [],
    playStyle: [],
    healthCare: [],
    size: [],
    dietStage: [],
    plans: [],
  });

  useEffect(() => {
    let cancelled = false;

    const loadOptions = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          ingredientsRes,
          playStyleRes,
          healthCareRes,
          sizeRes,
          dietStageRes,
          plansRes,
        ] = await Promise.all([
          axios.get(`${API_BASE}/ingredients`),
          axios.get(`${API_BASE}/playStyle`),
          axios.get(`${API_BASE}/healthCare`),
          axios.get(`${API_BASE}/size`),
          axios.get(`${API_BASE}/dietStage`),
          axios.get(`${API_BASE}/plans`),
        ]);

        if (cancelled) return;

        setOptions({
          ingredients: ingredientsRes.data ?? [],
          playStyle: playStyleRes.data ?? [],
          healthCare: healthCareRes.data ?? [],
          size: sizeRes.data ?? [],
          dietStage: dietStageRes.data ?? [],
          plans: plansRes.data ?? [],
        });
      } catch (err) {
        if (cancelled) return;
        setError(err);
      } finally {
        // 移除 finally 裡的 return，改用條件式
        if (!cancelled) setLoading(false);
      }
    };

    loadOptions();

    return () => {
      cancelled = true;
    };
  }, []);

  return { options, loading, error };
}
