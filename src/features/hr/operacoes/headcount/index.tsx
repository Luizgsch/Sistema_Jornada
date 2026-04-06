import { Users, Building2, Network, PieChart as PieChartIcon, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { mockHeadcountTable, mockHeadcountDistribucao, mockOrgChart } from '@/infrastructure/mock/mockHeadcount';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#64748B'];

export default function HeadcountPage() {
  const totalAtivos = mockHeadcountTable.reduce((acc, curr) => acc + curr.ativos, 0);
  const totalDisponiveis = mockHeadcountTable.reduce((acc, curr) => acc + curr.disponiveis, 0);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#e7e5e4] dark:text-white">Headcount Organizacional</h1>
          <p className="text-muted-foreground mt-1">Gestão de colaboradores ativos, controle de vagas e organograma.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Colaboradores</p>
                <h3 className="text-3xl font-bold mt-1 text-[#e7e5e4]">{totalAtivos}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vagas em Aberto</p>
                <h3 className="text-3xl font-bold mt-1 text-[#e7e5e4]">{totalDisponiveis}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Search size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departamentos</p>
                <h3 className="text-3xl font-bold mt-1 text-[#e7e5e4]">{mockHeadcountTable.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Building2 size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Distribuição Chart */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <PieChartIcon className="text-primary" size={20} />
              Distribuição por Setor
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockHeadcountDistribucao}
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockHeadcountDistribucao.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value} colaboradores`, 'Ativos']}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Organograma Simples */}
        <Card className="flex flex-col h-full overflow-hidden bg-zinc-800/20">
          <CardHeader className="bg-[#18181b] border-b border-[#27272a] pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Network className="text-primary" size={20} />
              Organograma Resumido
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col items-center justify-center overflow-auto gap-6">
            {/* Diretoria */}
            <div className="bg-[#09090b] text-white p-4 rounded-xl text-center  w-64 border border-[#27272a] z-10 relative">
              <h4 className="font-bold text-lg">{mockOrgChart.diretoria.nome}</h4>
              <p className="text-zinc-600 text-sm mt-1">{mockOrgChart.diretoria.headcount} membros</p>
              
              {/* Conector Vertical */}
              <div className="absolute w-0.5 h-6 bg-zinc-600 left-1/2 -ml-[1px] -bottom-6" />
            </div>

            {/* Conector Horizontal Principal */}
            <div className="w-[80%] max-w-[800px] h-0.5 bg-zinc-600 relative">
              <div className="absolute w-0.5 h-6 bg-zinc-600 left-[10%] top-0" />
              <div className="absolute w-0.5 h-6 bg-zinc-600 left-[36.6%] top-0" />
              <div className="absolute w-0.5 h-6 bg-zinc-600 left-[63.3%] top-0" />
              <div className="absolute w-0.5 h-6 bg-zinc-600 left-[90%] top-0" />
            </div>
            
            {/* Setores */}
            <div className="flex w-full justify-between max-w-[900px]">
              {mockOrgChart.diretoria.setores.map((setor, index) => (
                <div key={index} className="bg-[#18181b] border border-[#27272a] p-4 rounded-xl text-center  w-[22%] sm:w-[23%] flex flex-col transition-all hover:-translate-y-1 hover: cursor-default">
                  <h5 className="font-bold text-zinc-200 text-[13px] leading-tight mb-2 h-10 flex items-center justify-center">{setor.nome}</h5>
                  <div className="mt-auto">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md mb-1">{setor.lider}</span>
                    <p className="text-zinc-500 text-xs">{setor.headcount} pessoas</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight mt-6">Detalhamento de Vagas Operacionais</h3>
        <div className="bg-[#18181b] rounded-xl  border border-[#27272a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 bg-[#09090b] uppercase border-b border-[#27272a]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Setor</th>
                  <th className="px-6 py-4 font-semibold text-center text-blue-600">Ativos</th>
                  <th className="px-6 py-4 font-semibold text-center text-zinc-400">Vagas Aprovadas</th>
                  <th className="px-6 py-4 font-semibold text-center text-emerald-600">Vagas Ocupadas</th>
                  <th className="px-6 py-4 font-semibold text-center text-amber-600">Vagas Disponíveis</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockHeadcountTable.map((item, idx) => {
                  const percentOcupado = Math.round((item.ocupadas / item.aprovadas) * 100);
                  let statusColor = "bg-emerald-100 text-emerald-700";
                  let statusText = "Equilibrado";
                  
                  if (item.disponiveis > 0) {
                    statusColor = "bg-amber-100 text-amber-700";
                    statusText = "Recrutando";
                  }
                  if (item.ativos > item.aprovadas) {
                    statusColor = "bg-rose-100 text-rose-700";
                    statusText = "Em Excesso";
                  }

                  return (
                    <tr key={idx} className="border-b border-[#27272a] hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#e7e5e4]">{item.setor}</td>
                      <td className="px-6 py-4 text-center font-bold text-blue-600">{item.ativos}</td>
                      <td className="px-6 py-4 text-center text-zinc-400 font-medium">{item.aprovadas}</td>
                      <td className="px-6 py-4 text-center text-emerald-600 font-medium">{item.ocupadas}</td>
                      <td className="px-6 py-4 text-center">
                        {item.disponiveis > 0 ? (
                            <span className="inline-flex w-7 h-7 bg-amber-100 text-amber-700 font-bold rounded-full items-center justify-center">
                              {item.disponiveis}
                            </span>
                          ) : (
                            <span className="text-zinc-600 font-medium">0</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                          {statusText}
                        </span>
                        <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ width: `${Math.min(percentOcupado, 100)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
