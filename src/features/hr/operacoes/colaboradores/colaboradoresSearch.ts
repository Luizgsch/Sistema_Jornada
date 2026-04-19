import { delay } from "@/shared/lib/delay";
import type { SearchSuggestion } from "@/shared/components/search/SearchAutocomplete";
import { mockOperacoesColaboradores } from "@/infrastructure/mock/mockOperacoes";

export type ColaboradorRow = (typeof mockOperacoesColaboradores)[number];

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

export function matchLabelColaborador(c: ColaboradorRow, needleRaw: string): string | null {
  const needle = needleRaw.trim().toLowerCase();
  if (!needle) return null;
  const d = digitsOnly(needleRaw);
  const cpfD = c.cpf ? digitsOnly(c.cpf) : "";
  if (c.cpf && d.length >= 2 && cpfD.includes(d)) return "CPF";
  if (c.nome.toLowerCase().includes(needle)) return "Nome";
  if (c.matricula.toLowerCase().includes(needle)) return "Matrícula";
  if (c.cargo.toLowerCase().includes(needle)) return "Cargo";
  if (c.setor.toLowerCase().includes(needle)) return "Setor";
  if (c.gestor.toLowerCase().includes(needle)) return "Gestor";
  return null;
}

export function colaboradorMatchesQuery(c: ColaboradorRow, needleRaw: string): boolean {
  return matchLabelColaborador(c, needleRaw) !== null;
}

export async function fetchColaboradorSuggestions(
  q: string,
  list: ColaboradorRow[] = mockOperacoesColaboradores
): Promise<SearchSuggestion<ColaboradorRow>[]> {
  await delay(90);
  const needle = q.trim();
  if (!needle) return [];

  const scored = list
    .map((c) => {
      const label = matchLabelColaborador(c, needle);
      if (!label) return null;
      const n = needle.toLowerCase();
      let score = 40;
      if (c.nome.toLowerCase().startsWith(n)) score = 0;
      else if (c.nome.toLowerCase().includes(n)) score = 4;
      else if (label === "Matrícula") score = 6;
      else if (label === "CPF") score = 8;
      return { c, label, score };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.score - b.score);

  return scored.map(({ c, label }) => ({
    id: c.matricula,
    title: c.nome,
    subtitle: `${c.cargo} · ${c.setor}`,
    matchLabel: label,
    data: c,
  }));
}
