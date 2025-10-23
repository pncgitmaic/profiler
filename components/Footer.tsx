import React from 'react';
import { InstagramIcon, FacebookIcon, WhatsappIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 border-t border-gray-200/80 mt-12 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-8 md:space-y-0">
          <div className="md:w-1/2">
            <h3 className="text-lg font-bold text-gray-800">About Profiler</h3>
            <p className="mt-2 max-w-md text-gray-600 mx-auto md:mx-0">
              Profiler is an AI-powered application that transforms your everyday photos into professional-grade profile pictures, built with the power of the Gemini API.
            </p>
          </div>
          <div className="flex flex-col items-center">
             <p className="text-base font-semibold text-gray-700 mb-4">Connect with pncgrafics</p>
             <div className="flex items-center space-x-6">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-500 hover:text-pink-500 transition-colors duration-300">
                    <InstagramIcon className="w-7 h-7" />
                    <span className="sr-only">Instagram</span>
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                    <FacebookIcon className="w-7 h-7" />
                    <span className="sr-only">Facebook</span>
                </a>
                <a href="https://wa.me" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-gray-500 hover:text-green-500 transition-colors duration-300">
                    <WhatsappIcon className="w-7 h-7" />
                    <span className="sr-only">WhatsApp</span>
                </a>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Profiler by pncgrafics. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
