import type { ReactNode } from "react";

/**
 * Destaca em negrito todas as ocorrências de `query` em `text` (case-insensitive).
 */
export function highlightMatch(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;

  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const r = new RegExp(esc, "gi");
  let key = 0;
  while ((m = r.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={`t-${key++}`}>{text.slice(last, m.index)}</span>);
    }
    nodes.push(
      <strong key={`b-${key++}`} className="font-bold text-[#e7e5e4]">
        {text.slice(m.index, m.index + m[0].length)}
      </strong>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    nodes.push(<span key={`t-${key++}`}>{text.slice(last)}</span>);
  }
  return nodes.length ? <>{nodes}</> : text;
}
