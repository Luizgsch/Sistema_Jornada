export const mockHeadcountTable = [
  {
    setor: "Tecnologia",
    ativos: 45,
    aprovadas: 50,
    ocupadas: 45,
    disponiveis: 5,
  },
  {
    setor: "Vendas",
    ativos: 32,
    aprovadas: 35,
    ocupadas: 32,
    disponiveis: 3,
  },
  {
    setor: "Marketing",
    ativos: 15,
    aprovadas: 16,
    ocupadas: 15,
    disponiveis: 1,
  },
  {
    setor: "Atendimento",
    ativos: 80,
    aprovadas: 90,
    ocupadas: 80,
    disponiveis: 10,
  },
  {
    setor: "Financeiro",
    ativos: 12,
    aprovadas: 12,
    ocupadas: 12,
    disponiveis: 0,
  },
  {
    setor: "Recursos Humanos",
    ativos: 8,
    aprovadas: 10,
    ocupadas: 8,
    disponiveis: 2,
  }
];

export const mockHeadcountDistribucao = mockHeadcountTable.map(item => ({
  name: item.setor,
  value: item.ativos
}));

/** Série estendida só para o donut "por setor" (>6 categorias → fatia Outros no UI). */
export const mockHeadcountDistribucaoEnriquecida = [
  ...mockHeadcountDistribucao,
  { name: "Jurídico", value: 5 },
  { name: "Qualidade", value: 4 },
  { name: "Compras", value: 3 },
];

/** Composição demográfica (donuts Headcount) */
export const mockHeadcountGenero = [
  { name: "Masculino", value: 118 },
  { name: "Feminino", value: 74 },
];

export const mockHeadcountEscolaridade = [
  { name: "Superior completo", value: 98 },
  { name: "Superior incompleto", value: 42 },
  { name: "Técnico", value: 28 },
  { name: "Médio", value: 18 },
  { name: "Pós / MBA", value: 6 },
];

export const mockOrgChart = {
  diretoria: {
    nome: "Diretoria Executiva",
    headcount: 4,
    setores: [
      {
        nome: "Tecnologia e Produto",
        headcount: 45,
        lider: "CTO",
      },
      {
        nome: "Receita (Vendas & Mkt)",
        headcount: 47,
        lider: "CRO",
      },
      {
        nome: "Operações & Atendimento",
        headcount: 80,
        lider: "COO",
      },
      {
        nome: "Backoffice (Fin & HR)",
        headcount: 20,
        lider: "CFO",
      }
    ]
  }
};
