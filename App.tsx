import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PostCard } from './components/PostCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AgenticLearningLoop } from './components/AgenticLearningLoop';
import { PerformanceAnalysis } from './components/PerformanceAnalysis';
import { MultiPlatformStrategy } from './components/MultiPlatformStrategy';
import { NextBestAction } from './components/NextBestAction';
import { generatePlan, regenerateAlternatives } from './services/geminiService';
import { SocialPlan, UserInput } from './types';

const App: React.FC = () => {
  const [socialPlan, setSocialPlan] = useState<SocialPlan | null>(null);
  const [currentUserInput, setCurrentUserInput] = useState<UserInput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dmCopied, setDmCopied] = useState<boolean>(false);
  const [replyCopied, setReplyCopied] = useState<boolean>(false);
  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'mission' | 'performance' | 'strategy' | 'nextAction'>('mission');

  const handleGeneratePlan = useCallback(async (userInput: UserInput) => {
    setIsLoading(true);
    setError(null);
    setSocialPlan(null);
    setCurrentUserInput(userInput);
    setPlatformFilter('All');
    setActiveTab('mission');

    try {
      const plan = await generatePlan(userInput);
      if (plan && plan.posts && plan.posts.length > 0) {
        setSocialPlan(plan);
      } else {
        setError('The generated plan was empty. Please try refining your request.');
      }
    } catch (err) {
      setError('Failed to generate social media plan. Please check your connection and API key.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFeedback = useCallback((postId: string, feedback: 'useful' | 'not useful') => {
    setSocialPlan(currentPlan => {
        if (!currentPlan) return null;
        return {
            ...currentPlan,
            posts: currentPlan.posts.map(post => {
                if (post.id === postId) {
                    // If clicking the same feedback again, toggle it off.
                    return { ...post, feedback: post.feedback === feedback ? undefined : feedback };
                }
                return post;
            })
        };
    });
  }, []);

  const handleRegenerate = useCallback(async () => {
    if (!currentUserInput || !socialPlan) return;

    setIsRegenerating(true);
    setError(null);
    try {
        const plan = await regenerateAlternatives(currentUserInput, socialPlan.posts);
        if (plan && plan.posts && plan.posts.length > 0) {
            setSocialPlan(plan);
            setPlatformFilter('All');
            setActiveTab('mission');
        } else {
            setError('The regenerated plan was empty. Please try again.');
        }
    } catch (err) {
        setError('Failed to regenerate the plan. Please try again.');
        console.error(err);
    } finally {
        setIsRegenerating(false);
    }
  }, [currentUserInput, socialPlan]);


  const handleCopyDM = useCallback(() => {
    if (socialPlan?.dm_template) {
      navigator.clipboard.writeText(socialPlan.dm_template);
      setDmCopied(true);
      setTimeout(() => setDmCopied(false), 2000);
    }
  }, [socialPlan]);

  const handleCopyReply = useCallback(() => {
    if (socialPlan?.comment_reply_template) {
      navigator.clipboard.writeText(socialPlan.comment_reply_template);
      setReplyCopied(true);
      setTimeout(() => setReplyCopied(false), 2000);
    }
  }, [socialPlan]);

  const hasFeedback = useMemo(() => {
    return socialPlan?.posts.some(p => p.feedback) ?? false;
  }, [socialPlan]);
  
  const platforms = useMemo(() => {
    if (!socialPlan?.posts) return [];
    const uniquePlatforms = [...new Set(socialPlan.posts.map(p => p.platform))];
    return ['All', ...uniquePlatforms];
  }, [socialPlan]);

  const filteredPosts = useMemo(() => {
    if (!socialPlan?.posts) return [];
    if (platformFilter === 'All') {
        return socialPlan.posts;
    }
    return socialPlan.posts.filter(post => post.platform === platformFilter);
  }, [socialPlan, platformFilter]);

  const renderPlanContent = () => {
    if (!socialPlan) return null;
    return (
      <div className="space-y-8">
        <div className="text-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h2 className="text-xl font-bold text-indigo-400">This Week's Mission</h2>
            <p className="text-slate-300 text-lg mt-1">{socialPlan.week_plan}</p>
        </div>

        {platforms.length > 2 && (
            <div className="flex justify-center flex-wrap items-center gap-3">
                {platforms.map(platform => (
                    <button
                        key={platform}
                        onClick={() => setPlatformFilter(platform)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                            platformFilter === platform
                                ? 'bg-indigo-600 text-white shadow-lg border border-transparent'
                                : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100'
                        }`}
                        aria-pressed={platformFilter === platform}
                    >
                        {platform}
                    </button>
                ))}
            </div>
        )}

        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onFeedback={handleFeedback} />
          ))}
        </div>

        {hasFeedback && (
            <div className="text-center pt-4">
                <button 
                    onClick={handleRegenerate}
                    disabled={isRegenerating}
                    className="w-full md:w-auto flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 disabled:bg-purple-800 disabled:cursor-not-allowed"
                >
                    {isRegenerating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Regenerating...
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-arrows-rotate"></i>
                            Regenerate Alternatives Based on Feedback
                        </>
                    )}
                </button>
            </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 relative">
                <h3 className="text-lg font-bold text-teal-400 mb-3">Outreach DM Template</h3>
                <p className="text-slate-300 whitespace-pre-wrap text-sm">{socialPlan.dm_template}</p>
                <button
                    onClick={handleCopyDM}
                    className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-md transition-colors ${
                    dmCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                >
                    {dmCopied ? <><i className="fa-solid fa-check mr-2"></i>Copied</> : <><i className="fa-regular fa-copy mr-2"></i>Copy</>}
                </button>
            </div>
             <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 relative">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Comment Reply Template</h3>
                <p className="text-slate-300 whitespace-pre-wrap text-sm">{socialPlan.comment_reply_template}</p>
                <button
                    onClick={handleCopyReply}
                    className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-md transition-colors ${
                    replyCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    }`}
                >
                    {replyCopied ? <><i className="fa-solid fa-check mr-2"></i>Copied</> : <><i className="fa-regular fa-copy mr-2"></i>Copy</>}
                </button>
            </div>
             <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h3 className="text-lg font-bold text-yellow-400 mb-3">This Week's Experiment</h3>
                <p className="text-slate-300 whitespace-pre-wrap text-sm">{socialPlan.weekly_experiment}</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h3 className="text-lg font-bold text-purple-400 mb-3">AI Observations</h3>
                <p className="text-slate-300 whitespace-pre-wrap text-sm">{socialPlan.observations}</p>
            </div>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch(activeTab) {
        case 'mission':
            return renderPlanContent();
        case 'performance':
            return <PerformanceAnalysis />;
        case 'strategy':
            return <MultiPlatformStrategy />;
        case 'nextAction':
            return <NextBestAction />;
        default:
            return renderPlanContent();
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <div className="max-w-3xl mx-auto mt-8">
          <InputForm onGenerate={handleGeneratePlan} isLoading={isLoading || isRegenerating} />
          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {isRegenerating && socialPlan && <AgenticLearningLoop socialPlan={socialPlan} />}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center mb-6">
                <p className="font-bold">An Error Occurred</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            {socialPlan && !isLoading && !isRegenerating && (
                <div>
                    <div className="mb-8 flex justify-center border-b border-slate-700">
                        <button 
                            onClick={() => setActiveTab('mission')}
                            className={`px-6 py-3 text-sm font-bold transition-colors duration-200 border-b-2 ${activeTab === 'mission' ? 'text-indigo-400 border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                            aria-current={activeTab === 'mission' ? 'page' : undefined}
                        >
                            This Week's Mission
                        </button>
                        <button 
                            onClick={() => setActiveTab('performance')}
                            className={`px-6 py-3 text-sm font-bold transition-colors duration-200 border-b-2 ${activeTab === 'performance' ? 'text-indigo-400 border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                             aria-current={activeTab === 'performance' ? 'page' : undefined}
                        >
                            Last Week's Performance
                        </button>
                         <button 
                            onClick={() => setActiveTab('strategy')}
                            className={`px-6 py-3 text-sm font-bold transition-colors duration-200 border-b-2 ${activeTab === 'strategy' ? 'text-indigo-400 border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                             aria-current={activeTab === 'strategy' ? 'page' : undefined}
                        >
                            Multi-Platform Strategy
                        </button>
                         <button 
                            onClick={() => setActiveTab('nextAction')}
                            className={`px-6 py-3 text-sm font-bold transition-colors duration-200 border-b-2 ${activeTab === 'nextAction' ? 'text-indigo-400 border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                             aria-current={activeTab === 'nextAction' ? 'page' : undefined}
                        >
                            Next Best Action
                        </button>
                    </div>

                    {renderActiveTab()}
                </div>
            )}
            {!isLoading && !isRegenerating && !error && !socialPlan && (
               <div className="text-center text-slate-500 py-16">
                 <i className="fa-solid fa-wand-magic-sparkles text-4xl mb-4"></i>
                 <p>Your social media plan will appear here.</p>
                 <p className="text-sm">Fill out the form above to get started!</p>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;