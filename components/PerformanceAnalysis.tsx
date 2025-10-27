import React from 'react';
import { PostCard } from './PostCard';
import { PerformanceAnalysisData } from '../types';

interface PerformanceAnalysisProps {
    data: PerformanceAnalysisData;
}

export const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({ data }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-indigo-400 mb-4">Simulated Performance (Last Week)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {data.pastMetrics.map(metric => (
                        <div key={metric.title} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                            <p className="text-sm font-semibold text-slate-300">{metric.title}</p>
                            <p className="text-xs text-slate-500 mb-3">{metric.type}</p>
                            <div className="flex justify-around text-slate-400 text-sm">
                                <span><i className="fa-solid fa-heart mr-1 text-red-400"></i>{metric.likes}</span>
                                <span><i className="fa-solid fa-comment mr-1 text-sky-400"></i>{metric.comments}</span>
                                <span><i className="fa-solid fa-paper-plane mr-1 text-green-400"></i>{metric.dms}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="bg-green-900/30 border border-green-700 text-green-200 p-4 rounded-lg">
                    <h3 className="font-bold mb-2"><i className="fa-solid fa-lightbulb mr-2"></i>What Worked</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {data.whatWorked.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg">
                    <h3 className="font-bold mb-2"><i className="fa-solid fa-triangle-exclamation mr-2"></i>What Didn't</h3>
                     <ul className="list-disc list-inside space-y-1">
                        {data.whatDidnt.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-indigo-400 mb-4 text-center">This Week's Data-Driven Plan</h2>
                <div className="space-y-6">
                    {data.newPlanPosts.map(post => (
                        <PostCard key={post.id} post={post} onFeedback={() => {}} />
                    ))}
                </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg text-center">
                <p className="font-bold"><i className="fa-solid fa-bullseye mr-2"></i>AI Insight Summary</p>
                <p className="text-sm">{data.aiInsightSummary}</p>
            </div>
        </div>
    );
};