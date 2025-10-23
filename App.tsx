import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Button } from './components/Button';
import { Spinner } from './components/Spinner';
import { generateProfessionalImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { DnaIcon } from './components/Icons';
import { BackgroundPattern } from './components/BackgroundPattern';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFileType, setOriginalFileType] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(
    'Convert this image into a photorealistic, professional headshot suitable for a corporate website or LinkedIn. The subject should be wearing professional business attire. The background should be a clean, neutral, soft-focus office setting. Maintain the person\'s likeness, features, and expression. The lighting should be flattering and professional.'
  );

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setError(null);
      setGeneratedImage(null);
      const base64Image = await fileToBase64(file);
      setOriginalImage(base64Image);
      setOriginalFileType(file.type);
    } catch (err) {
      setError('Failed to load image. Please try another file.');
      console.error(err);
    }
  }, []);

  const handleGenerate = async () => {
    if (!originalImage || !originalFileType) {
      setError('Please upload an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const generated = await generateProfessionalImage(originalImage, originalFileType, prompt);
      setGeneratedImage(generated);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800 font-sans antialiased overflow-hidden">
      <BackgroundPattern />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {!originalImage && <ImageUploader onImageUpload={handleImageUpload} />}
            
            {originalImage && (
              <div className="space-y-8">
                <ResultDisplay originalImage={originalImage} generatedImage={generatedImage} onReset={handleReset} />
                
                {!generatedImage && !isLoading && (
                   <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
                      <label htmlFor="prompt" className="block text-sm font-medium text-gray-600 mb-2">
                          Customize Your Prompt (Optional)
                      </label>
                      <textarea
                          id="prompt"
                          rows={4}
                          className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                      />
                   </div>
                )}
                
                <div className="flex justify-center items-center pt-4">
                  {isLoading ? (
                    <div className="flex flex-col items-center text-blue-500">
                      <Spinner />
                      <p className="mt-4 text-lg animate-pulse">Crafting your professional image...</p>
                    </div>
                  ) : (
                    !generatedImage && (
                      <Button onClick={handleGenerate} disabled={!originalImage || isLoading}>
                        <DnaIcon className="w-5 h-5 mr-2" />
                        Generate Professional Image
                      </Button>
                    )
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
                <p>{error}</p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;