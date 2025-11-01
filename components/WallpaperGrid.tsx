
import React from 'react';
import { Wallpaper } from '../types';
import WallpaperCard from './WallpaperCard';
import Spinner from './Spinner';

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  isLoading: boolean;
  onSelectWallpaper: (wallpaper: Wallpaper) => void;
}

const LoadingPlaceholder: React.FC = () => (
  <div className="wallpaper-card aspect-[16/9] w-full bg-gray-800 rounded-lg flex items-center justify-center">
    <Spinner />
  </div>
);

const WallpaperGrid: React.FC<WallpaperGridProps> = ({ wallpapers, isLoading, onSelectWallpaper }) => {
  if (wallpapers.length === 0 && !isLoading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-400">Welcome to AI WallpaperGen!</h2>
        <p className="text-gray-500 mt-2">Use the search bar above to generate your first wallpaper.</p>
      </div>
    );
  }

  return (
    <div className="wallpaper-grid p-4 sm:p-6 lg:p-8">
      {isLoading && <LoadingPlaceholder />}
      {wallpapers.map((wallpaper) => (
        <WallpaperCard
          key={wallpaper.id}
          wallpaper={wallpaper}
          onSelect={onSelectWallpaper}
        />
      ))}
    </div>
  );
};

export default WallpaperGrid;
