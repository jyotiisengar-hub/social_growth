import React from 'react';

const masterConcept = {
  title: "The 5-Minute Desk Reset",
  description: "Share a simple, effective 5-minute yoga and breathing sequence that busy professionals in Bangalore can do at their desk to combat afternoon fatigue. This provides immediate value and positions Om Yoga as an expert solution.",
};

const platformStrategies = [
    {
        platform: 'Instagram',
        icon: 'fa-brands fa-instagram',
        color: '#E4405F',
        focus: 'Emphasize visuals, emotion, and a relatable personal story to inspire and create a connection.',
        format: 'A 30-second Instagram Reel with trending, calming audio, showing the instructor moving through 2-3 simple desk stretches with text overlays.',
        caption: "That 3 PM wall? I know it well. Your focus fades, your shoulders tighten, and another coffee just doesn't seem to help.\n\nBefore you push through the fog, gift yourself this 5-minute reset. Breathe deep, move gently, and reclaim your afternoon. You deserve this moment of peace. ✨",
        hashtags: '#DeskYoga #MindfulMoments #BangaloreWellness #WorkFromHome #StressRelief #5MinuteReset #YogaForBeginners #OmYogaBangalore',
        cta: "Save this reel for your next busy day! What's your go-to trick to beat the slump? Share it below! 👇",
        time: 'Tuesday at 1:00 PM',
        rationale: "The strategy is about emotion and utility. A Reel provides maximum visual reach. The caption is personal and empathetic, and the CTA focuses on engagement actions (Saves, Comments) to build community rather than making a hard sell."
    },
    {
        platform: 'LinkedIn',
        icon: 'fa-brands fa-linkedin',
        color: '#0A66C2',
        focus: 'Emphasize credibility, professional value, and community for a business-oriented audience.',
        format: 'A text post with a high-quality, professional photo of the instructor at a desk, looking calm and focused. Or, a simple 3-slide carousel (Problem, Solution, Benefit).',
        caption: "Productivity isn't about working more; it's about working smarter. Studies show that mental fatigue costs businesses thousands in lost output.\n\nInstead of forcing focus, try a strategic pause. This 5-minute desk yoga sequence is designed to improve circulation, reduce tension, and reset your concentration for a more effective afternoon.\n\nA small investment in wellness yields a high return on performance.",
        hashtags: '#CorporateWellness #EmployeeWellbeing #Productivity #BurnoutPrevention #FutureOfWork #BangaloreTech',
        cta: "Is workplace stress a challenge for your team? DM me to discuss our corporate wellness programs designed for Bangalore's leading companies.",
        time: 'Wednesday at 10:00 AM',
        rationale: "The tone is professional and data-driven. It frames the solution in terms of business benefits like productivity and performance. The CTA is a direct B2B lead generation tool targeting decision-makers."
    },
    {
        platform: 'Facebook',
        icon: 'fa-brands fa-facebook',
        color: '#1877F2',
        focus: 'Emphasize accessibility, local discovery, and community interaction.',
        format: 'A multi-photo post. Image 1: A welcoming photo of the studio. Images 2-4: Clear photos of each desk pose with descriptive text on the image.',
        caption: "Hey Bangalore! Are you tired of finishing your workday with an aching back and a foggy brain? We've got you! 👋\n\nHere's a super easy 5-minute routine you can do right at your desk to feel better instantly. No mat or special clothes required! Try it out and let us know how you feel.\n\nAt Om Yoga, we believe wellness should be simple and accessible for everyone in our community.",
        hashtags: '#YogaInBangalore #BangaloreEvents #Koramangala #Indiranagar #WellnessBangalore #OmYoga #FeelGoodFriday',
        cta: "Tag a friend or colleague who needs this today! 🤗 Ready to de-stress in our beautiful studio? Send us a message to claim a special 20% discount on your first class!",
        time: 'Friday at 4:00 PM',
        rationale: "The approach is friendly, local, and community-focused. The CTA encourages sharing and tagging to expand reach within local networks and uses a direct message prompt for a special offer, which works well for local business discovery."
    }
];

const StrategyCard: React.FC<{ strategy: typeof platformStrategies[0] }> = ({ strategy }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
                <i className={`${strategy.icon} text-3xl`} style={{color: strategy.color}}></i>
                <div>
                    <h3 className="text-xl font-bold text-slate-100">{strategy.platform}</h3>
                    <p className="text-sm text-slate-400">{strategy.focus}</p>
                </div>
            </div>
            <div className="space-y-4 text-sm">
                <p className="text-slate-300 bg-slate-700/50 p-3 rounded-md"><span className="font-semibold text-slate-100">Format:</span> {strategy.format}</p>
                <div>
                    <h4 className="font-semibold text-slate-100 mb-1">Platform-Specific Caption:</h4>
                    <p className="text-slate-300 whitespace-pre-wrap p-3 border border-slate-700 rounded-md text-xs leading-relaxed">{strategy.caption}</p>
                </div>
                <p className="text-cyan-300 text-xs italic bg-slate-900/50 p-2 rounded-md"><span className="font-semibold text-slate-100">Hashtags:</span> {strategy.hashtags}</p>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-700/50 p-3 rounded-md">
                        <h4 className="font-semibold text-slate-100 mb-1">Call-to-Action:</h4>
                        <p className="text-slate-300">{strategy.cta}</p>
                    </div>
                     <div className="bg-slate-700/50 p-3 rounded-md">
                        <h4 className="font-semibold text-slate-100 mb-1">Recommended Time:</h4>
                        <p className="text-slate-300">{strategy.time}</p>
                    </div>
                </div>
                <div className="text-sm bg-indigo-900/40 p-3 rounded-lg border border-indigo-700/60 text-indigo-200 flex items-start gap-3">
                    <i className="fa-solid fa-brain mt-1 text-indigo-400"></i>
                    <div><span className="font-semibold">Why it Differs:</span> {strategy.rationale}</div>
                </div>
            </div>
        </div>
    </div>
);


export const MultiPlatformStrategy: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
             <div className="text-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                <h2 className="text-2xl font-bold text-indigo-400">Master Post Concept: '{masterConcept.title}'</h2>
                <p className="text-slate-400 text-md mt-2 max-w-2xl mx-auto">{masterConcept.description}</p>
            </div>
            <div className="space-y-6">
                {platformStrategies.map(strategy => (
                    <StrategyCard key={strategy.platform} strategy={strategy} />
                ))}
            </div>
        </div>
    );
};