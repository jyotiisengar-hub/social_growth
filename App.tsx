import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { Board } from './components/Board';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SidebarNav } from './components/SidebarNav';
import { generateFullStrategy, extractDetailsFromPrompt } from './services/geminiService';
import { FullStrategy, UserInput } from './types';

const Tile: React.FC<{ title: string; description: string; }> = ({ title, description }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
);

const SmartSetupTiles = () => (
  <section>
      <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-3">
          <span className="text-2xl">💠</span>
          Smart Setup
      </h3>
      <div className="grid grid-cols-1 gap-4">
          <Tile title="🏪 Business Snapshot" description="Auto-detect your business info from your website or Instagram bio." />
          <Tile title="🎯 Growth Goal" description="Select what matters most: Leads · Engagement · Brand Visibility." />
          <Tile title="🎨 Tone & Style" description="Define your brand personality — warm, bold, or expert." />
      </div>
  </section>
);


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'progress'>('home');
  const [fullStrategy, setFullStrategy] = useState<FullStrategy | null>(null);
  const [currentUserInput, setCurrentUserInput] = useState<UserInput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = useCallback(async (userInput: UserInput | string) => {
    setIsLoading(true);
    setError(null);
    setFullStrategy(null);
    // Stay on home view while loading
    setActiveView('home');

    try {
      let structuredInput: UserInput;
      if (typeof userInput === 'string') {
        structuredInput = await extractDetailsFromPrompt(userInput);
      } else {
        structuredInput = userInput;
      }
      setCurrentUserInput(structuredInput);

      const strategy = await generateFullStrategy(structuredInput);
      if (strategy && strategy.socialPlan && strategy.socialPlan.posts.length > 0) {
        setFullStrategy(strategy);
        setActiveView('progress');
      } else {
        setError('The generated strategy was empty. Please try refining your request.');
        setActiveView('home');
      }
    } catch (err) {
      setError('Failed to generate social media strategy. Please check your prompt or form details and try again.');
      console.error(err);
      setActiveView('home');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartOver = () => {
    setActiveView('home');
    setFullStrategy(null);
    setCurrentUserInput(null);
    setError(null);
  };
  
  const handleEditPlan = () => {
    setActiveView('home');
  };

  const renderHome = () => (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
            <InputForm onGenerate={handleGeneratePlan} isLoading={isLoading} initialData={currentUserInput} />
            <div className="mt-12">
               {isLoading && <LoadingSpinner />}
               {error && (
                  <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-center mb-6 animate-fade-in">
                    <p className="font-bold">An Error Occurred</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}
            </div>
        </div>
        <div className="lg:col-span-1 hidden lg:block pt-2">
            <SmartSetupTiles />
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    if (isLoading && activeView === 'home') {
      return renderHome();
    }
    switch (activeView) {
      case 'home':
        return renderHome();
      case 'progress':
        if (fullStrategy && currentUserInput) {
          return <Board 
            fullStrategy={fullStrategy} 
            userInput={currentUserInput} 
            onStartOver={handleStartOver}
            onEditPlan={handleEditPlan} 
          />
        }
        // Fallback to home if progress isn't ready
        setActiveView('home');
        return renderHome();
      default:
        return renderHome();
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex">
      <SidebarNav 
        activeView={activeView}
        setActiveView={setActiveView}
        isProgressAvailable={!!fullStrategy}
      />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;