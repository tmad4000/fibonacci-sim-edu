
import React from 'react';
import { NatureType } from '../types';

interface InfoPanelProps {
  type: NatureType;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ type }) => {
  const content = {
    [NatureType.SUNFLOWER]: {
      title: "Phyllotaxis & Packing",
      description: "Sunflowers use the Golden Angle (~137.5°) to pack seeds most efficiently. By rotating exactly this amount between each new seed, the plant avoids overlaps and ensures every seed has access to sunlight and space without leaving gaps.",
      formula: "r = c√n, θ = n * 137.5°",
      fact: "If the angle was even slightly different (e.g. 137.4° or 137.6°), distinct gaps would form, wasting up to 20% of the space!"
    },
    [NatureType.SEASHELL]: {
      title: "The Equiangular Spiral",
      description: "A Nautilus shell grows in a logarithmic spiral. As the organism inside gets larger, it builds a new, larger chamber that maintains the exact same shape as the previous one, allowing it to grow without changing proportions.",
      formula: "r = ae^(bθ)",
      fact: "This constant shape is called 'self-similarity' and is a core principle of fractals found throughout the universe."
    },
    [NatureType.PINECONE]: {
      title: "Opposing Spirals",
      description: "Pinecones exhibit two sets of spirals—one clockwise and one counter-clockwise. These counts are almost always two consecutive Fibonacci numbers (e.g., 8 and 13, or 13 and 21).",
      formula: "F(n) = F(n-1) + F(n-2)",
      fact: "This arrangement maximizes the density of the scales, providing the best protection for the seeds within."
    }
  };

  const info = content[type];

  return (
    <div className="absolute top-20 right-4 z-10 w-80">
      <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">
        {/* Decorative corner glow */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
        
        <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {info.description}
        </p>
        
        <div className="bg-black/40 rounded-lg p-3 border border-white/5 mb-4">
          <span className="text-[10px] text-blue-400 uppercase font-mono block mb-1">Mathematical Rule</span>
          <code className="text-sm font-mono text-white">{info.formula}</code>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="mt-1 w-5 h-5 flex-shrink-0 bg-blue-500/20 rounded flex items-center justify-center border border-blue-500/30">
            <span className="text-blue-400 text-[10px] font-bold">!</span>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            {info.fact}
          </p>
        </div>
      </div>
      
      <div className="mt-4 bg-blue-600/10 backdrop-blur-md p-4 rounded-xl border border-blue-500/20">
        <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold mb-1">Interactive Task</p>
        <p className="text-xs text-blue-100">Try sliding the "Golden Ratio" parameter. Notice how even a 0.1% change causes the beautiful spirals to collapse into chaotic lines.</p>
      </div>
    </div>
  );
};

export default InfoPanel;
