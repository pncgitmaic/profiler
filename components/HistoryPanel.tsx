import React, { useState } from 'react';
import { HistoryItem } from '../types';
import { DownloadIcon, HistoryIcon } from './Icons';

interface HistoryPanelProps {
  history: HistoryItem[];
}

const HistoryCard: React.FC<{ item: HistoryItem }> = ({ item }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-shadow hover:shadow-xl">
            <div className="grid grid-cols-2 gap-px bg-gray-200">
                <img src={`data:image/png;base64,${item.originalImage}`} alt="Original" className="w-full h-auto object-cover" />
                <img src={item.generatedImage} alt="Generated" className="w-full h-auto object-cover" />
            </div>
            <div className="p-4">
                <p className="text-xs text-gray-500 mb-2 truncate" title={item.prompt}>
                    <strong>Prompt:</strong> {item.prompt}
                </p>
                <div className="flex justify-between items-center">
                     <p className="text-xs text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                    </p>
                    <a
                        href={item.generatedImage}
                        download={`professional-profile-${item.id}.png`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        title="Download Generated Image"
                    >
                        <DownloadIcon className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-12">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 hover:bg-gray-50 rounded-t-lg focus:outline-none"
                    aria-expanded={isOpen}
                    aria-controls="history-content"
                >
                    <div className="flex items-center">
                        <HistoryIcon className="w-6 h-6 mr-3 text-blue-500" />
                        <span className="text-xl">Generation History</span>
                    </div>
                    <svg
                        className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isOpen && (
                    <div id="history-content" className="p-4 border-t border-gray-200">
                        {history.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {history.map(item => <HistoryCard key={item.id} item={item} />)}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No history yet. Generate an image to see it here.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
