import React from 'react';

interface TileProps {
    title: string;
    description: string;
}

const Tile: React.FC<TileProps> = ({ title, description }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
);

interface SectionProps {
    icon: string;
    title: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ icon, title, children }) => (
    <section>
        <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            {title}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
            {children}
        </div>
    </section>
);


export const FutureVision: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in space-y-12">
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-lg">
                <label htmlFor="prompt" className="sr-only">Tell me about your business</label>
                <div className="relative">
                    <div
                        id="prompt-display"
                        className="w-full bg-slate-50 border border-slate-300 rounded-md py-3 px-4 text-slate-500"
                    >
                        Tell me about your business — I’ll create your next 7 days of growth.
                    </div>
                    <div className="absolute top-3.5 right-3.5 text-slate-400">
                        <i className="fa-solid fa-microphone"></i>
                    </div>
                </div>
            </div>

            <Section icon="🚀" title="Growth Engine">
                <Tile title="📅 Content Plan" description="Generate a 7-day post plan — optimized for your goal." />
                <Tile title="✍️ AI Caption Studio" description="Auto-create scroll-stopping captions and hashtags." />
                <Tile title="🧠 Learn & Adapt" description="Track performance and see AI learn what works." />
            </Section>
            
            <Section icon="🤖" title="Autonomous Actions">
                <Tile title="🗓️ Auto Schedule" description="Let Copilot publish your best content automatically." />
                <Tile title="💬 Smart Replies" description="Auto-respond to comments or DMs with your tone." />
                <Tile title="🧾 Offer Generator" description="Create personalized limited-time deals when engagement spikes." />
            </Section>

            <Section icon="💰" title="Monetization Insights">
                <Tile title="📊 Growth Dashboard" description="View engagement → leads → bookings at a glance." />
                <Tile title="💡 AI Insights" description="See what post types convert best — and why." />
                <Tile title="⚡ Upgrade to Copilot Pro" description="Unlock automated posting and AI ad optimization." />
            </Section>

            <footer className="text-center pt-8 border-t border-slate-200">
                <p className="text-slate-500 italic">“Your growth assistant that learns with every post.”</p>
            </footer>
        </div>
    );
};