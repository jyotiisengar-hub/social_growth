import React, { useState } from 'react';
import { SocialPost } from '../types';

interface PostCardProps {
  post: SocialPost;
  onFeedback: (id: string, feedback: 'useful' | 'not useful') => void;
}

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('instagram')) return <i className="fa-brands fa-instagram text-2xl" style={{color: '#E4405F'}}></i>;
    if (lowerPlatform.includes('facebook')) return <i className="fa-brands fa-facebook text-2xl" style={{color: '#1877F2'}}></i>;
    if (lowerPlatform.includes('x') || lowerPlatform.includes('twitter')) return <i className="fa-brands fa-twitter text-2xl" style={{color: '#1DA1F2'}}></i>;
    if (lowerPlatform.includes('linkedin')) return <i className="fa-brands fa-linkedin text-2xl" style={{color: '#0A66C2'}}></i>;
    return <i className="fa-solid fa-share-nodes text-2xl"></i>;
};

const InfoPill: React.FC<{ icon: string, label: string, value: string | number, colorClass: string }> = ({ icon, label, value, colorClass }) => (
    <div className={`flex items-center gap-2 text-xs ${colorClass} bg-slate-700/50 px-3 py-1.5 rounded-full`}>
        <i className={icon}></i>
        <span className="font-bold">{label}:</span>
        <span className="font-light">{value}</span>
    </div>
);

export const PostCard: React.FC<PostCardProps> = ({ post, onFeedback }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFeedbackButtonStyle = (type: 'useful' | 'not useful') => {
    const isSelected = post.feedback === type;
    const baseClasses = 'flex items-center gap-2 px-3 py-1 text-xs rounded-full transition-all duration-200';
    if (isSelected) {
        return type === 'useful' 
            ? `${baseClasses} bg-green-500/20 text-green-300 ring-1 ring-green-500` 
            : `${baseClasses} bg-red-500/20 text-red-300 ring-1 ring-red-500`;
    }
    return `${baseClasses} bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200`;
  };

  const showFeedback = !!onFeedback;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:border-indigo-600/50 hover:shadow-indigo-900/20">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <PlatformIcon platform={post.platform} />
            <div>
                <h3 className="text-lg font-bold text-slate-100">{post.platform}</h3>
                <p className="text-sm text-slate-400">{post.title}</p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {copied ? <><i className="fa-solid fa-check mr-2"></i>Copied!</> : <><i className="fa-regular fa-copy mr-2"></i>Copy Caption</>}
          </button>
        </div>
        
        <div className="pl-10 space-y-4">
          <div>
            <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{post.caption}</p>
          </div>
          
          <div className="pt-4 border-t border-slate-700/50 space-y-3">
            {post.insight && (
                <div className="text-sm bg-blue-900/40 p-3 rounded-lg border border-blue-700/60 text-blue-200 flex items-start gap-3">
                    <i className="fa-solid fa-magnifying-glass-chart mt-1 text-blue-400"></i>
                    <div><span className="font-semibold">Insight:</span> {post.insight}</div>
                </div>
            )}
            {post.change && (
                <div className="text-sm bg-purple-900/40 p-3 rounded-lg border border-purple-700/60 text-purple-200 flex items-start gap-3">
                    <i className="fa-solid fa-wand-magic-sparkles mt-1 text-purple-400"></i>
                    <div><span className="font-semibold">Change:</span> {post.change}</div>
                </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
                <InfoPill icon="fa-regular fa-clock" label="Time" value={post.suggested_time} colorClass="text-cyan-300" />
                <InfoPill icon="fa-solid fa-arrow-trend-up" label="Impact" value={`${post.impact_score}/10`} colorClass="text-amber-300" />
            </div>
            <div className="text-sm text-slate-400 flex items-start gap-3">
                <i className="fa-regular fa-image mt-1 text-teal-400"></i>
                <div><span className="font-semibold">Image Prompt:</span> {post.image_prompt}</div>
            </div>
             <div className="text-sm text-slate-400 flex items-start gap-3">
                <i className="fa-regular fa-lightbulb mt-1 text-yellow-300"></i>
                <div><span className="font-semibold">Rationale:</span> {post.rationale}</div>
            </div>
             <div className="text-sm text-slate-400 flex items-start gap-3">
                <i className="fa-solid fa-vials mt-1 text-indigo-300"></i>
                <div><span className="font-semibold">Simple Test Idea:</span> {post.simple_test_idea}</div>
            </div>
          </div>
        </div>
      </div>
      {showFeedback && (
        <div className="bg-slate-800/50 px-5 py-3 border-t border-slate-700/50 flex items-center justify-end gap-3">
            <span className="text-xs text-slate-500 mr-2">Was this suggestion helpful?</span>
            <button onClick={() => onFeedback(post.id, 'useful')} className={getFeedbackButtonStyle('useful')}>
                <i className="fa-solid fa-thumbs-up"></i>
                Useful
            </button>
            <button onClick={() => onFeedback(post.id, 'not useful')} className={getFeedbackButtonStyle('not useful')}>
                <i className="fa-solid fa-thumbs-down"></i>
                Not Useful
            </button>
        </div>
      )}
    </div>
  );
};
