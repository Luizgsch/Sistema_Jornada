import type { CandidateData } from "@/shared/types";

export const mockCandidates: CandidateData[] = [
  {
    id: "1",
    nome: "Ana Silva",
    score: 92,
    skills: ["Excel", "SAP", "Power BI"],
    status: "Alta prioridade",
  },
  {
    id: "2",
    nome: "João Lima",
    score: 84,
    skills: ["Logística", "WMS"],
    status: "Entrevista",
  },
  {
    id: "3",
    nome: "Carlos Rocha",
    score: 65,
    skills: ["Operação"],
    status: "Triagem",
  },
  {
    id: "4",
    nome: "Mariana Costa",
    score: 88,
    skills: ["React", "Node.js", "TypeScript"],
    status: "Entrevista",
  },
  {
    id: "5",
    nome: "Ricardo Santos",
    score: 42,
    skills: ["Vendas"],
    status: "Reprovado",
  },
];
