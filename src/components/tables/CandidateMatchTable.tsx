import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge, Progress } from "../ui/Common";
import type { CandidateData } from "../../types";
import { motion } from "framer-motion";
import { User, MoreHorizontal, Search, FileText } from "lucide-react";

interface CandidateMatchTableProps {
  candidates: CandidateData[];
}

export function CandidateMatchTable({ candidates }: CandidateMatchTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl md:text-2xl">Triagem de Candidatos</CardTitle>
          <p className="text-xs md:text-sm text-muted-foreground">Analise os perfis com maior compatibilidade para suas vagas abertas.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filtrar..."
              className="pl-8 h-9 w-[150px] lg:w-[250px] rounded-md border border-input bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-xs font-medium h-9 px-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            Exportar
          </button>
        </div>
      </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-2 md:mx-0">
            <div className="inline-block min-w-full align-middle">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-50 border-y border-border">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-10 px-4 text-left align-middle font-bold text-muted-foreground">Nome</th>
                  <th className="h-10 px-4 text-left align-middle font-bold text-muted-foreground">Match Score</th>
                  <th className="h-10 px-4 text-left align-middle font-bold text-muted-foreground">Skills Detectadas</th>
                  <th className="h-10 px-4 text-left align-middle font-bold text-muted-foreground">Status</th>
                  <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <User size={16} />
                        </div>
                        <span className="font-semibold">{candidate.nome}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center space-x-2 w-[180px]">
                        <Progress value={candidate.score} className="h-2 flex-1" />
                        <span className="text-xs font-bold w-9">{candidate.score}%</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px] py-0">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge 
                        variant={
                          candidate.status === "Alta prioridade" ? "success" : 
                          candidate.status === "Entrevista" ? "default" : 
                          candidate.status === "Reprovado" ? "destructive" : "outline"
                        }
                      >
                        {candidate.status}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1.5 hover:bg-muted rounded-md transition-colors" title="Ver Currículo">
                          <FileText size={16} className="text-muted-foreground" />
                        </button>
                        <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
                          <MoreHorizontal size={16} className="text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
