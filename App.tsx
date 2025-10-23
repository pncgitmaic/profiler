import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Button } from './components/Button';
import { Spinner } from './components/Spinner';
import { generateProfessionalImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { DnaIcon, SparklesIcon, BriefcaseIcon, CheckCircleIcon } from './components/Icons';
import { BackgroundPattern } from './components/BackgroundPattern';
import { Footer } from './components/Footer';
import { LoginPanel } from './components/LoginPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { getHistory, addToHistory } from './services/historyService';
import { saveEmailToSheet } from './services/googleSheetService';
import { HistoryItem } from './types';

const Hero: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
        Turn Your Photo into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Professional Headshot</span>
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        Upload a casual photo, and our AI will generate a polished, studio-quality portrait perfect for LinkedIn, corporate profiles, and resumes. Look your best, effortlessly.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <div className="flex flex-col items-center p-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-inner">
            <SparklesIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">AI-Powered Transformation</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Advanced algorithms create a natural, photorealistic look.</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-inner">
            <BriefcaseIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Professional Attire</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Automatically adds appropriate business clothing.</p>
        </div>
        <div className="flex flex-col items-center p-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 shadow-inner">
            <CheckCircleIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Studio Quality</h3>
          <p className="mt-2 text-sm text-gray-500 text-center">Perfect lighting and clean, soft-focus backgrounds.</p>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFileType, setOriginalFileType] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);