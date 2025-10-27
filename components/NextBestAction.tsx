import React from 'react';

const possibleActions = [
    { id: 1, text: 'Schedule a new post for Friday morning.', chosen: false },
    { id: 2, text: 'Auto-reply to DMs with a thank-you message + booking link.', chosen: false },
    { id: 3, text: 'Generate a limited-time “Trial Offer” post.', chosen: true },
    { id: 4, text: 'Send a weekly performance report email.', chosen: false },
];

const generatedPost = {
    platform: 'Instagram',
    caption: "Wow! The response to our recent posts has been incredible. It seems many of you in Bangalore are ready to start your wellness journey, and I want to make that even easier. ✨\n\nFor the next 48 hours, I'm offering a special 'Discovery Pass' for just ₹299 (usually ₹799). You get access to any two classes this week.\n\nThis is the perfect chance to see if our studio is right for you. Ready to feel the difference? DM me the word 'DISCOVERY' to claim your pass. Spots are limited!",
    hashtags: '#BangaloreYoga #YogaOffer #LimitedTime #WellnessJourney #OmYoga'
};

export const NextBestAction: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                <h2 className="text-2xl font-bold text-indigo-400">Next Best Action</h2>
                <p className="text-slate-400 text-md mt-2 max-w-2xl mx-auto">From insight to action. The copilot identifies and prepares the most impactful next step to help you achieve your goals.</p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-3"><i className="fa-solid fa-map-signs mr-3 text-cyan-400"></i>Scenario</h3>
                <p className="text-sm text-slate-300">The 7-day content plan is live. The "Yoga for Beginners Reel" and "Client Testimonial" posts performed significantly above average, driving <span className="font-bold text-white">5 DMs combined</span>. This indicates high-intent interest from potential customers.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-100"><i className="fa-solid fa-list-check mr-3 text-purple-400"></i>Next Best Action</h3>
                    <div className="space-y-3">
                        {possibleActions.map(action => (
                            <div key={action.id} className={`p-4 rounded-lg border transition-all duration-200 ${action.chosen ? 'bg-indigo-900/50 border-indigo-600 shadow-lg' : 'bg-slate-800 border-slate-700'}`}>
                                <p className={`text-sm font-medium flex items-center gap-3 ${action.chosen ? 'text-indigo-300' : 'text-slate-400'}`}>
                                    {action.chosen 
                                        ? <i className="fa-solid fa-star text-yellow-400"></i> 
                                        : <i className="fa-regular fa-circle text-slate-600"></i>
                                    }
                                    {action.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-3"><i className="fa-solid fa-brain mr-3 text-yellow-400"></i>Justification</h3>
                    <div className="space-y-3 text-sm text-slate-300">
                        <p><strong className="text-yellow-300">Why it’s the right next step:</strong> This action is proactive and conversion-focused. It leverages the current momentum to turn warm interest into a direct sale, which is the primary business goal.</p>
                        <p><strong className="text-yellow-300">Data used to decide:</strong> The key metric is the <span className="font-bold text-white">5 DMs (direct messages)</span>, which is a strong signal of purchase intent. This is more valuable than likes or comments for immediate lead generation.</p>
                        <p><strong className="text-yellow-300">Logic:</strong> While other actions are useful, generating a limited-time offer is the only one that directly capitalizes on the demonstrated interest with a sense of urgency, maximizing the chance of converting high-intent users into paying customers.</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 border-2 border-green-600/50 rounded-xl shadow-lg">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-green-400 mb-4"><i className="fa-solid fa-rocket mr-3"></i>Action Executed: Generated "Limited-Time Trial Offer" Post</h3>
                    <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700">
                        <p className="text-sm font-semibold text-slate-100 mb-2">{generatedPost.platform}</p>
                        <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{generatedPost.caption}</p>
                        <p className="text-cyan-300 text-xs italic mt-4">{generatedPost.hashtags}</p>
                    </div>
                    <div className="text-right mt-4">
                        <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm flex items-center gap-2 ml-auto">
                           <i className="fa-solid fa-check"></i> Approve & Schedule Post
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-700">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        Ready for the Next Level?
                    </h2>
                    <p className="text-slate-400 mt-2 max-w-xl mx-auto">
                        You've seen the insights. Now, let the AI do the work. Unlock powerful automation tools designed to save you time and accelerate your growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8 text-sm">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                        <p className="text-xs font-semibold text-slate-500 mb-2">TRIGGER</p>
                        <p className="text-slate-300 mb-4">User has manually copied &amp; pasted 5+ posts.</p>
                        <p className="font-bold text-purple-300 mb-2">✨ "Tired of copy-pasting? Auto-schedule your posts across all platforms with one click."</p>
                        <div className="text-slate-400 space-y-3">
                            <p><strong className="text-slate-200">Value:</strong> This helps you save hours each month and maintain a consistent posting schedule, which is key for audience growth.</p>
                            <p><strong className="text-slate-200">Timing:</strong> In-app, right after you copy a post caption.</p>
                        </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                        <p className="text-xs font-semibold text-slate-500 mb-2">TRIGGER</p>
                        <p className="text-slate-300 mb-4">A post generates 5+ DMs or high-intent comments.</p>
                        <p className="font-bold text-purple-300 mb-2">🚀 "You've got leads! Unlock personalized AI-drafted follow-ups to turn conversations into customers."</p>
                        <div className="text-slate-400 space-y-3">
                            <p><strong className="text-slate-200">Value:</strong> This helps you convert more leads by ensuring timely, relevant, and effective communication without the guesswork.</p>
                            <p><strong className="text-slate-200">Timing:</strong> Via an email summary the morning after a post performs exceptionally well.</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg">
                        <i className="fa-solid fa-rocket mr-3"></i>
                        Upgrade to Growth Copilot
                    </button>
                </div>

                <div className="text-center mt-8 pt-6 border-t border-slate-800">
                    <p className="text-sm text-yellow-300/80 italic"><span className="font-bold">💡 Product Insight:</span> Users upgrade most when the AI offers a solution to a bottleneck they've just experienced.</p>
                </div>
            </div>
        </div>
    );
};