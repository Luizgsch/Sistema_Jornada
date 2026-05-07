import { useState } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';
import { useToast } from '@/shared/ui/Toast';
import { Upload, Download, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface CarimboModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'single' | 'batch';
  batchCount?: number;
}

type CarimboTexto = 'CONFERIDO' | 'APROVADO' | 'PENDENTE' | 'CUSTOM';
type CarimboCor = 'red' | 'blue' | 'green';

export const CarimboModal = ({
  isOpen,
  onClose,
  mode = 'single',
  batchCount = 1,
}: CarimboModalProps) => {
  const { success, error } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [textoCarimbo, setTextoCarimbo] = useState<CarimboTexto>('CONFERIDO');
  const [customTexto, setCustomTexto] = useState('');
  const [corCarimbo, setCorCarimbo] = useState<CarimboCor>('red');
  const [dataCarimbo, setDataCarimbo] = useState(new Date().toISOString().split('T')[0]);
  const [procesando, setProcesando] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => {
      const type = f.type;
      return type === 'application/pdf' || type.startsWith('image/');
    });
    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleApplyCarimbo = async () => {
    if (uploadedFiles.length === 0) {
      error('Selecione pelo menos um arquivo');
      return;
    }

    setProcesando(true);
    // Simula processamento
    await new Promise((r) => setTimeout(r, 1500));

    const finalTexto = textoCarimbo === 'CUSTOM' ? customTexto : textoCarimbo;
    success(
      `Carimbo "${finalTexto}" aplicado a ${uploadedFiles.length} arquivo${uploadedFiles.length > 1 ? 's' : ''}`
    );

    // Reset
    setTimeout(() => {
      setUploadedFiles([]);
      setTextoCarimbo('CONFERIDO');
      setCustomTexto('');
      setProcesando(false);
      onClose();
    }, 1000);
  };

  const corClass: Record<CarimboCor, string> = {
    red: 'text-red-600 dark:text-red-400',
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
  };

  const corBgClass: Record<CarimboCor, string> = {
    red: 'bg-red-100 dark:bg-red-950/30 border-red-300 dark:border-red-700',
    blue: 'bg-blue-100 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700',
    green: 'bg-green-100 dark:bg-green-950/30 border-green-300 dark:border-green-700',
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="🔏 Carimbo Digital"
        description={
          mode === 'batch'
            ? `Aplicar carimbo em ${batchCount} documento(s)`
            : 'Aplicar carimbo em documento'
        }
        maxWidth="lg"
      >
        <div className="space-y-6">
          {/* Upload zone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Documentos
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileUpload}
                className="sr-only"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="block p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
              >
                <div className="flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Upload size={20} />
                  <span className="text-sm font-medium">Clique ou arraste PDFs/imagens</span>
                  <span className="text-xs text-slate-500">PDF, JPG, PNG</span>
                </div>
              </label>
            </div>

            {/* Uploaded files list */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                      {file.name}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(idx)}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Carimbo config */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Texto do carimbo
              </label>
              <select
                value={textoCarimbo}
                onChange={(e) => setTextoCarimbo(e.target.value as CarimboTexto)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-sm text-slate-900 dark:text-slate-100"
              >
                <option value="CONFERIDO">Conferido</option>
                <option value="APROVADO">Aprovado</option>
                <option value="PENDENTE">Pendente</option>
                <option value="CUSTOM">Personalizado</option>
              </select>
              {textoCarimbo === 'CUSTOM' && (
                <input
                  type="text"
                  value={customTexto}
                  onChange={(e) => setCustomTexto(e.target.value)}
                  placeholder="Digite o texto"
                  className="w-full mt-2 px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-sm text-slate-900 dark:text-slate-100"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Cor
              </label>
              <div className="flex gap-2">
                {(['red', 'blue', 'green'] as const).map((cor) => (
                  <button
                    key={cor}
                    onClick={() => setCorCarimbo(cor)}
                    className={cn(
                      'px-3 py-2 rounded border-2 transition-all',
                      corCarimbo === cor
                        ? `${corBgClass[cor]} border-current`
                        : 'border-transparent bg-slate-100 dark:bg-slate-800'
                    )}
                  >
                    <div className={cn('w-6 h-6 rounded-full', corClass[cor])} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Data do carimbo
            </label>
            <input
              type="date"
              value={dataCarimbo}
              onChange={(e) => setDataCarimbo(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Preview */}
          {uploadedFiles.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Preview
              </label>
              <div className={cn(
                'p-4 rounded border',
                corBgClass[corCarimbo]
              )}>
                <div className="text-center">
                  <div className={cn('text-3xl font-bold transform -rotate-45', corClass[corCarimbo])}>
                    {textoCarimbo === 'CUSTOM' ? customTexto : textoCarimbo}
                  </div>
                  <div className={cn('text-xs mt-2', corClass[corCarimbo])}>
                    {dataCarimbo}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleApplyCarimbo}
              disabled={procesando || uploadedFiles.length === 0}
              isLoading={procesando}
            >
              <Download size={16} />
              Aplicar e Baixar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
