import type { CSSProperties } from "react";

/**
 * Paletas e utilitários para gráficos de rosca (Recharts Pie/Donut).
 * Foco: escala monocromática roxo/azul desaturada, separação entre fatias e leitura em dark mode.
 */

export function donutSliceStroke(isDark: boolean): string {
  return isDark ? "#1e293b" : "#ffffff";
}

/** Texto de legenda: cinza médio, não compete com o gráfico */
export const donutLegendStyle = (isDark: boolean): CSSProperties => ({
  color: isDark ? "#94a3b8" : "#64748b",
  fontSize: 11,
});

const SEQUENTIAL_LIGHT = [
  "#4a3f6b",
  "#574978",
  "#655586",
  "#746294",
  "#8470a3",
  "#9580b2",
  "#a791c1",
  "#baa3d0",
];

const SEQUENTIAL_DARK = [
  "#5c4f82",
  "#6a5c8f",
  "#786a9c",
  "#8779aa",
  "#9689b8",
  "#a69ac6",
  "#b6acd4",
  "#c7bfe2",
];

export function sequentialBrandPalette(count: number, isDark: boolean): string[] {
  const src = isDark ? SEQUENTIAL_DARK : SEQUENTIAL_LIGHT;
  if (count <= 0) return [];
  if (count <= src.length) return src.slice(0, count);
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(src[Math.min(i, src.length - 1)]);
  }
  return out;
}

/** Maior valor = tom mais escuro (primeiro da paleta) */
export function fillsByValueDescending(values: number[], palette: string[]): string[] {
  if (values.length === 0) return [];
  const n = values.length;
  const order = values
    .map((v, i) => ({ v, i }))
    .sort((a, b) => b.v - a.v)
    .map((x) => x.i);
  const fills = new Array<string>(n);
  order.forEach((origIdx, rank) => {
    fills[origIdx] = palette[Math.min(rank, palette.length - 1)];
  });
  return fills;
}

/** Destaque (marca) + neutro cinza-azulado — ideal para 2 categorias (ex.: gênero) */
export function binaryAccentNeutral(isDark: boolean): [string, string] {
  if (isDark) {
    return ["#7c6fad", "#64748b"];
  }
  return ["#5b4d7a", "#94a3b8"];
}

/** Status de cursos: concluído (marca), em andamento (médio), não iniciado (claro/cinza) */
export function trainingStatusFills(isDark: boolean): { concluido: string; andamento: string; naoIniciado: string } {
  if (isDark) {
    return {
      concluido: "#7d6ba8",
      andamento: "#9b8fc4",
      naoIniciado: "#64748b",
    };
  }
  return {
    concluido: "#524365",
    andamento: "#7d6fa0",
    naoIniciado: "#cbd5e1",
  };
}

export function fillForTrainingStatusLabel(
  name: string,
  isDark: boolean
): string {
  const n = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  const pal = trainingStatusFills(isDark);
  if (n.includes("conclu")) return pal.concluido;
  if (n.includes("andamento") || n.includes("progresso")) return pal.andamento;
  if (n.includes("nao inici") || n.includes("pendente") || n.includes("nao inic")) return pal.naoIniciado;
  return pal.andamento;
}

/** Fatia "Outros" — cinza desaturado */
export function outrosSliceFill(isDark: boolean): string {
  return isDark ? "#52525b" : "#94a3b8";
}

export type DonutDatum = { name: string; value: number };

/** Mais de 6 categorias: mantém as 5 maiores e agrega o restante em "Outros". */
export function groupSmallestAsOutros(data: DonutDatum[], maxBeforeGroup = 6): DonutDatum[] {
  if (data.length <= maxBeforeGroup) {
    return [...data].sort((a, b) => b.value - a.value);
  }
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const top = sorted.slice(0, 5);
  const rest = sorted.slice(5);
  const outrosVal = rest.reduce((s, d) => s + d.value, 0);
  return [...top, { name: "Outros", value: outrosVal }];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "");
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** Clareia levemente no hover (mistura com branco). */
export function brightenHex(hex: string, mix = 0.12): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const lift = (c: number) => Math.round(c + (255 - c) * mix);
  const r = lift(rgb.r);
  const g = lift(rgb.g);
  const b = lift(rgb.b);
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}
