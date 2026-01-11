import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-md p-4">
        <button className="absolute top-2 right-2" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
