import { useEffect, useState } from "react";
import { delay } from "@/shared/lib/delay";

/** Simula primeira carga de página (dados mock / API). */
export function useInitialSimulatedLoading(ms = 520) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void delay(ms).then(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [ms]);

  return isLoading;
}

/**
 * Conteúdo interno de drawer/painel: ao abrir ou trocar entidade,
 * exibe skeleton até o “carregamento” simulado terminar.
 */
export function useDrawerContentReady(
  open: boolean,
  entityKey: string | number | null | undefined,
  ms = 400
) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open || entityKey == null || entityKey === "") {
      setReady(false);
      return;
    }
    setReady(false);
    let cancelled = false;
    void delay(ms).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [open, entityKey, ms]);

  return ready;
}
