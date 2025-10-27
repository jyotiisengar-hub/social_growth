import React from 'react';
import { PostCard } from './PostCard';
import { SocialPost } from '../types';

const pastMetrics = [
    { title: 'Yoga for Beginners Reel', likes: 240, comments: 18, dms: 5, type: 'Reel' },
    { title: 'Client Testimonial', likes: 150, comments: 2, dms: 0, type: 'Carousel' },
    { title: 'Morning Routine Tip', likes: 80, comments: 4, dms: 0, type: 'Image Post' },
];

const newPlanPosts: SocialPost[] = [
    {
        id: 'new-1',
        platform: 'Instagram',
        title: '30-Second Desk De-Stressor',
        caption: "Feeling stiff after a long day at your desk? Try this 30-second stretch to unlock your hips. It’s a game-changer! ✨ Want to feel this good all the time? DM me ‘FREE CLASS’ to book your first session on me! #YogaForDeskJockeys #BangaloreYoga #Stretches",
        suggested_time: '6:00 PM',
        image_prompt: 'A short, engaging video of you demonstrating the hip-opening stretch near a desk.',
        rationale: 'Capitalizes on the high engagement of Reels and targets a specific pain point for the audience.',
        impact_score: 9,
        simple_test_idea: 'Test if asking for a specific DM keyword ("FREE CLASS") increases lead quality.',
        insight: 'Reels with a personal, instructional tone perform 2x better and drive direct messages (leads).',
        change: 'Add a stronger, more direct Call-to-Action (CTA) to encourage DMs for a free trial, converting viewers directly into leads.'
    },
    {
        id: 'new-2',
        platform: 'LinkedIn',
        title: 'From Burnout to Balance',
        caption: "Last week, a client told me, 'I didn't realize how much tension I was holding in my shoulders until our first session.' This is common for Bangalore's tech professionals. A simple, mindful approach can change your entire workday. It's not about complex poses; it's about reconnecting. #CorporateWellness #Mindfulness #BangaloreTech",
        suggested_time: '12:00 PM',
        image_prompt: 'A professional but warm headshot of you, looking approachable.',
        rationale: 'Combines the effectiveness of testimonials with a direct address to the professional LinkedIn audience.',
        impact_score: 8,
        simple_test_idea: 'See if including a client quote directly in the post increases comments.',
        insight: 'Testimonials build trust, but need a stronger narrative hook to generate engagement.',
        change: 'Frame the testimonial as a relatable story that addresses a specific audience pain point (burnout, tension).'
    }
];

export const PerformanceAnalysis: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-indigo-400 mb-4">Last Week's Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {pastMetrics.map(metric => (
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
                        <li>Short-form video (Reels) drove the highest engagement.</li>
                        <li>Instructional content ("Yoga for Beginners") resonated well.</li>
                        <li>Content that generated DMs was the most effective for lead generation.</li>
                    </ul>
                </div>
                <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg">
                    <h3 className="font-bold mb-2"><i className="fa-solid fa-triangle-exclamation mr-2"></i>What Didn't</h3>
                     <ul className="list-disc list-inside space-y-1">
                        <li>Static posts (tips, carousels) had lower reach and engagement.</li>
                        <li>Lack of a direct, compelling CTA resulted in zero DMs on two posts.</li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-indigo-400 mb-4 text-center">This Week's Data-Driven Plan</h2>
                <div className="space-y-6">
                    {newPlanPosts.map(post => (
                        <PostCard key={post.id} post={post} onFeedback={() => {}} />
                    ))}
                </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg text-center">
                <p className="font-bold"><i className="fa-solid fa-bullseye mr-2"></i>AI Insight Summary</p>
                <p className="text-sm">Next week, focus on short-form video with clear, direct-message-based CTAs to maximize lead generation.</p>
            </div>
        </div>
    );
};
