import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface DHOContextType {
  kpiUpdates: {
    horaHomemMes: number;
    participantesMes: number;
  };
  addKpiUpdate: (horaHomem: number, participantes: number) => void;
}

const DHOContext = createContext<DHOContextType | undefined>(undefined);

export function DHOProvider({ children }: { children: ReactNode }) {
  const [kpiUpdates, setKpiUpdates] = useState({ horaHomemMes: 0, participantesMes: 0 });

  const addKpiUpdate = (horaHomem: number, participantes: number) => {
    setKpiUpdates((prev) => ({
      horaHomemMes: prev.horaHomemMes + horaHomem,
      participantesMes: prev.participantesMes + participantes,
    }));
  };

  return (
    <DHOContext.Provider value={{ kpiUpdates, addKpiUpdate }}>
      {children}
    </DHOContext.Provider>
  );
}

export function useDHOContext() {
  const context = useContext(DHOContext);
  if (context === undefined) {
    throw new Error('useDHOContext must be used within DHOProvider');
  }
  return context;
}
