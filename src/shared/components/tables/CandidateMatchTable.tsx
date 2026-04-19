import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Badge, Progress } from "@/shared/ui/Common";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import type { CandidateData } from "@/shared/types";
import { motion } from "framer-motion";
import { User, MoreHorizontal, Search, FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/Tooltip";

interface CandidateMatchTableProps {
  candidates: CandidateData[];
  /** Só ative na listagem principal do banco de talentos; no hub / resumos, omita (padrão: false). */
  showExport?: boolean;
}

export function CandidateMatchTable({ candidates, showExport = false }: CandidateMatchTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-xl md:text-2xl font-semibold">Triagem de Candidatos</CardTitle>
            <p className="text-xs md:text-sm text-zinc-500">Analise os perfis com maior compatibilidade para suas vagas abertas.</p>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Filtrar..."
                className="pl-8 h-9 w-[150px] lg:w-[250px] rounded-radius-s border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-xs text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            {showExport ? (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-radius-s text-xs font-medium h-9 px-3 border border-zinc-200 dark:border-zinc-700 bg-transparent dark:bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Exportar
              </button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-2 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full min-w-[800px]">
                <thead className="bg-zinc-50 dark:bg-[#0f172a] border-y border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="h-10 px-4 text-left align-middle font-semibold text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wide">Nome</th>
                    <th className="h-10 px-4 text-left align-middle font-semibold text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wide">Match Score</th>
                    <th className="h-10 px-4 text-left align-middle font-semibold text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wide">Skills Detectadas</th>
                    <th className="h-10 px-4 text-left align-middle font-semibold text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wide">Status</th>
                    <th className="h-10 px-4 align-middle font-semibold text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wide text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {candidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-zinc-100 dark:border-zinc-800/60 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/20">
                      <td className="p-4 align-middle">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User size={16} />
                          </div>
                          <span className="font-semibold text-zinc-800 dark:text-white">{candidate.nome}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center space-x-2 w-[180px]">
                          <Progress value={candidate.score} className="h-2 flex-1" />
                          <span className="text-xs font-bold w-9 text-zinc-700 dark:text-zinc-300">{candidate.score}%</span>
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
                        <StatusBadge status={candidate.status} />
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-radius-s transition-colors"
                                aria-label="Ver currículo"
                              >
                                <FileText size={16} className="text-zinc-400 dark:text-zinc-500" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Ver currículo</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-radius-s transition-colors"
                                aria-label="Mais ações"
                              >
                                <MoreHorizontal size={16} className="text-zinc-400 dark:text-zinc-500" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Mais ações</TooltipContent>
                          </Tooltip>
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
