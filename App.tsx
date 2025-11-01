
import React, { useState, useEffect } from 'react';
import { Wallpaper } from './types';
import { generateWallpaper } from './services/geminiService';
import Header from './components/Header';
import WallpaperGrid from './components/WallpaperGrid';
import Modal from './components/Modal';

const initialWallpapers: Wallpaper[] = [
    { id: '1', url: 'https://picsum.photos/seed/p1/1920/1080', prompt: 'A serene mountain lake at dawn' },
    { id: '2', url: 'https://picsum.photos/seed/p2/1920/1080', prompt: 'A bustling futuristic cityscape at night' },
    { id: '3', url: 'https://picsum.photos/seed/p3/1920/1080', prompt: 'A dense, mystical forest with glowing mushrooms' },
    { id: '4', url: 'https://picsum.photos/seed/p4/1920/1080', prompt: 'Abstract geometric shapes in vibrant colors' },
    { id: '5', url: 'https://picsum.photos/seed/p5/1920/1080', prompt: 'A tranquil beach with turquoise water' },
    { id: '6', url: 'https://picsum.photos/seed/p6/1920/1080', prompt: 'A minimalist desert landscape under a starry sky' },
];


const App: React.FC = () => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  useEffect(() => {
    // Load initial wallpapers after a short delay to simulate loading
    const timer = setTimeout(() => {
        setWallpapers(initialWallpapers);
        setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerateWallpaper = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateWallpaper(prompt);
      const newWallpaper: Wallpaper = {
        id: new Date().toISOString(),
        url: imageUrl,
        prompt: prompt,
      };
      setWallpapers(prev => [newWallpaper, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectWallpaper = (wallpaper: Wallpaper) => {
    setSelectedWallpaper(wallpaper);
  };

  const handleCloseModal = () => {
    setSelectedWallpaper(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header onGenerate={handleGenerateWallpaper} isLoading={isLoading} />
      <main className="container mx-auto">
        {error && (
          <div className="p-4 m-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg text-center">
            <strong>Error:</strong> {error}
          </div>
        )}
        <WallpaperGrid
          wallpapers={wallpapers}
          isLoading={isLoading && wallpapers.length > 0}
          onSelectWallpaper={handleSelectWallpaper}
        />
      </main>
      <Modal wallpaper={selectedWallpaper} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
