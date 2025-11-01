
import React, { useEffect } from 'react';
import { Wallpaper } from '../types';
import CloseIcon from './icons/CloseIcon';
import DownloadIcon from './icons/DownloadIcon';

interface ModalProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ wallpaper, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!wallpaper) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-screen-lg max-h-full w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={wallpaper.url}
          alt={wallpaper.prompt}
          className="object-contain w-full h-full max-h-[90vh] rounded-lg shadow-2xl"
        />
        <div className="absolute -bottom-14 left-0 right-0 flex justify-center items-center gap-4 p-4">
             <a
            href={wallpaper.url}
            download={`ai-wallpaper-${wallpaper.id}.jpg`}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
          >
            <DownloadIcon className="w-5 h-5" />
            Download
          </a>
        </div>
         <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
