import React from 'react';
import { CameraIcon, UserIcon, LogoutIcon } from './Icons';

interface HeaderProps {
    user: string | null;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/80 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <CameraIcon className="w-9 h-9 text-blue-500 mr-4" />
                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-600">
                    Profiler
                </h1>
            </div>

            {user ? (
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                        <UserIcon className="w-5 h-5 mr-2" />
                        <span className="font-medium">{user}</span>
                    </div>
                    <button onClick={onLogout} className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200">
                        <LogoutIcon className="w-5 h-5 mr-1" />
                        Log Out
                    </button>
                </div>
            ) : (
                <p className="text-center text-gray-600 text-md">
                    Your Personal AI Headshot Studio
                </p>
            )}
        </div>
      </div>
    </header>
  );
};
