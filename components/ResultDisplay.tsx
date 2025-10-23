import React from 'react';
import { DownloadIcon, TrashIcon } from './Icons';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  onReset: () => void;
}

const ImageCard: React.FC<{ title: string; imageUrl: string; children?: React.ReactNode }> = ({ title, imageUrl, children }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col border border-gray-200">
        <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-center text-gray-700">{title}</h3>
        </div>
        <div className="p-4 flex-grow flex items-center justify-center">
            <img src={imageUrl} alt={title} className="max-h-96 w-auto object-contain rounded-md" />
        </div>
        {children && <div className="p-4 bg-white">{children}</div>}
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, onReset }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {originalImage && (
        <ImageCard title="Original" imageUrl={`data:image/png;base64,${originalImage}`}>
           <div className="flex justify-center">
              <button onClick={onReset} className="flex items-center text-sm text-red-500 hover:text-red-600 transition-colors duration-200">
                <TrashIcon className="w-4 h-4 mr-2" />
                Start Over
              </button>
            </div>
        </ImageCard>
      )}

      {generatedImage ? (
        <ImageCard title="Professional" imageUrl={generatedImage}>
          <div className="flex justify-center">
            <a
              href={generatedImage}
              download="professional-profile.png"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100 transition-transform transform hover:scale-105"
            >
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download Image
            </a>
          </div>
        </ImageCard>
      ) : (
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-inner flex flex-col items-center justify-center h-full min-h-[400px] border-2 border-dashed border-gray-300">
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-500">AI Generated Image</h3>
                <p className="text-gray-400 mt-2">Your professional headshot will appear here.</p>
            </div>
        </div>
      )}
    </div>
  );
};