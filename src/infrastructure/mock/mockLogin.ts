import { LayoutDashboard, Building2, Wrench } from 'lucide-react';

export type TipoUsuario = 'admin' | 'gestor' | 'rh' | 'logistica' | 'financeiro';

export interface SistemaAcesso {
  id: string;
  label: string;
  descricao: string;
  icon: typeof LayoutDashboard;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  setor: string;
}

export const usuariosMock: Usuario[] = [
  { id: "1", nome: "Administrador Sistema", email: "admin@empresa.com", tipo: "admin", setor: "TI" },
  { id: "2", nome: "Roberto Gerente", email: "roberto@empresa.com", tipo: "gestor", setor: "Operações" },
  { id: "3", nome: "Mariana RH", email: "mariana@empresa.com", tipo: "rh", setor: "Recursos Humanos" },
  { id: "4", nome: "Juliana Logística", email: "juliana@empresa.com", tipo: "logistica", setor: "Logística" },
  { id: "5", nome: "Carlos Financeiro", email: "carlos@empresa.com", tipo: "financeiro", setor: "Financeiro" },
];

export const getSistemasPorTipo = (tipo: TipoUsuario): SistemaAcesso[] => {
  switch (tipo) {
    case 'admin':
    case 'gestor':
      return [
        { id: 'hr-core', label: 'HR Core', descricao: 'Recrutamento e operações RH', icon: LayoutDashboard },
        { id: 'dho', label: 'DHO', descricao: 'T&D, comunicação interna e consultoria', icon: Building2 },
        { id: 'servicos-gerais', label: 'Serviços Gerais', descricao: 'NFs, Attos, benefícios e infraestrutura', icon: Wrench },
      ];
    case 'rh':
      return [
        { id: 'hr-core', label: 'HR Core', descricao: 'Recrutamento e operações RH', icon: LayoutDashboard },
        { id: 'dho', label: 'DHO', descricao: 'T&D e comunicação interna', icon: Building2 },
      ];
    case 'logistica':
      return [
        { id: 'dho', label: 'DHO', descricao: 'Solicitações de treinamento e consultoria', icon: Building2 },
        { id: 'servicos-gerais', label: 'Serviços Gerais', descricao: 'Facilities, refeitório e benefícios', icon: Wrench },
      ];
    case 'financeiro':
      return [
        { id: 'dho', label: 'DHO', descricao: 'Solicitações de treinamento e consultoria', icon: Building2 },
        { id: 'servicos-gerais', label: 'Serviços Gerais', descricao: 'NFs, faturamento Elo/Attos e compras', icon: Wrench },
      ];
    default:
      return [];
  }
};