
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-start pointer-events-none">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tighter italic">
          FIBONACCI<span className="text-blue-500">.CORE</span>
        </h1>
        <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">The Divine Proportion in 3D</p>
      </div>
      <div className="bg-slate-900/40 backdrop-blur-sm px-3 py-1 rounded border border-white/10 text-[10px] font-mono text-slate-300">
        V-1.0.42_PHI
      </div>
    </div>
  );
};

export default Header;
