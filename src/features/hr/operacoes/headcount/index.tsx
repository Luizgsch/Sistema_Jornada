import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Network, PieChart as PieChartIcon, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {
  mockHeadcountTable,
  mockHeadcountDistribucaoEnriquecida,
  mockHeadcountGenero,
  mockHeadcountEscolaridade,
  mockOrgChart,
} from '@/infrastructure/mock/mockHeadcount';
import { useTheme } from '@/features/theme/ThemeContext';
import {
  binaryAccentNeutral,
  brightenHex,
  donutLegendStyle,
  donutSliceStroke,
  fillsByValueDescending,
  groupSmallestAsOutros,
  outrosSliceFill,
  sequentialBrandPalette,
} from '@/shared/lib/chartDonut';
import { useInitialSimulatedLoading } from '@/shared/hooks/useSimulatedLoading';
import { HeadcountPageSkeleton } from '@/shared/components/skeletons/pageSkeletons';

export default function HeadcountPage() {
  const pageLoading = useInitialSimulatedLoading(560);
  const { isDark } = useTheme();
  const sliceStroke = donutSliceStroke(isDark);
  const legendStyle = donutLegendStyle(isDark);

  const [hoverSetor, setHoverSetor] = useState<number | null>(null);
  const [hoverGen, setHoverGen] = useState<number | null>(null);
  const [hoverEdu, setHoverEdu] = useState<number | null>(null);

  const setorData = useMemo(
    () =>
      groupSmallestAsOutros(
        mockHeadcountDistribucaoEnriquecida.map((d) => ({ name: d.name, value: d.value }))
      ),
    []
  );

  const setorFills = useMemo(() => {
    const values = setorData.map((d) => d.value);
    const palette = sequentialBrandPalette(setorData.length, isDark);
    const ranked = fillsByValueDescending(values, palette);
    return setorData.map((d, i) => (d.name === 'Outros' ? outrosSliceFill(isDark) : ranked[i]));
  }, [setorData, isDark]);

  const generoFills = useMemo(() => {
    const [accent, neutral] = binaryAccentNeutral(isDark);
    const maxV = Math.max(...mockHeadcountGenero.map((g) => g.value));
    return mockHeadcountGenero.map((g) => (g.value >= maxV ? accent : neutral));
  }, [isDark]);

  const escolaridadeFills = useMemo(() => {
    const pal = sequentialBrandPalette(mockHeadcountEscolaridade.length, isDark);
    return fillsByValueDescending(
      mockHeadcountEscolaridade.map((e) => e.value),
      pal
    );
  }, [isDark]);
  const totalAtivos = mockHeadcountTable.reduce((acc, curr) => acc + curr.ativos, 0);
  const totalDisponiveis = mockHeadcountTable.reduce((acc, curr) => acc + curr.disponiveis, 0);

  if (pageLoading) return <HeadcountPageSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28 }}
      className="space-y-8 pb-10"
    >
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
                <h3 className="text-3xl font-bold tabular-nums tracking-tight text-[#e7e5e4] dark:text-white">{totalAtivos}</h3>
                <p className="text-sm font-normal text-muted-foreground mt-1">Total de Colaboradores</p>
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
                <h3 className="text-3xl font-bold tabular-nums tracking-tight text-[#e7e5e4] dark:text-white">{totalDisponiveis}</h3>
                <p className="text-sm font-normal text-muted-foreground mt-1">Vagas em Aberto</p>
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
                <h3 className="text-3xl font-bold tabular-nums tracking-tight text-[#e7e5e4] dark:text-white">{mockHeadcountTable.length}</h3>
                <p className="text-sm font-normal text-muted-foreground mt-1">Departamentos</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Building2 size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChartIcon className="text-primary" size={20} />
              Composição por gênero
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockHeadcountGenero}
                  innerRadius={68}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={(_, i) => setHoverGen(i)}
                  onMouseLeave={() => setHoverGen(null)}
                >
                  {mockHeadcountGenero.map((_, index) => (
                    <Cell
                      key={`gen-${index}`}
                      fill={
                        hoverGen === index ? brightenHex(generoFills[index], 0.14) : generoFills[index]
                      }
                      stroke={sliceStroke}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value) => [`${value} colaboradores`, 'Ativos']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={legendStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChartIcon className="text-primary" size={20} />
              Distribuição por escolaridade
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockHeadcountEscolaridade}
                  innerRadius={68}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={(_, i) => setHoverEdu(i)}
                  onMouseLeave={() => setHoverEdu(null)}
                >
                  {mockHeadcountEscolaridade.map((_, index) => (
                    <Cell
                      key={`edu-${index}`}
                      fill={
                        hoverEdu === index ? brightenHex(escolaridadeFills[index], 0.14) : escolaridadeFills[index]
                      }
                      stroke={sliceStroke}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  formatter={(value) => [`${value} colaboradores`, 'Ativos']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={legendStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
        {/* Distribuição Chart */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <PieChartIcon className="text-primary" size={20} />
              Distribuição por Setor
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={setorData}
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={(_, i) => setHoverSetor(i)}
                  onMouseLeave={() => setHoverSetor(null)}
                >
                  {setorData.map((_, index) => (
                    <Cell
                      key={`setor-${index}`}
                      fill={
                        hoverSetor === index ? brightenHex(setorFills[index], 0.14) : setorFills[index]
                      }
                      stroke={sliceStroke}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value} colaboradores`, 'Ativos']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={legendStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Organograma Simples */}
        <Card className="flex flex-col h-full overflow-hidden bg-zinc-800/20">
          <CardHeader className="bg-[#1e293b] border-b border-[#334155] pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Network className="text-primary" size={20} />
              Organograma Resumido
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col items-center justify-center overflow-auto gap-6">
            {/* Diretoria */}
            <div className="bg-[#0f172a] text-white p-4 rounded-radius-l text-center  w-64 border border-[#334155] z-10 relative">
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
                <div key={index} className="bg-[#1e293b] border border-[#334155] p-4 rounded-radius-l text-center  w-[22%] sm:w-[23%] flex flex-col transition-all hover:-translate-y-1 hover: cursor-default">
                  <h5 className="font-bold text-zinc-200 text-[13px] leading-tight mb-2 h-10 flex items-center justify-center">{setor.nome}</h5>
                  <div className="mt-auto">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-radius-s mb-1">{setor.lider}</span>
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
        <h3 className="text-xl font-bold tracking-tight mt-6 text-[#e7e5e4] dark:text-white">Detalhamento de Vagas Operacionais</h3>
        <div className="bg-[#1e293b] rounded-radius-l  border border-[#334155] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-500 bg-[#0f172a] uppercase border-b border-[#334155]">
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
                    <tr key={idx} className="border-b border-[#334155] hover:bg-zinc-800/20 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#e7e5e4] dark:text-white">{item.setor}</td>
                      <td className="px-6 py-4 text-center font-bold tabular-nums text-blue-600 dark:text-blue-400">{item.ativos}</td>
                      <td className="px-6 py-4 text-center text-zinc-400 font-normal">{item.aprovadas}</td>
                      <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-normal">{item.ocupadas}</td>
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
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-radius-m ${statusColor}`}>
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
    </motion.div>
  );
}
