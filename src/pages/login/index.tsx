import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { usuariosMock, getSistemasPorTipo, type Usuario } from '@/data/mock/mockLogin';
import { LogIn, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: (usuario: Usuario, sistemaInicial: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);

  const handleSelectUser = (usuario: Usuario) => {
    const sistemasUsuario = getSistemasPorTipo(usuario.tipo);
    if (sistemasUsuario.length === 1) {
      onLogin(usuario, sistemasUsuario[0].id);
    } else {
      setSelectedUser(usuario);
    }
  };

  const handleSelectSistema = (sistemaId: string) => {
    if (selectedUser) {
      onLogin(selectedUser, sistemaId);
    }
  };

  const sistemas = selectedUser ? getSistemasPorTipo(selectedUser.tipo) : [];

  if (!selectedUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-black text-white">R</span>
            </div>
            <h1 className="text-3xl font-bold text-white">HR Core</h1>
            <p className="text-slate-400 mt-2">Selecione seu perfil para continuar</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-primary" size={20} />
                <span className="font-bold text-white">Usuários de demonstração</span>
              </div>
              
              {usuariosMock.map((usuario) => (
                <button
                  key={usuario.id}
                  onClick={() => handleSelectUser(usuario)}
                  className="w-full flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all group text-left"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold">
                    {usuario.nome.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{usuario.nome}</p>
                    <p className="text-sm text-slate-400 capitalize">{usuario.tipo} - {usuario.setor}</p>
                  </div>
                  <LogIn className="text-slate-500 group-hover:text-primary transition-colors" size={20} />
                </button>
              ))}
            </CardContent>
          </Card>

          <p className="text-center text-slate-500 text-sm mt-6">
            <Shield className="inline mr-1" size={14} />
            Ambiente de demonstração - Selecione um perfil para testar
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-black text-white">{selectedUser.nome.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{selectedUser.nome}</h2>
          <p className="text-slate-400 capitalize">{selectedUser.tipo} - {selectedUser.setor}</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-primary" size={20} />
              <span className="font-bold text-white">Selecione o Sistema</span>
            </div>
            
            <div className="space-y-3">
              {sistemas.map((sistema) => (
                <button
                  key={sistema.id}
                  onClick={() => handleSelectSistema(sistema.id)}
                  className="w-full flex items-center gap-4 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all group text-left border border-transparent hover:border-primary"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <sistema.icon className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">{sistema.label}</p>
                    <p className="text-sm text-slate-400">{sistema.descricao}</p>
                  </div>
                  <LogIn className="text-slate-500 group-hover:text-primary transition-colors" size={20} />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <button 
          onClick={() => setSelectedUser(null)}
          className="w-full mt-4 py-3 text-slate-400 hover:text-white transition-colors"
        >
          ← Voltar para lista de usuários
        </button>
      </motion.div>
    </div>
  );
}