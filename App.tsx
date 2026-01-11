
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Float, Environment } from '@react-three/drei';
import NatureObject from './components/NatureObject';
import InfoPanel from './components/InfoPanel';
import Header from './components/Header';
import { NatureType } from './types';

const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState<NatureType>(NatureType.SUNFLOWER);
  const [phiScale, setPhiScale] = useState(1.618);
  const [pointCount, setPointCount] = useState(800);

  return (
    <div className="relative w-full h-screen bg-slate-950">
      <Header />
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
          <color attach="background" args={['#020617']} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={3} />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
              <NatureObject 
                type={selectedType} 
                phi={phiScale} 
                count={pointCount} 
              />
            </Float>

            <Text
              position={[0, -7, 0]}
              fontSize={0.4}
              color="#64748b"
              maxWidth={10}
              textAlign="center"
            >
              Drag to Orbit • Scroll to Zoom • Observe Symmetry
            </Text>
          </Suspense>

          <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} minDistance={5} maxDistance={40} />
        </Canvas>
      </div>

      <div className="absolute top-20 left-4 z-10 w-72 space-y-4">
        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-2xl">
          <h2 className="text-sm font-bold text-blue-400 mb-3 uppercase tracking-wider">Select Specimen</h2>
          <div className="grid grid-cols-1 gap-2">
            {[
              { id: NatureType.SUNFLOWER, label: '🌻 Sunflower', desc: 'Phyllotaxis' },
              { id: NatureType.SEASHELL, label: '🐚 Nautilus Shell', desc: 'Growth' },
              { id: NatureType.PINECONE, label: '🌲 Pinecone', desc: 'Dual Spirals' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setSelectedType(item.id)}
                className={`px-3 py-2 rounded-lg text-left text-sm transition-all flex flex-col ${selectedType === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                <span className="font-bold">{item.label}</span>
                <span className="text-[10px] opacity-70">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-2xl">
          <h2 className="text-sm font-bold text-blue-400 mb-3 uppercase tracking-wider">Parameters</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Golden Ratio (φ)</span>
                <span className="font-mono text-blue-400">{phiScale.toFixed(3)}</span>
              </div>
              <input 
                type="range" min="1.0" max="2.0" step="0.001" 
                value={phiScale} 
                onChange={(e) => setPhiScale(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <button 
                onClick={() => setPhiScale(1.618)}
                className="mt-2 text-[10px] text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest font-bold"
              >
                Reset to Phi (1.618)
              </button>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Density</span>
                <span className="font-mono text-blue-400">{pointCount}</span>
              </div>
              <input 
                type="range" min="100" max="1500" step="50" 
                value={pointCount} 
                onChange={(e) => setPointCount(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <InfoPanel type={selectedType} />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-[10px] text-slate-500 uppercase tracking-[0.2em] pointer-events-none">
        Patterns of Growth • Mathematics of Life
      </div>
    </div>
  );
};

export default App;
