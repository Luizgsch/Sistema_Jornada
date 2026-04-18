import { useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import {
  Briefcase,
  Users,
  Activity,
  TrendingDown,
  Clock,
  SlidersHorizontal,
  CalendarDays,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";

/* ─── Mock histórico ─────────────────────────────────────────────── */
const turnoverHistory = [
  { mes: "Out", v: 4.1 },
  { mes: "Nov", v: 3.8 },
  { mes: "Dez", v: 3.5 },
  { mes: "Jan", v: 3.9 },
  { mes: "Fev", v: 3.4 },
  { mes: "Mar", v: 3.2 },
];

const slaSlices = [
  { label: "No prazo (≤ 15 dias)", value: 17, total: 23, color: "#14b8a6", cls: "bg-teal-500" },
  { label: "Em risco (16–20 dias)", value: 3, total: 23, color: "#f59e0b", cls: "bg-amber-500" },
  { label: "Vencido (> 20 dias)", value: 3, total: 23, color: "#ef4444", cls: "bg-rose-500" },
];

/* ─── Semicircle SVG ─────────────────────────────────────────────── */
function SemiCircleProgress({ pct, color }: { pct: number; color: string }) {
  const r = 50;
  const cx = 60;
  const cy = 58;
  const totalLen = Math.PI * r;
  const filled = (pct / 100) * totalLen;
  const d = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  return (
    <svg width={120} height={66} viewBox="0 0 120 66" className="overflow-visible">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={9}
        className="text-zinc-200 dark:text-zinc-800" strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${totalLen}`} />
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize={15} fontWeight="700"
        fill="currentColor" className="text-zinc-800 dark:text-[#e7e5e4]" style={{ fill: color }}>
        {pct}%
      </text>
    </svg>
  );
}

/* ─── Tooltip customizado ─────────────────────────────────────────── */
function SparkTooltip({ active, payload }: { active?: boolean; payload?: { value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-zinc-900 dark:bg-zinc-800 border border-zinc-700 rounded-radius-m px-2.5 py-1.5 text-xs shadow-xl">
      <span className="font-bold text-indigo-300">{payload[0].value}%</span>
    </div>
  );
}

/* ─── Card base wrapper ───────────────────────────────────────────── */
function BentoCard({
  children,
  colSpan,
  delay,
  alert,
  className,
}: {
  children: React.ReactNode;
  colSpan?: "2" | "1";
  delay?: number;
  alert?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay ?? 0 }}
      className={cn(
        colSpan === "2" ? "col-span-1 sm:col-span-2" : "col-span-1",
        "group relative rounded-radius-l border p-6",
        "bg-white dark:bg-zinc-900",
        "border-zinc-100 dark:border-zinc-800",
        "shadow-sm dark:shadow-none",
        "transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out",
        "hover:scale-[1.02] hover:shadow-md",
        "hover:border-indigo-300/60 dark:hover:border-indigo-500/40",
        alert && "ring-2 ring-rose-500/40 dark:ring-rose-500/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ─── Período options ─────────────────────────────────────────────── */
const PERIODS = ["Esta semana", "Este mês", "Trimestre", "Semestre"];

/* ─── Componente principal ────────────────────────────────────────── */
export function BentoKpiGrid() {
  const [periodo, setPeriodo] = useState("Este mês");

  const slaOnTimePct = Math.round((17 / 23) * 100); // 74%
  const slaAlert = true; // média atual 18d > meta 15d

  return (
    <div className="space-y-8">
      {/* ── Barra de filtros ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-radius-m border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 shadow-sm dark:shadow-none transition-colors">
          <CalendarDays size={15} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="bg-transparent text-sm text-zinc-700 dark:text-zinc-200 font-medium outline-none cursor-pointer"
          >
            {PERIODS.map((p) => (
              <option key={p} value={p} className="bg-white dark:bg-zinc-900">
                {p}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-radius-m border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 shadow-sm dark:shadow-none hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
        >
          <SlidersHorizontal size={14} />
          Filtrar
        </button>
      </div>

      {/* ── Bento Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {/* ── 1. Taxa de Turnover (col-span-2) ── sparkline indigo */}
        <BentoCard colSpan="2" delay={0.05}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                Taxa de Turnover
              </p>
              <div className="flex items-end gap-3 mt-2">
                <span className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
                  3.2%
                </span>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-radius-m mb-0.5">
                  <ArrowDownRight size={12} />
                  0.5%
                </span>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Meta mensal: ≤ 3.0% · Tendência de queda
              </p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-radius-m bg-indigo-50 dark:bg-indigo-500/10">
              <TrendingDown size={18} className="text-indigo-500 dark:text-indigo-400" />
            </div>
          </div>

          {/* Sparkline */}
          <div className="h-16 -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoverHistory} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
                />
                <Tooltip
                  content={<SparkTooltip />}
                  cursor={{ stroke: "#6366f1", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-1 px-1">
            {turnoverHistory.map((d) => (
              <span key={d.mes} className="text-[10px] text-zinc-400 dark:text-zinc-600">
                {d.mes}
              </span>
            ))}
          </div>
        </BentoCard>

        {/* ── 2. SLA de Contratação (col-span-2) ── semicircle */}
        <BentoCard colSpan="2" delay={0.1} alert={slaAlert}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
                SLA de Contratação
              </p>
              <div className="flex items-end gap-3 mt-2">
                <span className="text-3xl font-bold tracking-tight text-amber-600 dark:text-amber-400">
                  18 dias
                </span>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-radius-m mb-0.5">
                  <ArrowUpRight size={12} />
                  acima da meta
                </span>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Meta: até 15 dias úteis por vaga
              </p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-radius-m bg-amber-50 dark:bg-amber-500/10">
              <Clock size={18} className="text-amber-500 dark:text-amber-400" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Semicircle */}
            <div className="shrink-0 flex flex-col items-center">
              <SemiCircleProgress pct={slaOnTimePct} color="#14b8a6" />
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 -mt-1">no prazo</p>
            </div>

            {/* Barras */}
            <div className="flex-1 space-y-2.5">
              {slaSlices.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500 dark:text-zinc-400">{s.label}</span>
                    <span className="font-bold" style={{ color: s.color }}>
                      {s.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", s.cls)}
                      style={{ width: `${(s.value / s.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* ── 3. Vagas em Aberto (col-span-1) */}
        <BentoCard colSpan="1" delay={0.15}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 leading-tight">
              Vagas em Aberto
            </p>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-radius-m bg-teal-50 dark:bg-teal-500/10">
              <Briefcase size={16} className="text-teal-500 dark:text-teal-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
              23
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-radius-m mb-0.5">
              <ArrowDownRight size={11} />2
            </span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            3 com SLA crítico
          </p>
        </BentoCard>

        {/* ── 4. Matrículas Ativas (col-span-1) */}
        <BentoCard colSpan="1" delay={0.2}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 leading-tight">
              Matrículas Ativas
            </p>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-radius-m bg-blue-50 dark:bg-blue-500/10">
              <Users size={16} className="text-blue-500 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
              842
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-radius-m mb-0.5">
              <ArrowUpRight size={11} />12
            </span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            Headcount atual
          </p>
        </BentoCard>

        {/* ── 5. Absenteísmo (col-span-1) */}
        <BentoCard colSpan="1" delay={0.25}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 leading-tight">
              Absenteísmo
            </p>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-radius-m bg-rose-50 dark:bg-rose-500/10">
              <Activity size={16} className="text-rose-500 dark:text-rose-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
              4.7%
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded-radius-m mb-0.5">
              <ArrowUpRight size={11} />1.5%
            </span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            Meta: ≤ 3.5%
          </p>
        </BentoCard>

        {/* ── 6. Taxa de Desistência (col-span-1) */}
        <BentoCard colSpan="1" delay={0.3}>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 leading-tight">
              Taxa de Desistência
            </p>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-radius-m bg-amber-50 dark:bg-amber-500/10">
              <TrendingDown size={16} className="text-amber-500 dark:text-amber-400" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
              12%
            </span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded-radius-m mb-0.5">
              <ArrowUpRight size={11} />1.5%
            </span>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            Candidatos em processo
          </p>
        </BentoCard>

      </div>
    </div>
  );
}
