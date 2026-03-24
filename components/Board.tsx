import React from 'react';
import { FullStrategy, UserInput, SocialPost } from '../types';
import { MissionPost } from './MissionPost';

// FIX: Added missing BoardProps interface definition.
interface BoardProps {
    fullStrategy: FullStrategy;
    userInput: UserInput;
    onStartOver: () => void;
    onEditPlan: () => void;
}

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
    const { socialPlan, strategyRationale } = fullStrategy;

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

            {/* Top Section: 2 Columns */}
            <div className="grid md:grid-cols-2 gap-6">
                <BoardCard title="This Week's Mission" icon="fa-solid fa-bullseye text-indigo-500">
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 italic border-l-4 border-indigo-200 pl-3">"{socialPlan.week_plan}"</p>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-700 mb-3">Planned Posts:</h4>
                            <div className="space-y-3">
                                {socialPlan.posts.slice(0, 4).map((post: SocialPost) => (
                                    <MissionPost key={post.id} post={post} />
                                )) || []}
                            </div>
                        </div>
                    </div>
                </BoardCard>
                <BoardCard title="Strategy Rationale" icon="fa-solid fa-brain text-indigo-500">
                    <div className="space-y-4 text-sm">
                        <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 p-3 rounded-lg">
                           <p><strong className="font-semibold">AI Summary:</strong> {strategyRationale.strategySummary}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-700 mb-1">Why This Works:</h4>
                            <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {strategyRationale.whyItWorks.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-700 mb-1">Potential Challenges:</h4>
                            <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {strategyRationale.potentialChallenges.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
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

                 {fullStrategy.otherChannelRecommendations && fullStrategy.otherChannelRecommendations.length > 0 && (
                    <BoardCard title="Expansion Opportunities" icon="fa-solid fa-map-location-dot text-orange-500">
                        <div className="grid md:grid-cols-3 gap-4">
                            {fullStrategy.otherChannelRecommendations.map((rec, i) => (
                                <div key={i} className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                                    <h4 className="font-bold text-orange-800 flex items-center gap-2 mb-2">
                                        <i className="fa-solid fa-plus-circle text-xs"></i>
                                        {rec.platform}
                                    </h4>
                                    <p className="text-xs text-slate-700 mb-2 leading-relaxed">{rec.reason}</p>
                                    <div className="flex items-center gap-2 mt-auto pt-2 border-t border-orange-200/50">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">Impact:</span>
                                        <span className="text-[10px] text-orange-700 font-medium">{rec.potential_impact}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </BoardCard>
                 )}
            </div>
        </div>
    );
};
