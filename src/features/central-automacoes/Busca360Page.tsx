import { useState } from 'react';
import { Busca360Modal } from '@/shared/ui/Busca360Modal';
import { usePageNav } from '@/features/navigation/PageNavContext';

export const Busca360Page = () => {
  const { navigateTo } = usePageNav();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    navigateTo('command-center');
  };

  return (
    <Busca360Modal
      isOpen={isOpen}
      onClose={handleClose}
    />
  );
};
