import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Search, Send, Paperclip, Calendar, FileText, CheckCircle2, MessageCircle, MessageSquare, Phone, Video, MoreVertical, Settings, Bot, Users, Zap, Save, RefreshCw } from 'lucide-react';
import { mockContatosComunicacao, mockMensagensPorContato } from '@/infrastructure/mock/mockComunicacao';
import { useToast } from '@/shared/ui/Toast';
import { cn } from '@/shared/lib/cn';
import { StatusBadge } from '@/shared/ui/StatusBadge';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'conversas' | 'configuracoes';

const botMenuOptions = [
  { numero: "1", texto: "Acompanhar processo seletivo", resposta: "Seu processo está na etapa de entrevista com o gestor. Em breve entraremos em contato com os próximos passos!" },
  { numero: "2", texto: "Falar com Recrutamento", resposta: "Um recruiter disponível vai atender você. Tempo médio de resposta: 5 minutos." },
  { numero: "3", texto: "Enviar documentos", resposta: "Por favor, clique no link para fazer upload dos documentos necessários: bit.ly/rh-docs" },
  { numero: "4", texto: "Agendar entrevista", resposta: "Para agendar sua entrevista, favor acessar o link de agendamento: bit.ly/rh-entrevista" },
  { numero: "5", texto: "Ver vagas disponíveis", resposta: "No momento temos vagas abertas para: Dev Backend, Analista de Dados e Designer UX. Candidate-se em: rh.empresa.com/vagas" },
  { numero: "0", texto: "Falar com atendente humano", resposta: "Encaminhando para um atendente. Por favor, aguarde..." },
];

const statCards = [
  { label: "Mensagens Enviadas", value: "1.247", icon: MessageCircle, color: "text-primary" },
  { label: "Candidatos Atendidos", value: "89", icon: Users, color: "text-emerald-500" },
  { label: "Atendimentos IA", value: "72%", icon: Bot, color: "text-amber-500" },
  { label: "Tempo Médio Resposta", value: "2min", icon: Zap, color: "text-blue-500" },
];

export default function WhatsAppBotPage() {
  const [activeTab, setActiveTab] = useState<TabType>('conversas');
  const [activeContactId, setActiveContactId] = useState<string>(mockContatosComunicacao[0].id);
  const [inputText, setInputText] = useState("");
  const { success, info } = useToast();
  
  const contatos = mockContatosComunicacao;
  const activeContact = contatos.find(c => c.id === activeContactId)!;
  const activeMessages = mockMensagensPorContato[activeContactId] || [];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    success("Mensagem enviada", "Mensagem enviada pelo WhatsApp Bot com sucesso.");
    setInputText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp Bot & Comunicação</h1>
          <p className="text-muted-foreground mt-1">Central de comunicação automatizada com candidatos.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <RefreshCw size={18} />
            Sincronizar
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map((stat, idx) => (
          <Card key={idx} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <h4 className="text-2xl font-black">{stat.value}</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('conversas')}
          className={cn(
            "pb-3 px-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap",
            activeTab === 'conversas' 
              ? "border-primary text-primary" 
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          <MessageCircle size={18} className="inline mr-2" />
          Conversas ativas
        </button>
        <button
          onClick={() => setActiveTab('configuracoes')}
          className={cn(
            "pb-3 px-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap",
            activeTab === 'configuracoes' 
              ? "border-primary text-primary" 
              : "border-transparent text-slate-500 hover:text-slate-700"
          )}
        >
          <Settings size={18} className="inline mr-2" />
          Configurações do Bot
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'conversas' ? (
          <motion.div
            key="conversas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="h-[calc(100vh-20rem)]"
          >
            <div className="flex flex-col lg:flex-row h-full border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="w-full lg:w-80 border-r border-slate-200 flex flex-col bg-slate-50 shrink-0 order-2 lg:order-1">
                <div className="p-4 border-b border-slate-200 bg-white">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar candidato..." 
                      className="w-full pl-9 h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {contatos.map(contato => (
                    <div 
                      key={contato.id}
                      onClick={() => setActiveContactId(contato.id)}
                      className={cn(
                        "p-4 border-b border-slate-100 cursor-pointer transition-colors relative",
                        activeContactId === contato.id ? "bg-primary/5" : "hover:bg-slate-100/50 bg-white"
                      )}
                    >
                      {activeContactId === contato.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                      )}
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={cn("font-bold text-sm truncate pr-2", activeContactId === contato.id ? "text-primary" : "text-slate-800")}>
                          {contato.nome}
                        </h4>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{contato.dataUltimaMensagem}</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate font-medium mb-1.5">{contato.vaga}</div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-400 truncate max-w-[190px]">{contato.ultimaMensagem}</p>
                        {contato.naoLidas > 0 && (
                          <span className="flex items-center justify-center bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full">
                            {contato.naoLidas}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 order-1 lg:order-2">
                <div className="h-16 px-4 lg:px-6 border-b border-slate-200 bg-white/95 backdrop-blur-sm flex items-center justify-between shadow-sm shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center shrink-0">
                      {activeContact.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-800 leading-tight truncate">{activeContact.nome}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                        <span className="text-xs text-slate-500">Online agora</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 lg:gap-2 text-slate-500">
                    <button className="p-2 hover:bg-slate-100 rounded-full"><Phone size={18} /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-full"><Video size={18} /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-full hidden sm:block"><Search size={18} /></button>
                    <button className="p-2 hover:bg-slate-100 rounded-full"><MoreVertical size={18} /></button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  <div className="flex justify-center mb-6">
                    <span className="bg-white/80 backdrop-blur border border-slate-200 text-slate-500 text-xs px-3 py-1 rounded-full shadow-sm">
                      Início da conversa com {activeContact.nome}
                    </span>
                  </div>
                  
                  {activeMessages.map(msg => (
                    <div key={msg.id} className={cn("flex w-full", msg.remetente === 'rh' ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[70%] sm:max-w-[60%] rounded-2xl p-3 shadow-sm",
                        msg.remetente === 'rh' ? "bg-primary text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"
                      )}>
                        {msg.tipo === 'texto' && (
                          <p className="text-[14px] leading-relaxed break-words">{msg.texto}</p>
                        )}
                        {msg.tipo === 'documento' && (
                          <div className="flex flex-col gap-2">
                            <p className="text-[14px] leading-relaxed opacity-90">{msg.texto}</p>
                            <div className={cn(
                              "flex items-center gap-3 p-2 rounded-lg mt-1",
                              msg.remetente === 'rh' ? "bg-white/20" : "bg-slate-50 border border-slate-200"
                            )}>
                              <FileText size={24} className={msg.remetente === 'rh' ? "text-white" : "text-rose-500"} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{msg.anexo?.nome}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={cn(
                          "text-[10px] mt-1.5 flex justify-end gap-1 items-center",
                          msg.remetente === 'rh' ? "text-primary-foreground/70" : "text-slate-400"
                        )}>
                          {msg.horario}
                          {msg.remetente === 'rh' && <CheckCircle2 size={12} className="text-blue-300" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 pb-2 pt-2 flex gap-2 overflow-x-auto no-scrollbar">
                  <button onClick={() => info("Agendar Entrevista", "Convite enviado ao candidato.")} className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center gap-1.5 shadow-sm">
                    <Calendar size={14} /> Agendar Entrevista
                  </button>
                  <button onClick={() => info("Solicitar Documentos", "Mensagem automática enviada.")} className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center gap-1.5 shadow-sm">
                    <FileText size={14} /> Solicitar Documentos
                  </button>
                  <button onClick={() => success("Candidato Aprovado", "Movido para próximo estágio.")} className="shrink-0 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-semibold text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 size={14} /> Mover para Aprovado
                  </button>
                </div>

                <div className="p-4 bg-white border-t border-slate-200 flex items-end gap-3 shrink-0">
                  <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors shrink-0">
                    <Paperclip size={20} />
                  </button>
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-1 shadow-inner focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <textarea 
                      className="w-full bg-transparent border-none focus:outline-none resize-none px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 max-h-32 min-h-[44px]"
                      placeholder="Digite sua mensagem..."
                      rows={1}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    className="p-3 bg-primary text-white hover:bg-primary/90 rounded-full transition-colors shrink-0 shadow-md shadow-primary/30"
                  >
                    <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-72 border-l border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto custom-scrollbar order-3">
                <div className="p-4 lg:p-6 flex flex-col items-center border-b border-slate-100">
                  <div className="h-16 w-16 lg:h-20 lg:w-20 bg-primary/10 text-primary font-bold text-xl lg:text-2xl rounded-full flex items-center justify-center mb-3 lg:mb-4">
                    {activeContact.avatarInitials}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 text-center leading-tight">{activeContact.nome}</h2>
                  <p className="text-sm text-slate-500 mt-1">{activeContact.vaga}</p>
                  <div className="mt-4 w-full flex justify-center">
                    <StatusBadge status={activeContact.status as any} />
                  </div>
                </div>
                
                <div className="p-4 lg:p-6 flex-1 space-y-6">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Informações de Contato</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <Phone size={16} className="text-slate-400 shrink-0" />
                        <span className="truncate">+55 (11) 98888-7777</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <MessageSquare size={16} className="text-slate-400 shrink-0" />
                        <span className="truncate">candidato@email.com</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="configuracoes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-sm">
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Bot size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Configurações do Bot</h3>
                      <p className="text-sm text-muted-foreground">Número oficial de atendimento</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">+55 (11) 99999-0000</p>
                          <p className="text-xs text-muted-foreground">WhatsApp Business API</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Ativo</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">Mensagem de Boas-vindas</label>
                    <textarea 
                      className="w-full mt-2 p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      rows={3}
                      defaultValue="Olá! 👋 Bem-vindo ao RH da Empresa! Sou seu assistente virtual. Como posso ajudá-lo hoje?"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="font-bold text-slate-900">Atendimento Humano</p>
                      <p className="text-xs text-muted-foreground">Transfere para atendente após opção 0</p>
                    </div>
                    <button className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500">
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Menu de Opções</h3>
                      <p className="text-sm text-muted-foreground">Opções do menu automatizado</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {botMenuOptions.map((option) => (
                    <div key={option.numero} className="flex items-center gap-4 p-3 border rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                        {option.numero}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-800">{option.texto}</p>
                      </div>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                        <Settings size={14} />
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Estatísticas do Bot</h3>
                    <p className="text-sm text-muted-foreground">Performance da automação</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <p className="text-3xl font-black text-primary">72%</p>
                    <p className="text-sm text-muted-foreground mt-1">Das mensagens resolvidas pela IA</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <p className="text-3xl font-black text-emerald-500">2min</p>
                    <p className="text-sm text-muted-foreground mt-1">Tempo médio de primeira resposta</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl text-center">
                    <p className="text-3xl font-black text-amber-500">847</p>
                    <p className="text-sm text-muted-foreground mt-1">Conversas este mês</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button className="px-6 py-2 border rounded-xl font-bold hover:bg-slate-50 transition-colors order-2 sm:order-1">
                Restaurar Padrões
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 order-1 sm:order-2">
                <Save size={18} />
                Salvar Configurações
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}