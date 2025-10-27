import React from 'react';
import { MultiPlatformStrategyData, PlatformStrategy } from '../types';

interface MultiPlatformStrategyProps {
    data: MultiPlatformStrategyData;
}

const StrategyCard: React.FC<{ strategy: PlatformStrategy }> = ({ strategy }) => (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
                <i className={`${strategy.icon} text-3xl`} style={{color: strategy.color}}></i>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">{strategy.platform}</h3>
                    <p className="text-sm text-slate-500">{strategy.focus}</p>
                </div>
            </div>
            <div className="space-y-4 text-sm">
                <p className="text-slate-700 bg-slate-100 p-3 rounded-md"><span className="font-semibold text-slate-900">Format:</span> {strategy.format}</p>
                <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Platform-Specific Caption:</h4>
                    <p className="text-slate-700 whitespace-pre-wrap p-3 border border-slate-200 rounded-md text-xs leading-relaxed">{strategy.caption}</p>
                </div>
                <p className="text-cyan-700 text-xs italic bg-slate-100 p-2 rounded-md"><span className="font-semibold text-slate-900">Hashtags:</span> {strategy.hashtags}</p>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-100 p-3 rounded-md">
                        <h4 className="font-semibold text-slate-900 mb-1">Call-to-Action:</h4>
                        <p className="text-slate-700">{strategy.cta}</p>
                    </div>
                     <div className="bg-slate-100 p-3 rounded-md">
                        <h4 className="font-semibold text-slate-900 mb-1">Recommended Time:</h4>
                        <p className="text-slate-700">{strategy.time}</p>
                    </div>
                </div>
                <div className="text-sm bg-indigo-50 p-3 rounded-lg border border-indigo-200 text-indigo-800 flex items-start gap-3">
                    <i className="fa-solid fa-brain mt-1 text-indigo-600"></i>
                    <div><span className="font-semibold">Why it Differs:</span> {strategy.rationale}</div>
                </div>
            </div>
        </div>
    </div>
);


export const MultiPlatformStrategy: React.FC<MultiPlatformStrategyProps> = ({ data }) => {
    return (
        <div className="space-y-8 animate-fade-in">
             <div className="text-center p-6 bg-white border border-slate-200 rounded-xl">
                <h2 className="text-2xl font-bold text-indigo-600">Master Post Concept: '{data.masterConcept.title}'</h2>
                <p className="text-slate-600 text-md mt-2 max-w-2xl mx-auto">{data.masterConcept.description}</p>
            </div>
            <div className="space-y-6">
                {data.platformStrategies.map(strategy => (
                    <StrategyCard key={strategy.platform} strategy={strategy} />
                ))}
            </div>
        </div>
    );
};