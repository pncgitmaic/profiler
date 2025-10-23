import React from 'react';
import { CameraIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <CameraIcon className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-600">
            Profiler
          </h1>
        </div>
        <p className="text-center text-gray-500 mt-1">
          Craft Your Professional Image with AI
        </p>
      </div>
    </header>
  );
};