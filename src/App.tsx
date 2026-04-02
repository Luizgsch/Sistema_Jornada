import { useState } from 'react'
import HRCommandCenter from '@/pages/command-center'
import AdmissoesDashboard from '@/pages/admissoes/dashboard'
import DocumentosAdmissionais from '@/pages/admissoes/documentos'
import OnboardingPage from '@/pages/admissoes/onboarding'
import MatriculasPage from '@/pages/admissoes/matriculas'
import RecrutamentoDashboard from '@/pages/recrutamento/dashboard'
import GestaoVagas from '@/pages/recrutamento/vagas'
import RecruitmentPipeline from '@/pages/recrutamento/pipeline'
import TriagemIAPage from '@/pages/recrutamento/triagem-ia'
import WhatsAppBotPage from '@/pages/recrutamento/whatsapp'
import BancoCandidatos from '@/pages/recrutamento/candidatos'
import IndicacoesPage from '@/pages/recrutamento/indicacoes'
import ColaboradoresPage from '@/pages/operacoes/colaboradores'
import TemporariosPage from '@/pages/operacoes/temporarios'
import UniformesPage from '@/pages/operacoes/uniformes'
import MovimentacoesPage from '@/pages/operacoes/movimentacoes'
import TrilhasPage from '@/pages/treinamentos/trilhas'
import CursosPage from '@/pages/treinamentos/cursos'
import CertificadosPage from '@/pages/treinamentos/certificados'
import IndicadoresPage from '@/pages/analytics/indicadores'
import RelatoriosPage from '@/pages/analytics/relatorios'
import { DashboardLayout } from '@/layouts/dashboard-layout/DashboardLayout'
import { ToastProvider } from '@/components/ui/Toast'

function App() {
  const [activePage, setActivePage] = useState('command-center')

  const renderPage = () => {
    switch (activePage) {
      case 'command-center':
        return <HRCommandCenter />;
      case 'recrutamento-dashboard':
        return <RecrutamentoDashboard />;
      case 'vagas':
        return <GestaoVagas />;
      case 'pipeline':
        return <RecruitmentPipeline />;
      case 'triagem-ia':
        return <TriagemIAPage />;
      case 'whatsapp':
        return <WhatsAppBotPage />;
      case 'candidatos':
        return <BancoCandidatos />;
      case 'indicacoes':
        return <IndicacoesPage />;
      case 'dashboard-admissoes':
        return <AdmissoesDashboard />;
      case 'documentos':
        return <DocumentosAdmissionais />;
      case 'onboarding':
        return <OnboardingPage />;
      case 'matriculas':
        return <MatriculasPage />;
      case 'colaboradores':
        return <ColaboradoresPage />;
      case 'temporarios':
        return <TemporariosPage />;
      case 'uniformes':
        return <UniformesPage />;
      case 'movimentacoes':
        return <MovimentacoesPage />;
      case 'trilhas':
        return <TrilhasPage />;
      case 'cursos':
        return <CursosPage />;
      case 'certificados':
        return <CertificadosPage />;
      case 'indicadores':
        return <IndicadoresPage />;
      case 'relatorios':
        return <RelatoriosPage />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold capitalize">{activePage.replace('-', ' ')}</h1>
            <p className="text-muted-foreground mt-2">Esta página está sendo preparada para o sistema.</p>
          </div>
        );
    }
  }

  return (
    <ToastProvider>
      <DashboardLayout 
        activePage={activePage} 
        onPageChange={setActivePage}
      >
        {renderPage()}
      </DashboardLayout>
    </ToastProvider>
  )
}

export default App