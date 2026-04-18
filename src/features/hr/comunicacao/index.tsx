import { useState } from 'react';
import { Search, Send, Paperclip, Calendar, FileText, CheckCircle2, ChevronRight, MessageSquare, Phone, Video, MoreVertical } from 'lucide-react';
import { mockContatosComunicacao, mockMensagensPorContato } from '@/infrastructure/mock/mockComunicacao';
import { useToast } from '@/shared/ui/Toast';
import { cn } from '@/shared/lib/cn';
import { StatusBadge } from '@/shared/ui/StatusBadge';

export default function ComunicacaoPage() {
  const { success, info } = useToast();
  const [activeContactId, setActiveContactId] = useState<string>(mockContatosComunicacao[0].id);
  const [inputText, setInputText] = useState("");
  
  const contatos = mockContatosComunicacao;
  const activeContact = contatos.find(c => c.id === activeContactId)!;
  const activeMessages = mockMensagensPorContato[activeContactId] || [];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    success("Mensagem enviada", "Mensagem enviada pelo WhatsApp/Email simulado com sucesso.");
    setInputText("");
  };

  const handleQuickAction = (action: string) => {
    info("Ação Executada", `A ação "${action}" foi disparada e enviada via bot.`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -m-8 p-4 pt-0">
      <div className="mb-4 pt-4 px-4 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-[#e7e5e4] dark:text-white">Comunicação e Relacionamento</h1>
        <p className="text-sm text-muted-foreground mt-1">Central de WhatsApp e E-mail integrada ao CRM do Candidato.</p>
      </div>

      {/* Main App Container */}
      <div className="flex-1 overflow-hidden bg-[#1e293b] border border-[#334155]  rounded-radius-l flex">
        
        {/* Left Sidebar - Contacts List */}
        <div className="w-80 border-r border-[#334155] flex flex-col bg-[#0f172a] shrink-0">
          <div className="p-4 border-b border-[#334155] bg-[#1e293b]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
              <input 
                type="text" 
                placeholder="Buscar candidato..." 
                className="w-full pl-9 h-10 rounded-radius-m border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {contatos.map(contato => (
              <div 
                key={contato.id}
                onClick={() => setActiveContactId(contato.id)}
                className={cn(
                  "p-4 border-b border-[#334155] cursor-pointer transition-colors relative",
                  activeContactId === contato.id ? "bg-primary/5" : "hover:bg-zinc-800/30 bg-[#1e293b]"
                )}
              >
                {activeContactId === contato.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                )}
                <div className="flex justify-between items-start mb-1">
                  <h4 className={cn("font-bold text-sm truncate pr-2", activeContactId === contato.id ? "text-primary" : "text-zinc-200")}>
                    {contato.nome}
                  </h4>
                  <span className="text-[10px] text-zinc-600 whitespace-nowrap">{contato.dataUltimaMensagem}</span>
                </div>
                <div className="text-xs text-zinc-500 truncate font-medium mb-1.5">{contato.vaga}</div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-zinc-600 truncate max-w-[190px]">{contato.ultimaMensagem}</p>
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

        {/* Center - Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-800/20 bg-[url('https://th.bing.com/th/id/R.546ee5fb4ebbd7bdef7f3c4dbb718501?rik=z%2fy%2fH9MIFM4pBQ&pid=ImgRaw&r=0')] bg-blend-soft-light bg-opacity-40">
          
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-[#334155] bg-[#1e293b]/95 backdrop-blur-sm flex items-center justify-between  shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center">
                {activeContact.avatarInitials}
              </div>
              <div>
                <h3 className="font-bold text-zinc-200 leading-tight">{activeContact.nome}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-xs text-zinc-500">Online agora</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-zinc-500">
              <button className="p-2 hover:bg-zinc-800 rounded-full"><Phone size={18} /></button>
              <button className="p-2 hover:bg-zinc-800 rounded-full"><Video size={18} /></button>
              <button className="p-2 hover:bg-zinc-800 rounded-full"><Search size={18} /></button>
              <button className="p-2 hover:bg-zinc-800 rounded-full"><MoreVertical size={18} /></button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <div className="flex justify-center mb-6">
               <span className="bg-[#1e293b]/80 backdrop-blur border border-[#334155] text-zinc-500 text-xs px-3 py-1 rounded-full ">
                 Início da conversa com {activeContact.nome}
               </span>
            </div>
            
            {activeMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                <MessageSquare size={48} className="mb-4 opacity-50" />
                <p>Nenhuma mensagem enviada ainda.</p>
              </div>
            ) : (
              activeMessages.map(msg => (
                <div key={msg.id} className={cn("flex w-full", msg.remetente === 'rh' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[70%] sm:max-w-[60%] rounded-radius-l p-3 ",
                    msg.remetente === 'rh' ? "bg-primary text-white rounded-tr-sm" : "bg-[#1e293b] border border-[#334155] text-zinc-200 rounded-tl-sm"
                  )}>
                    
                    {msg.tipo === 'texto' && (
                      <p className="text-[14px] leading-relaxed break-words">{msg.texto}</p>
                    )}

                    {msg.tipo === 'documento' && (
                      <div className="flex flex-col gap-2">
                        <p className="text-[14px] leading-relaxed opacity-90">{msg.texto}</p>
                        <div className={cn(
                          "flex items-center gap-3 p-2 rounded-radius-m mt-1",
                          msg.remetente === 'rh' ? "bg-[#1e293b]/20" : "bg-[#0f172a] border border-[#334155]"
                        )}>
                          <FileText size={24} className={msg.remetente === 'rh' ? "text-white" : "text-rose-500"} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{msg.anexo?.nome}</p>
                            <p className={cn("text-xs", msg.remetente === 'rh' ? "text-white/70" : "text-zinc-600")}>PDF Document</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {msg.tipo === 'convite' && (
                      <div className="flex flex-col gap-2">
                        <p className="text-[14px] leading-relaxed font-bold">{msg.texto}</p>
                        <div className="flex items-center gap-3 p-3 bg-[#1e293b]/20 rounded-radius-m mt-1 border border-zinc-700/20">
                          <Calendar size={28} className="text-white" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">Nova Reunião Agendada</p>
                            <p className="text-xs text-white/80">{msg.anexo?.nome}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={cn(
                      "text-[10px] mt-1.5 flex justify-end gap-1 items-center",
                      msg.remetente === 'rh' ? "text-primary-foreground/70" : "text-zinc-600"
                    )}>
                      {msg.horario}
                      {msg.remetente === 'rh' && <CheckCircle2 size={12} className="text-blue-300" />}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Actions Templates */}
          <div className="px-6 pb-2 pt-2 flex gap-2 overflow-x-auto no-scrollbar">
            <button onClick={() => handleQuickAction("Agendar Entrevista")} className="shrink-0 px-3 py-1.5 bg-[#1e293b] border border-[#334155] rounded-full text-xs font-semibold text-zinc-400 hover:bg-primary hover:text-[#e7e5e4] hover:border-primary transition-colors flex items-center gap-1.5 ">
              <Calendar size={14} /> Agendar Entrevista
            </button>
            <button onClick={() => handleQuickAction("Pedir Documentos")} className="shrink-0 px-3 py-1.5 bg-[#1e293b] border border-[#334155] rounded-full text-xs font-semibold text-zinc-400 hover:bg-primary hover:text-[#e7e5e4] hover:border-primary transition-colors flex items-center gap-1.5 ">
              <FileText size={14} /> Solicitar Documentos
            </button>
            <button onClick={() => handleQuickAction("Aprovar")} className="shrink-0 px-3 py-1.5 bg-[#1e293b] border border-[#334155] rounded-full text-xs font-semibold text-emerald-600 hover:bg-emerald-500 hover:text-[#e7e5e4] transition-colors flex items-center gap-1.5 ">
              <CheckCircle2 size={14} /> Mover para Aprovado
            </button>
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-[#1e293b] border-t border-[#334155] flex items-end gap-3 shrink-0">
            <button className="p-2.5 text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 rounded-full transition-colors shrink-0">
              <Paperclip size={20} />
            </button>
            <div className="flex-1 bg-[#0f172a] border border-[#334155] rounded-radius-l p-1  focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <textarea 
                className="w-full bg-transparent border-none focus:outline-none resize-none px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 max-h-32 min-h-[44px]"
                placeholder="Escreva sua mensagem via WhatsApp..."
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
              className="p-3 bg-primary text-white hover:bg-primary/90 rounded-full transition-colors shrink-0  "
            >
              <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
            </button>
          </div>
        </div>

        {/* Right Sidebar - CRM Properties Panel */}
        <div className="w-72 border-l border-[#334155] bg-[#1e293b] flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="p-6 flex flex-col items-center border-b border-[#334155]">
            <div className="h-20 w-20 bg-primary/10 text-primary font-bold text-2xl rounded-full flex items-center justify-center mb-4">
              {activeContact.avatarInitials}
            </div>
            <h2 className="text-lg font-bold text-[#e7e5e4] text-center leading-tight">{activeContact.nome}</h2>
            <p className="text-sm text-zinc-500 mt-1">{activeContact.vaga}</p>
            
            <div className="mt-4 w-full flex justify-center">
              <StatusBadge status={activeContact.status as any} />
            </div>
          </div>
          
          <div className="p-6 flex-1 space-y-6">
            <section>
              <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Informações de Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Phone size={16} className="text-zinc-600" />
                  +55 (11) 98888-7777
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <MessageSquare size={16} className="text-zinc-600" />
                  candidato@email.com
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-3">Documentos Anexos</h4>
              {activeContact.documentosEnviados.length === 0 ? (
                <p className="text-sm text-zinc-500 italic">Nenhum documento.</p>
              ) : (
                <ul className="space-y-2">
                  {activeContact.documentosEnviados.map((doc, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 bg-[#0f172a] border border-[#334155] rounded-radius-m group hover:border-zinc-700 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText size={14} className="text-rose-500 shrink-0" />
                        <span className="text-xs font-medium text-zinc-300 truncate">{doc}</span>
                      </div>
                      <ChevronRight size={14} className="text-zinc-400 group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}
