import { BarChart3, Briefcase, Users } from "lucide-react";
import { cn } from "@/shared/lib/cn";

type CommandCenterWelcomeProps = {
  nome: string;
  title: string;
  description: string;
  navigateTo: (pageId: string) => void;
};

export function CommandCenterWelcome({ nome, title, description, navigateTo }: CommandCenterWelcomeProps) {
  const actions = [
    { id: "vagas", label: "Vagas", icon: Briefcase },
    { id: "colaboradores", label: "Colaboradores", icon: Users },
    { id: "indicadores", label: "Analytics", icon: BarChart3 },
  ] as const;

  return (
    <section
      className={cn(
        "rounded-radius-l border p-5 sm:p-6 shadow-sm",
        "border-zinc-200/90 bg-gradient-to-br from-white via-white to-zinc-50/90",
        "dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950/90"
      )}
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8">
        <div className="min-w-0 flex-1 lg:max-w-2xl xl:max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-500/90">
            Posigraf · HR Core
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-zinc-800 dark:text-[#e7e5e4] sm:text-2xl">
            {title}
          </h1>
          <p className="mt-3 text-lg font-semibold tracking-tight text-zinc-800 dark:text-[#e7e5e4]">
            Olá, {nome}
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed text-pretty">{description}</p>
        </div>
        <div
          className={cn(
            "flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-col lg:justify-center",
            "shrink-0 lg:w-[min(100%,17rem)] xl:w-72"
          )}
        >
          {actions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => navigateTo(id)}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-radius-m border px-4 py-2.5 text-sm font-semibold transition-colors",
                "border-zinc-200 bg-white text-zinc-800 hover:border-teal-400/60 hover:bg-teal-50/80",
                "dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-[#e7e5e4] dark:hover:border-teal-500/40 dark:hover:bg-zinc-800/80"
              )}
            >
              <Icon size={16} className="text-teal-600 dark:text-teal-400 shrink-0" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
