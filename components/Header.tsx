
import React, { useState } from 'react';
import Spinner from './Spinner';

interface HeaderProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md shadow-lg shadow-indigo-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            AI Wallpaper<span className="text-indigo-400">Gen</span>
          </h1>
          <form onSubmit={handleSubmit} className="flex-1 max-w-xl ml-6">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., a futuristic city at night"
                className="w-full pl-4 pr-32 py-3 bg-gray-800 text-white border border-gray-700 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="absolute inset-y-1 right-1 flex items-center justify-center px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="w-16"><Spinner/></div>
                ) : (
                  'Generate'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
