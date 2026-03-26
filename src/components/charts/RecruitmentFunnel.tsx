import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import type { FunnelData } from "../../types";
import { motion } from "framer-motion";

interface RecruitmentFunnelProps {
  data: FunnelData[];
}

const COLORS = ["#4c1d95", "#6d28d9", "#8b5cf6", "#a78bfa", "#c4b5fd"];

export function RecruitmentFunnel({ data }: RecruitmentFunnelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Funil de Recrutamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20, right: 60 }}>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="stage"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  className="text-xs font-bold"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={40}>
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <LabelList
                    dataKey="count"
                    position="right"
                    className="text-sm font-bold fill-foreground"
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
