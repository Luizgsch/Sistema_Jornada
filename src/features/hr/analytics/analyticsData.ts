/**
 * Ponto único de importação de dados mockados para o hub Analytics (BI).
 * Quando houver API real, substitua as exportações por hooks ou serviços aqui.
 */
export {
  mockAnalyticsStats,
  mockRecruitmentFunnel,
  mockCandidateSources,
  mockHeadcountHistory,
  mockContractTypes,
  mockTurnoverReasons,
  mockTurnoverHistory,
  mockTrainingVolumeHistory,
  mockTrainingStatusDistribution,
  mockTrainingModalityMix,
} from "@/infrastructure/mock/mockAnalytics";
