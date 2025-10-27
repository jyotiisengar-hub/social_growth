
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Social Growth Assistant
        </span>
      </h1>
      <p className="mt-3 text-lg text-slate-400">
        Get an instant, actionable social media plan for your business.
      </p>
    </header>
  );
};
