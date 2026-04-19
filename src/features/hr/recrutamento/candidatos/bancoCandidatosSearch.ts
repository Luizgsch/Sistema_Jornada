import { delay } from "@/shared/lib/delay";
import type { SearchSuggestion } from "@/shared/components/search/SearchAutocomplete";
import { mockBancoCandidatos, type BancoCandidatoMock } from "@/infrastructure/mock/mockRecrutamento";

export type BancoCandidatoRow = BancoCandidatoMock;

function digitsOnly(s: string) {
  return s.replace(/\D/g, "");
}

/** Primeiro campo que casa com o termo (prioridade RH). */
export function matchLabelForBancoCandidato(c: BancoCandidatoRow, needleRaw: string): string | null {
  const needle = needleRaw.trim().toLowerCase();
  if (!needle) return null;
  const d = digitsOnly(needleRaw);
  const cpfDigits = digitsOnly(c.cpf ?? "");
  if (c.cpf && d.length >= 2 && cpfDigits.includes(d)) return "CPF";
  if (c.nome.toLowerCase().includes(needle)) return "Nome";
  if (c.email.toLowerCase().includes(needle)) return "E-mail";
  if (c.cargo.toLowerCase().includes(needle)) return "Cargo";
  if (c.competencias.some((k) => k.toLowerCase().includes(needle))) return "Competência";
  if (c.cidade.toLowerCase().includes(needle)) return "Cidade";
  if (c.telefone && c.telefone.replace(/\D/g, "").includes(d) && d.length >= 4) return "Telefone";
  return null;
}

export function bancoCandidatoMatchesQuery(c: BancoCandidatoRow, needleRaw: string): boolean {
  return matchLabelForBancoCandidato(c, needleRaw) !== null;
}

export async function fetchBancoCandidatoSuggestions(
  q: string,
  list: BancoCandidatoRow[] = mockBancoCandidatos
): Promise<SearchSuggestion<BancoCandidatoRow>[]> {
  await delay(90);
  const needle = q.trim();
  if (!needle) return [];

  const scored = list
    .map((c) => {
      const label = matchLabelForBancoCandidato(c, needle);
      if (!label) return null;
      const n = needle.toLowerCase();
      let score = 50;
      if (c.nome.toLowerCase().startsWith(n)) score = 0;
      else if (c.nome.toLowerCase().includes(n)) score = 5;
      else if (label === "E-mail") score = 8;
      else if (label === "CPF") score = 10;
      else if (label === "Cargo") score = 12;
      return { c, label, score };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.score - b.score);

  return scored.map(({ c, label }) => ({
    id: c.id,
    title: c.nome,
    subtitle: `${c.cargo} · ${c.cidade}`,
    matchLabel: label,
    data: c,
  }));
}
