import { useState, useMemo, Fragment } from 'react'
import LoginPage from '@/features/login/LoginPage'
import HRCommandCenter from '@/features/hr/command-center'
import AdmissoesDashboard from '@/features/hr/admissoes/dashboard'
import DocumentosAdmissionais from '@/features/hr/admissoes/documentos'
import OnboardingPage from '@/features/hr/admissoes/onboarding'
import MatriculasPage from '@/features/hr/admissoes/matriculas'
import RecrutamentoDashboard from '@/features/hr/recrutamento/dashboard'
import GestaoVagas from '@/features/hr/recrutamento/vagas'
import RecruitmentPipeline from '@/features/hr/recrutamento/pipeline'
import TriagemIAPage from '@/features/hr/recrutamento/triagem-ia'
import WhatsAppBotPage from '@/features/hr/recrutamento/whatsapp'
import BancoCandidatos from '@/features/hr/recrutamento/candidatos'
import IndicacoesPage from '@/features/hr/recrutamento/indicacoes'
import ColaboradoresPage from '@/features/hr/operacoes/colaboradores'
import TemporariosPage from '@/features/hr/operacoes/temporarios'
import UniformesPage from '@/features/hr/operacoes/uniformes'
import MovimentacoesPage from '@/features/hr/operacoes/movimentacoes'
import TrilhasPage from '@/features/hr/treinamentos/trilhas'
import CursosPage from '@/features/hr/treinamentos/cursos'
import CertificadosPage from '@/features/hr/treinamentos/certificados'
import IndicadoresPage from '@/features/hr/analytics/indicadores'
import RelatoriosPage from '@/features/hr/analytics/relatorios'
import HeadcountPage from '@/features/hr/operacoes/headcount'
import QuadroEquipesPage from '@/features/hr/operacoes/quadro-equipes'
import DesligamentosPage from '@/features/hr/operacoes/desligamentos'
import CargosPage from '@/features/hr/operacoes/cargos'
import ComunicacaoPage from '@/features/hr/comunicacao'
import DHOPage from '@/features/dho/DHOPage'
import ServicosGeraisPage from '@/features/servicos-gerais/ServicosGeraisPage'
import { AccessDenied } from '@/features/access-denied/AccessDeniedPage'
import { DashboardLayout } from '@/features/layout/DashboardLayout'
import { ToastProvider } from '@/shared/ui/Toast'
import { PageNavProvider } from '@/features/navigation/PageNavContext'
import { getSistemasPorTipo, type Usuario } from '@/infrastructure/mock/mockLogin'
import { AuthProvider, useAuth } from '@/features/auth/AuthContext'
import { type SistemaAtual, getFirstAllowedPage } from '@/domain/auth/roles'
import { ThemeProvider } from '@/features/theme/ThemeContext'
import { TooltipProvider } from '@/shared/ui/Tooltip'

type LoggedInAppProps = {
  activePage: string;
  setActivePage: (page: string) => void;
  sistemaAtual: SistemaAtual;
  setSistemaAtual: (s: SistemaAtual) => void;
  sistemasDisponiveis: ReturnType<typeof getSistemasPorTipo>;
  onLogout: () => void;
};

function LoggedInApp({
  activePage,
  setActivePage,
  sistemaAtual,
  setSistemaAtual,
  sistemasDisponiveis,
  onLogout,
}: LoggedInAppProps) {
  const { canAccessRoute, getFirstAllowedPage: firstAllowed, usuario } = useAuth();

  const renderPage = () => {
    if (!canAccessRoute(sistemaAtual, activePage)) {
      return (
        <AccessDenied
          sistemaAtual={sistemaAtual}
          onGoHome={() => setActivePage(firstAllowed(sistemaAtual))}
        />
      );
    }

    if (sistemaAtual === 'dho') {
      return <DHOPage activePage={activePage} />;
    }
    if (sistemaAtual === 'servicos-gerais') {
      return <ServicosGeraisPage activePage={activePage} />;
    }

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
      case 'headcount':
        return <HeadcountPage />;
      case 'quadro-equipes':
        return <QuadroEquipesPage />;
      case 'temporarios':
        return <TemporariosPage />;
      case 'uniformes':
        return <UniformesPage />;
      case 'movimentacoes':
        return <MovimentacoesPage />;
      case 'desligamentos':
        return <DesligamentosPage />;
      case 'descricao-cargos':
        return <CargosPage />;
      case 'comunicacao-interna':
        return <ComunicacaoPage />;
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
      case 'operacoes-epis':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold">EPIs</h1>
            <p className="mt-2 text-muted-foreground">
              Controle de EPIs e conformidade — módulo em preparação para o Sistema Jornada.
            </p>
          </div>
        );
      case 'beneficios-operacionais':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold">Benefícios operacionais</h1>
            <p className="mt-2 text-muted-foreground">
              Visão consolidada de benefícios para operações — em preparação.
            </p>
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold capitalize">{activePage.replace('-', ' ')}</h1>
            <p className="text-muted-foreground mt-2">Esta página está sendo preparada para o sistema.</p>
          </div>
        );
    }
  };

  return (
    <PageNavProvider navigateTo={setActivePage}>
      <DashboardLayout
        activePage={activePage}
        onPageChange={setActivePage}
        sistemaAtual={sistemaAtual}
        onSistemaChange={setSistemaAtual}
        sistemasDisponiveis={sistemasDisponiveis}
        usuario={usuario}
        onLogout={onLogout}
      >
        <Fragment key={sistemaAtual}>{renderPage()}</Fragment>
      </DashboardLayout>
    </PageNavProvider>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [activePage, setActivePage] = useState('command-center');
  const [sistemaAtual, setSistemaAtual] = useState<SistemaAtual>('hr-core');

  const handleLogin = (user: Usuario, sistemaInicial: string) => {
    const sys = sistemaInicial as SistemaAtual;
    setUsuario(user);
    setSistemaAtual(sys);
    setIsLoggedIn(true);
    setActivePage(getFirstAllowedPage(user.tipo, sys));
  };

  const sistemasDisponiveis = useMemo(() => {
    if (!usuario) return [];
    return getSistemasPorTipo(usuario.tipo);
  }, [usuario]);

  if (!isLoggedIn || !usuario) {
    return (
      <ThemeProvider>
        <TooltipProvider>
          <ToastProvider>
            <LoginPage onLogin={handleLogin} />
          </ToastProvider>
        </TooltipProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
    <TooltipProvider>
    <ToastProvider>
      <AuthProvider usuario={usuario}>
        <LoggedInApp
          activePage={activePage}
          setActivePage={setActivePage}
          sistemaAtual={sistemaAtual}
          setSistemaAtual={setSistemaAtual}
          sistemasDisponiveis={sistemasDisponiveis}
          onLogout={() => {
            setIsLoggedIn(false);
            setUsuario(null);
          }}
        />
      </AuthProvider>
    </ToastProvider>
    </TooltipProvider>
    </ThemeProvider>
  );
}

export default App
