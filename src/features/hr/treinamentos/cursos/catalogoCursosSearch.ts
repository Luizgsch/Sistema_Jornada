import { delay } from "@/shared/lib/delay";
import type { SearchSuggestion } from "@/shared/components/search/SearchAutocomplete";
import { mockCursos, mockTrilhas } from "@/infrastructure/mock/mockTreinamentos";

export type CatalogoPick =
  | { kind: "trilha"; id: string; applyText: string }
  | { kind: "curso"; id: string; applyText: string }
  | { kind: "categoria"; applyText: string };

export async function fetchCatalogoCursosSuggestions(q: string): Promise<SearchSuggestion<CatalogoPick>[]> {
  await delay(85);
  const needle = q.trim().toLowerCase();
  if (!needle) return [];

  const out: SearchSuggestion<CatalogoPick>[] = [];

  for (const t of mockTrilhas) {
    const hay = `${t.nome} ${t.area} ${t.cargo}`.toLowerCase();
    if (!hay.includes(needle)) continue;
    const matchLabel = t.nome.toLowerCase().includes(needle)
      ? "Trilha"
      : t.area.toLowerCase().includes(needle) || t.cargo.toLowerCase().includes(needle)
        ? "Competência"
        : "Trilha";
    const applyText =
      t.area !== "Todas" && t.area.toLowerCase().includes(needle)
        ? t.area
        : t.cargo.toLowerCase().includes(needle)
          ? t.cargo
          : t.nome;
    out.push({
      id: `trilha-${t.id}`,
      title: t.nome,
      subtitle: `${t.area} · ${t.cargo} · ${t.qtdCursos} cursos`,
      matchLabel,
      data: { kind: "trilha", id: t.id, applyText },
    });
  }

  for (const c of mockCursos) {
    if (c.nome.toLowerCase().includes(needle)) {
      out.push({
        id: `curso-${c.id}`,
        title: c.nome,
        subtitle: c.categoria,
        matchLabel: "Curso",
        data: { kind: "curso", id: c.id, applyText: c.nome },
      });
    } else if (c.categoria.toLowerCase().includes(needle)) {
      out.push({
        id: `cat-${c.id}`,
        title: c.categoria,
        subtitle: c.nome,
        matchLabel: "Competência",
        data: { kind: "categoria", applyText: c.categoria },
      });
    }
  }

  return out.slice(0, 5);
}
