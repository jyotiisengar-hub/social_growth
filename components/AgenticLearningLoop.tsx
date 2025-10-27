
import React from 'react';
import { SocialPlan } from '../types';

interface AgenticLearningLoopProps {
  socialPlan: SocialPlan;
}

const SummaryCard: React.FC<{ title: string; children: React.ReactNode; icon: string; borderColor: string; }> = ({ title, children, icon, borderColor }) => (
    <div className={`flex-1 bg-slate-800 border ${borderColor} rounded-xl p-6`}>
        <div className="flex items-center gap-3 mb-4">
            <i className={`${icon} text-2xl`}></i>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
        </div>
        {children}
    </div>
);


export const AgenticLearningLoop: React.FC<AgenticLearningLoopProps> = ({ socialPlan }) => {
    const usefulPosts = socialPlan.posts.filter(p => p.feedback === 'useful');
    const notUsefulPosts = socialPlan.posts.filter(p => p.feedback === 'not useful');

    return (
        <div className="text-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl animate-fade-in">
            <h2 className="text-2xl font-bold text-indigo-400 mb-2">
                Analyzing last week’s engagement to refine next week’s growth plan…
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-8 relative group">
                The copilot learns from what performs best — automatically adjusting post formats, timing, and CTAs to maximize conversions.
            </p>

            <div className="flex flex-col md:flex-row gap-6 mb-8 text-left">
                {/* Last Week's Performance */}
                <SummaryCard title="Last Week’s Performance Summary" icon="fa-solid fa-chart-line" borderColor="border-slate-700">
                    <p className="text-sm text-slate-400 mb-4">You provided feedback on the last plan, here's what the AI is learning from:</p>
                    <div className="space-y-3">
                        {usefulPosts.length > 0 && (
                             <div>
                                <p className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2"><i className="fa-solid fa-thumbs-up"></i>What Worked Well:</p>
                                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                                    {usefulPosts.map(post => <li key={post.id}>{post.platform}: "{post.title}"</li>)}
                                </ul>
                            </div>
                        )}
                        {notUsefulPosts.length > 0 && (
                            <div>
                                <p className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2"><i className="fa-solid fa-thumbs-down"></i>What to Improve:</p>
                                <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                                    {notUsefulPosts.map(post => <li key={post.id}>{post.platform}: "{post.title}"</li>)}
                                </ul>
                            </div>
                        )}
                         {usefulPosts.length === 0 && notUsefulPosts.length === 0 && (
                             <p className="text-sm text-slate-500">No feedback provided to learn from.</p>
                         )}
                    </div>
                </SummaryCard>

                {/* Next Week's Smart Plan */}
                <SummaryCard title="Next Week’s Smart Plan" icon="fa-solid fa-wand-magic-sparkles" borderColor="border-purple-600">
                    <div className="flex flex-col h-full">
                        <p className="text-sm text-slate-400 mb-4">The AI is now crafting a new plan based on these insights...</p>
                        <div className="flex-grow flex items-center justify-center">
                            <div className="text-center">
                                 <svg className="animate-spin h-8 w-8 text-purple-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="text-sm font-semibold text-purple-300">Building on your successes...</p>
                                <p className="text-xs text-slate-500">Please wait a moment.</p>
                            </div>
                        </div>
                    </div>
                </SummaryCard>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg text-center">
                <p className="font-bold"><i className="fa-solid fa-lightbulb mr-2"></i> AI Insight</p>
                <p className="text-sm">Reels with transformation stories performed 2.3x better — doubling down on that this week!</p>
            </div>
        </div>
    );
};
