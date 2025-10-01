import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type GradientPresetId = "auric" | "legacy" | "chromatic" | "luminous";

type GradientThemeContextValue = {
  preset: GradientPresetId;
  setPreset: (preset: GradientPresetId) => void;
};

type GradientPresetMeta = {
  id: GradientPresetId;
  label: string;
  description: string;
};

const STORAGE_KEY = "gradient-style:selected";
const DEFAULT_PRESET: GradientPresetId = "auric";

const GradientThemeContext = createContext<GradientThemeContextValue | undefined>(undefined);

export const gradientPresets: GradientPresetMeta[] = [
  {
    id: "auric",
    label: "Aurora Dourada",
    description: "Blend com destaque dourado sobre a cor dominante do pôster.",
  },
  {
    id: "legacy",
    label: "Runas Originais",
    description: "Visual escuro clássico com sutis reflexos quentes.",
  },
  {
    id: "chromatic",
    label: "Duotone Arcano",
    description: "Gradiente usando apenas tons derivados da arte do anime.",
  },
  {
    id: "luminous",
    label: "Névoa Radiante",
    description: "Mistura suave e clara para destacar elementos mágicos.",
  },
];

export function GradientThemeProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPresetState] = useState<GradientPresetId>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_PRESET;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY) as GradientPresetId | null;
    return stored && gradientPresets.some(({ id }) => id === stored) ? stored : DEFAULT_PRESET;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, preset);
  }, [preset]);

  const setPreset = useCallback((value: GradientPresetId) => {
    setPresetState((prev) => (prev === value ? prev : value));
  }, []);

  const value = useMemo<GradientThemeContextValue>(
    () => ({ preset, setPreset }),
    [preset, setPreset],
  );

  return <GradientThemeContext.Provider value={value}>{children}</GradientThemeContext.Provider>;
}

export function useGradientTheme() {
  const ctx = useContext(GradientThemeContext);
  if (!ctx) {
    throw new Error("useGradientTheme must be used within a GradientThemeProvider");
  }
  return ctx;
}

export function getGradientBackground(
  preset: GradientPresetId,
  accentVar = "var(--card-accent-rgb, 229 57 53)",
) {
  const accent = `rgb(${accentVar})`;
  switch (preset) {
    case "legacy":
      return "linear-gradient(170deg, rgba(24, 18, 13, 0.92) 0%, rgba(11, 8, 6, 0.94) 100%)";
    case "chromatic":
      return `linear-gradient(150deg, color-mix(in oklab, ${accent} 88%, white 12%) 0%, color-mix(in oklab, ${accent} 60%, black 40%) 65%, rgba(8, 6, 4, 0.93) 100%)`;
    case "luminous":
      return `linear-gradient(145deg, rgba(255, 244, 214, 0.38) 0%, color-mix(in oklab, ${accent} 78%, white 22%) 50%, rgba(12, 14, 20, 0.9) 100%)`;
    case "auric":
    default:
      return `linear-gradient(150deg, rgba(253, 236, 194, 0.36) 0%, color-mix(in oklab, ${accent} 82%, white 18%) 52%, rgba(12, 9, 6, 0.92) 100%)`;
  }
}
