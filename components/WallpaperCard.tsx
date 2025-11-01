
import React from 'react';
import { Wallpaper } from '../types';
import DownloadIcon from './icons/DownloadIcon';

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onSelect: (wallpaper: Wallpaper) => void;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onSelect }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening on download click
  };
  
  return (
    <div
      className="wallpaper-card group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
      onClick={() => onSelect(wallpaper)}
    >
      <img
        src={wallpaper.url}
        alt={wallpaper.prompt}
        className="w-full h-auto block"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-sm text-gray-200 mb-2 line-clamp-3">{wallpaper.prompt}</p>
        <a
          href={wallpaper.url}
          download={`ai-wallpaper-${wallpaper.id}.jpg`}
          onClick={handleDownload}
          className="self-end mt-auto bg-indigo-600/80 text-white p-2 rounded-full hover:bg-indigo-500 transition-colors"
          aria-label="Download wallpaper"
        >
          <DownloadIcon className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default WallpaperCard;
