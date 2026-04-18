import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useChartTheme } from "@/shared/components/charts/chartTheme";

interface TurnoverChartProps {
  data: any[];
}

export const TurnoverChart: FC<TurnoverChartProps> = ({ data }) => {
  const { gridStroke, axisTickFill, tooltipStyle } = useChartTheme();
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-muted-foreground">Turnover Mensal (%)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTurnover" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: axisTickFill }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: axisTickFill }} dx={-10} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area 
              type="monotone" 
              dataKey="turnover" 
              name="Turnover Total %" 
              stroke="#DC2626" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTurnover)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
