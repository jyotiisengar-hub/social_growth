import React, { useState, FormEvent } from 'react';
import { UserInput } from '../types';

interface InputFormProps {
  onGenerate: (data: UserInput) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [businessName, setBusinessName] = useState('Om Yoga');
  const [category, setCategory] = useState('Yoga Training and Wellness');
  const [product, setProduct] = useState('Private and group yoga lessons');
  const [city, setCity] = useState('Bangalore');
  const [goal, setGoal] = useState('Enroll new students into classes and private sessions');
  const [tone, setTone] = useState('Warm and encouraging');
  const [platform, setPlatform] = useState('Instagram');
  const [audience, setAudience] = useState('Young professionals and elders experiencing body pain');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (businessName && category && product && city && goal && tone && platform && audience) {
      onGenerate({ businessName, category, product, city, goal, tone, platform, audience });
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:bg-slate-200 disabled:cursor-not-allowed";

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white border border-slate-200 rounded-xl shadow-lg space-y-6">
       <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
              <input id="businessName" type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g., Om Yoga" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Yoga & Wellness" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-slate-700 mb-1">Product/Service</label>
              <input id="product" type="text" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g., Private yoga lessons" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">City</label>
              <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Bangalore" className={inputClass} required disabled={isLoading} />
            </div>
             <div>
              <label htmlFor="tone" className="block text-sm font-medium text-slate-700 mb-1">Tone of Voice</label>
              <input id="tone" type="text" value={tone} onChange={(e) => setTone(e.target.value)} placeholder="e.g., Warm, encouraging" className={inputClass} required disabled={isLoading} />
            </div>
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-slate-700 mb-1">Primary Platform</label>
              <input id="platform" type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="e.g., Instagram" className={inputClass} required disabled={isLoading} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="goal" className="block text-sm font-medium text-slate-700 mb-1">Primary Goal</label>
              <input id="goal" type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., Generate leads for new classes" className={inputClass} required disabled={isLoading} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="audience" className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <input id="audience" type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., Young professionals, elders with body pain" className={inputClass} required disabled={isLoading} />
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