import { useState } from 'react';
import { LayoutGrid, Filter, User, UserPlus, Clock, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/Card';
import { mockQuadroEquipes, TURNOS, SETORES } from '@/infrastructure/mock/mockQuadroEquipes';
import type { FuncionarioScale } from '@/infrastructure/mock/mockQuadroEquipes';
import { cn } from '@/shared/lib/cn';

export default function QuadroEquipesPage() {
  const [turnoFiltro, setTurnoFiltro] = useState("Todos");
  const [setorFiltro, setSetorFiltro] = useState("Todos");

  const filteredData = mockQuadroEquipes.filter(item => {
    if (turnoFiltro !== "Todos" && item.turno !== turnoFiltro) return false;
    if (setorFiltro !== "Todos" && item.setor !== setorFiltro) return false;
    return true;
  });

  // Agrupar por setor (com o filtro já aplicado)
  const groupedBySetor = filteredData.reduce((acc, curr) => {
    if (!acc[curr.setor]) acc[curr.setor] = [];
    acc[curr.setor].push(curr);
    return acc;
  }, {} as Record<string, FuncionarioScale[]>);

  return (
    <div className="space-y-8 pb-10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Quadro Operacional de Equipes</h1>
          <p className="text-muted-foreground mt-1">Visão global das escalas de trabalho, alocação e vagas abertas.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4 shrink-0">
        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
          <Filter size={18} /> Filtros:
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Setor:</span>
          <select 
            className="border-slate-200 rounded-lg text-sm px-3 py-1.5 focus:ring-primary focus:border-primary"
            value={setorFiltro}
            onChange={(e) => setSetorFiltro(e.target.value)}
          >
            {SETORES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Turno:</span>
          <select 
            className="border-slate-200 rounded-lg text-sm px-3 py-1.5 focus:ring-primary focus:border-primary"
            value={turnoFiltro}
            onChange={(e) => setTurnoFiltro(e.target.value)}
          >
            {TURNOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Quadro Flow / Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full">
          {Object.entries(groupedBySetor).map(([setor, members]) => {
            const ativos = members.filter(m => !m.isVagaAberta).length;
            const vagas = members.filter(m => m.isVagaAberta).length;

            return (
              <div key={setor} className="w-80 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/60 overflow-hidden">
                <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
                  <h3 className="font-bold text-slate-800 tracking-tight">{setor}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold" title="Equipe Ativa">
                      {ativos}
                    </span>
                    {vagas > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold" title="Vagas Abertas">
                        {vagas} vaga{vagas > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-3 overflow-y-auto h-full rounded-b-2xl custom-scrollbar">
                  {members.map(member => (
                    <Card 
                      key={member.id} 
                      className={cn(
                        "shadow-sm transition-all hover:shadow-md cursor-pointer border-l-4",
                        member.isVagaAberta 
                          ? "border-l-amber-400 bg-amber-50/30" 
                          : "border-l-primary bg-white hover:-translate-y-0.5"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className={cn("font-bold text-sm", member.isVagaAberta ? "text-amber-800" : "text-slate-900")}>
                            {member.nome}
                          </div>
                          <div className={cn(
                            "rounded-full p-1.5", 
                            member.isVagaAberta ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary"
                          )}>
                            {member.isVagaAberta ? <UserPlus size={16} /> : <User size={16} />}
                          </div>
                        </div>

                        <div className="space-y-2 mt-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Briefcase size={12} className="text-slate-400" /> 
                              <span className="truncate max-w-[140px]">{member.cargo}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} className="text-slate-400" /> 
                              {member.turno}
                            </span>
                            
                            {member.isVagaAberta && (
                              <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">RECRUTANDO</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
          
          {Object.keys(groupedBySetor).length === 0 && (
            <div className="w-full flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300">
              <LayoutGrid size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Nenhum colaborador ou vaga encontrada para estes filtros.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
