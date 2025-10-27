import React from 'react';
import { NextBestActionData } from '../types';

interface NextBestActionProps {
    data: NextBestActionData;
}

export const NextBestAction: React.FC<NextBestActionProps> = ({ data }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center p-6 bg-white border border-slate-200 rounded-xl">
                <h2 className="text-2xl font-bold text-indigo-600">Next Best Action</h2>
                <p className="text-lg text-slate-700 mt-2">Taking the next step — so you don’t have to.</p>
                <p className="text-slate-500 text-sm mt-1 max-w-2xl mx-auto">
                    The copilot autonomously schedules your best-performing posts and follows up with leads when engagement crosses a threshold.
                </p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Recent Autonomous Activity</h3>
                <div className="space-y-3 text-slate-800 max-w-lg mx-auto">
                    <div className="flex items-center gap-4 bg-slate-100 p-3 rounded-md">
                        <span className="text-green-500 text-lg">✅</span>
                        <p className="text-sm">Scheduled Friday 7 AM post automatically.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-100 p-3 rounded-md">
                        <span className="text-cyan-500 text-lg">🤖</span>
                        <p className="text-sm">Auto-replied to 3 new DMs with booking link.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3"><i className="fa-solid fa-map-signs mr-3 text-cyan-500"></i>Scenario</h3>
                <p className="text-sm text-slate-700">{data.scenario}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900"><i className="fa-solid fa-list-check mr-3 text-purple-500"></i>Next Best Action</h3>
                    <div className="space-y-3">
                        {data.possibleActions.map(action => (
                            <div key={action.id} className={`p-4 rounded-lg border transition-all duration-200 ${action.chosen ? 'bg-indigo-50 border-indigo-300 shadow-lg' : 'bg-white border-slate-200'}`}>
                                <p className={`text-sm font-medium flex items-center gap-3 ${action.chosen ? 'text-indigo-700' : 'text-slate-600'}`}>
                                    {action.chosen 
                                        ? <i className="fa-solid fa-star text-yellow-500"></i> 
                                        : <i className="fa-regular fa-circle text-slate-400"></i>
                                    }
                                    {action.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3"><i className="fa-solid fa-brain mr-3 text-yellow-500"></i>Justification</h3>
                    <div className="space-y-3 text-sm text-slate-600">
                        <p><strong className="text-yellow-700">Why it’s the right next step:</strong> {data.justification.why}</p>
                        <p><strong className="text-yellow-700">Data used to decide:</strong> {data.justification.data}</p>
                        <p><strong className="text-yellow-700">Logic:</strong> {data.justification.logic}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white border-2 border-green-400 rounded-xl shadow-lg">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-green-600 mb-4"><i className="fa-solid fa-rocket mr-3"></i>{data.executedAction.title}</h3>
                    <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                        <p className="text-sm font-semibold text-slate-900 mb-2">{data.executedAction.post.platform}</p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{data.executedAction.post.caption}</p>
                        <p className="text-cyan-700 text-xs italic mt-4">{data.executedAction.post.hashtags}</p>
                    </div>
                    <div className="text-right mt-4">
                        <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm flex items-center gap-2 ml-auto">
                           <i className="fa-solid fa-check"></i> Approve & Schedule Post
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-300">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        Ready for the Next Level?
                    </h2>
                    <p className="text-slate-600 mt-2 max-w-xl mx-auto">
                        You've seen the insights. Now, let the AI do the work. Unlock powerful automation tools designed to save you time and accelerate your growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8 text-sm">
                    {data.upgradeTriggers.map((trigger, index) => (
                        <div key={index} className="bg-white border border-slate-200 rounded-xl p-5">
                            <p className="text-xs font-semibold text-slate-500 mb-2">TRIGGER</p>
                            <p className="text-slate-700 mb-4">{trigger.condition}</p>
                            <p className="font-bold text-purple-600 mb-2">✨ "{trigger.message}"</p>
                            <div className="text-slate-600 space-y-3">
                                <p><strong className="text-slate-800">Value:</strong> {trigger.value}</p>
                                <p><strong className="text-slate-800">Timing:</strong> {trigger.timing}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg">
                        <i className="fa-solid fa-rocket mr-3"></i>
                        Upgrade to Growth Copilot
                    </button>
                </div>

                <div className="text-center mt-8 pt-6 border-t border-slate-200">
                    <p className="text-sm text-yellow-700 italic"><span className="font-bold">💡 Product Insight:</span> {data.productInsight}</p>
                </div>
            </div>
        </div>
    );
};