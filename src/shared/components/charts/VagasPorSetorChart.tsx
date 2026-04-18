import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import type { VacancySectorData } from "@/shared/types";
import { motion } from "framer-motion";
import { useChartTheme } from "@/shared/components/charts/chartTheme";

interface VagasPorSetorChartProps {
  data: VacancySectorData[];
}

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];

export function VagasPorSetorChart({ data }: VagasPorSetorChartProps) {
  const { gridStroke, axisTickFill, tooltipStyle, cursorFill } = useChartTheme();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Vagas Abertas por Setor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={gridStroke} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="setor"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{ fill: axisTickFill, fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: cursorFill, radius: 4 }}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="vagas" radius={[0, 4, 4, 0]} barSize={24}>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
