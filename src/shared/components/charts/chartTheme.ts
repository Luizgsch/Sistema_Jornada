import type { CSSProperties } from "react";
import { useTheme } from "@/features/theme/ThemeContext";

export function getChartTooltipStyle(isDark: boolean): CSSProperties {
  return isDark
    ? {
        background: "#1e293b",
        border: "1px solid #475569",
        borderRadius: "8px",
        color: "#f8fafc",
        boxShadow: "0 4px 24px rgb(0 0 0 / 0.35)",
      }
    : {
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        color: "#0f172a",
        boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
      };
}

/** Grid lines — visíveis no dark sem competir com os dados */
export function chartGridColor(isDark: boolean): string {
  return isDark ? "#475569" : "#e2e8f0";
}

/** Rótulos de eixos — ~WCAG AA sobre fundo de card escuro */
export function chartAxisColor(isDark: boolean): string {
  return isDark ? "#94a3b8" : "#64748b";
}

export function chartCursorFill(isDark: boolean): string {
  return isDark ? "rgba(71, 85, 105, 0.35)" : "rgba(241, 245, 249, 0.9)";
}

export function useChartTheme() {
  const { isDark } = useTheme();
  return {
    isDark,
    tooltipStyle: getChartTooltipStyle(isDark),
    gridStroke: chartGridColor(isDark),
    axisTickFill: chartAxisColor(isDark),
    cursorFill: chartCursorFill(isDark),
  };
}
