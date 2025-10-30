import React from 'react';
import { FullStrategy, UserInput, SocialPost } from '../types';
import { MultiPlatformStrategy } from './MultiPlatformStrategy';

interface BoardProps {
    fullStrategy: FullStrategy;
    userInput: UserInput;
    onStartOver: () => void;
    onEditPlan: () => void;
}

const PlatformIcon: React.FC<{ platform: string, sizeClass?: string }> = ({ platform, sizeClass = 'text-lg' }) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('instagram')) return <i className={`fa-brands fa-instagram ${sizeClass}`} style={{color: '#E4405F'}}></i>;
    if (lowerPlatform.includes('facebook')) return <i className={`fa-brands fa-facebook ${sizeClass}`} style={{color: '#1877F2'}}></i>;
    if (lowerPlatform.includes('x') || lowerPlatform.includes('twitter')) return <i className={`fa-brands fa-twitter ${sizeClass}`} style={{color: '#1DA1F2'}}></i>;
    if (lowerPlatform.includes('linkedin')) return <i className={`fa-brands fa-linkedin ${sizeClass}`} style={{color: '#0A66C2'}}></i>;
    return <i className={`fa-solid fa-share-nodes ${sizeClass}`}></i>;
};


const BoardCard: React.FC<{ title: string; children: React.ReactNode; className?: string; icon?: string }> = ({ title, children, className, icon }) => (
    <div className={`bg-white border border-slate-200 rounded-xl p-6 shadow-sm ${className}`}>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
            {icon && <i className={icon}></i>}
            {title}
        </h3>
        {children}
    </div>
);

export const Board: React.FC<BoardProps> = ({ fullStrategy, userInput, onStartOver, onEditPlan }) => {
    const { socialPlan, performanceAnalysis, nextBestAction, multiPlatformStrategy } = fullStrategy;

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center md:text-left">
                    Welcome, let's check in on your Social Growth progress!
                </h2>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button 
                        onClick={onEditPlan}
                        className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-md transition-all duration-300 text-sm flex items-center gap-2"
                    >
                         <i className="fa-solid fa-pencil"></i>
                        Edit Plan
                    </button>
                    <button 
                        onClick={onStartOver}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 text-sm flex items-center gap-2"
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Start New Plan
                    </button>
                </div>
            </header>

            {/* Top Section: 3 Columns */}
            <div className="grid md:grid-cols-3 gap-6">
                <BoardCard title="This Week's Mission" icon="fa-solid fa-bullseye text-indigo-500">
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 italic border-l-4 border-indigo-200 pl-3">"{socialPlan.week_plan}"</p>
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-700">Planned Posts:</h4>
                            {socialPlan.posts.slice(0, 4).map((post: SocialPost) => (
                                <div key={post.id} className="flex items-center gap-3 text-sm bg-slate-50 p-2 rounded-md">
                                    <PlatformIcon platform={post.platform} />
                                    <span className="flex-grow text-slate-800 truncate">{post.title}</span>
                                    <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">{post.suggested_time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </BoardCard>
                <BoardCard title="Last Week's Performance" icon="fa-solid fa-chart-line text-green-500">
                    <div className="space-y-4 text-sm">
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg">
                           <p><strong className="font-semibold">AI Insight:</strong> {performanceAnalysis.aiInsightSummary}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-700 mb-1">What Worked:</h4>
                            <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {performanceAnalysis.whatWorked.slice(0, 2).map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-700 mb-1">What Didn't:</h4>
                            <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {performanceAnalysis.whatDidnt.slice(0, 2).map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </BoardCard>
                 <BoardCard title="Take Action" icon="fa-solid fa-rocket text-purple-500">
                     <div className="space-y-4 text-sm">
                        <p className="text-slate-600">The AI suggests this as your most impactful next step:</p>
                        <div className="bg-purple-50 border border-purple-200 text-purple-800 p-4 rounded-lg">
                            <p className="font-bold text-md mb-2">{nextBestAction.executedAction.title}</p>
                            <p className="text-xs italic">"{nextBestAction.justification.why}"</p>
                        </div>
                        <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-3 rounded-md transition-colors text-sm">
                            Review & Execute Action
                        </button>
                    </div>
                 </BoardCard>
            </div>

            {/* Bottom Section: 2 Rows */}
            <div className="space-y-8">
                 <BoardCard title="Business Goal Summary" icon="fa-solid fa-briefcase text-cyan-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 text-sm">
                        <div>
                            <p className="text-xs text-slate-500 font-semibold">Business Name</p>
                            <p className="text-slate-800">{userInput.businessName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-semibold">Category</p>
                            <p className="text-slate-800">{userInput.category}</p>
                        </div>
                         <div>
                            <p className="text-xs text-slate-500 font-semibold">Primary Goal</p>
                            <p className="text-slate-800">{userInput.goal}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-semibold">Primary Platform</p>
                            <p className="text-slate-800">{userInput.platform}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs text-slate-500 font-semibold">Target Audience</p>
                            <p className="text-slate-800">{userInput.audience}</p>
                        </div>
                         <div className="col-span-2">
                            <p className="text-xs text-slate-500 font-semibold">Tone of Voice</p>
                            <p className="text-slate-800">{userInput.tone}</p>
                        </div>
                    </div>
                 </BoardCard>

                 <div>
                    <MultiPlatformStrategy data={multiPlatformStrategy} />
                 </div>
            </div>
        </div>
    );
};