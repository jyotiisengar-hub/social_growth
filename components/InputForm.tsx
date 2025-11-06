import React, { useState, FormEvent, useEffect } from 'react';
import { UserInput } from '../types';

interface InputFormProps {
  onGenerate: (data: UserInput | string) => void;
  isLoading: boolean;
  initialData: UserInput | null;
}

const defaultValues = {
  businessName: 'Agni Yoga',
  category: 'Yoga & Wellness',
  product: 'Private & Group Yoga Lessons',
  city: 'Bangalore',
  goal: 'Lead Generation',
  tone: 'Warm Tone',
  platform: 'Instagram & LinkedIn',
  audience: 'Yoga enthusiasts and wellness seekers in Bangalore',
  socialMediaLink: 'https://www.instagram.com/agniyogaindia/',
};

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading, initialData }) => {
  const [prompt, setPrompt] = useState('');
  const [businessName, setBusinessName] = useState(defaultValues.businessName);
  const [category, setCategory] = useState(defaultValues.category);
  const [product, setProduct] = useState(defaultValues.product);
  const [city, setCity] = useState(defaultValues.city);
  const [goal, setGoal] = useState(defaultValues.goal);
  const [tone, setTone] = useState(defaultValues.tone);
  const [platform, setPlatform] = useState(defaultValues.platform);
  const [audience, setAudience] = useState(defaultValues.audience);
  const [socialMediaLink, setSocialMediaLink] = useState(defaultValues.socialMediaLink);
  
  useEffect(() => {
    if (initialData) {
      setBusinessName(initialData.businessName);
      setCategory(initialData.category);
      setProduct(initialData.product);
      setCity(initialData.city);
      setGoal(initialData.goal);
      setTone(initialData.tone);
      setPlatform(initialData.platform);
      setAudience(initialData.audience);
      setSocialMediaLink(initialData.socialMediaLink || '');
    } else {
      // Reset to defaults when starting a new plan
      setBusinessName(defaultValues.businessName);
      setCategory(defaultValues.category);
      setProduct(defaultValues.product);
      setCity(defaultValues.city);
      setGoal(defaultValues.goal);
      setTone(defaultValues.tone);
      setPlatform(defaultValues.platform);
      setAudience(defaultValues.audience);
      setSocialMediaLink(defaultValues.socialMediaLink);
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (prompt) {
      onGenerate(prompt);
    } else if (businessName && category && product && city && goal && tone && platform && audience) {
      onGenerate({ businessName, category, product, city, goal, tone, platform, audience, socialMediaLink });
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-slate-200 disabled:cursor-not-allowed";

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white border border-slate-200 rounded-xl shadow-lg space-y-6">
      <div>
        <label htmlFor="prompt" className="sr-only">Tell me about your business</label>
        <div className="relative">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Tell me about your business — I’ll create your next 7 days of growth."
            className="w-full bg-slate-50 border border-slate-300 rounded-md py-3 px-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-slate-200 disabled:cursor-not-allowed resize-none"
            rows={3}
            disabled={isLoading}
          />
          <div className="absolute top-3.5 right-3.5 text-slate-400">
             <i className="fa-solid fa-microphone"></i>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm font-medium text-slate-500">OR</span>
        </div>
      </div>
      
       <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
              <input id="businessName" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g., Agni Yoga" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Yoga & Wellness" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-slate-700 mb-1">Product/Service</label>
              <input id="product" type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g., Private & Group Yoga Lessons" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Bangalore" className={inputClass} required disabled={isLoading} />
            </div>
             <div>
              <label htmlFor="tone" className="block text-sm font-medium text-slate-700 mb-1">Tone of Voice</label>
              <input id="tone" type="text" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="e.g., Warm Tone" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-slate-700 mb-1">Primary Platform(s)</label>
              <input id="platform" type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g., Instagram & LinkedIn" className={inputClass} required disabled={isLoading} />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="socialMediaLink" className="block text-sm font-medium text-slate-700 mb-1">Business Social Media (for inspiration)</label>
                <input id="socialMediaLink" type="text" value={socialMediaLink} onChange={(e) => setSocialMediaLink(e.target.value)} placeholder="e.g., https://www.instagram.com/yourbusiness" className={inputClass} disabled={isLoading} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="goal" className="block text-sm font-medium text-slate-700 mb-1">Primary Goal</label>
              <input id="goal" type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., Lead Generation" className={inputClass} required disabled={isLoading} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="audience" className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <input id="audience" type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., Yoga enthusiasts in Bangalore" className={inputClass} required disabled={isLoading} />
            </div>
          </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Plan...
            </>
        ) : (
            <>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Generate Plan
            </>
        )}
      </button>
    </form>
  );
};