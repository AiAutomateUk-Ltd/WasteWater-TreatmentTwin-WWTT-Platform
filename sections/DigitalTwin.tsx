
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCw, 
  Settings2, 
  Info, 
  Thermometer, 
  Wind, 
  Layers, 
  Waves,
  Zap,
  Globe,
  Users,
  Box,
  AlertOctagon,
  CheckCircle2,
  Cpu,
  MonitorCheck,
  ZapOff,
  Maximize2,
  MessageSquare,
  Activity,
  Loader2,
  // Added ShieldCheck to fix the missing component error on line 354
  ShieldCheck
} from 'lucide-react';
import { analyzeEngineeringDesign } from '../geminiService';
import { DesignValidation } from '../types';

const DigitalTwin: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [isOmniverseSync, setIsOmniverseSync] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<DesignValidation | null>(null);
  
  // Simulation Parameter States
  const [load, setLoad] = useState(65);
  const [elasticity, setElasticity] = useState(0.4);
  const [friction, setFriction] = useState(0.25);
  const [ambientTemp, setAmbientTemp] = useState(22);
  const [humidity, setHumidity] = useState(45);
  const [pressure, setPressure] = useState(101.3);

  // Derived conflict status for visual feedback
  const hasConflict = load > 85 && friction > 0.6;

  const runValidation = async () => {
    setIsValidating(true);
    const params = { load, elasticity, friction, ambientTemp, humidity, pressure };
    const result = await analyzeEngineeringDesign(params);
    setValidationResult(result);
    setIsValidating(false);
  };

  useEffect(() => {
    if (isSimulating) {
      const timer = setTimeout(() => runValidation(), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSimulating, load, friction]);

  return (
    <div className="h-full flex flex-col gap-8 pb-10">
      {/* Immersive Platform Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/60 border border-slate-800 p-8 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Globe className="w-3 h-3" /> Omniverse® Live Integration
             </div>
             <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Users className="w-3 h-3" /> 4 Active Collaborators
             </div>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">Immersive Engineering Hub<span className="text-emerald-400">®</span></h2>
          <p className="text-slate-400 max-w-2xl font-medium">
            Virtual Commissioning & Design Validation Environment. Synchronized with NVIDIA Omniverse® Nucleus® for real-time collaboration.
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <button 
            onClick={() => setIsOmniverseSync(!isOmniverseSync)}
            className={`px-6 py-3 rounded-2xl border font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 ${
              isOmniverseSync 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
              : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <Box className="w-4 h-4" /> {isOmniverseSync ? 'NUCLEUS® SYNC: ACTIVE' : 'LOCAL CACHE MODE'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1">
        {/* Simulator Viewport (CAD/Immersive Style) */}
        <div className="xl:col-span-8 relative bg-[#020617] border border-slate-800 rounded-[40px] overflow-hidden group shadow-2xl min-h-[500px]">
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* High-End Industrial Simulation Display */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <svg viewBox="0 0 800 500" className="w-full h-full text-slate-800 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              {/* Ground Reflection */}
              <ellipse cx="400" cy="420" rx="350" ry="40" fill="url(#gradReflect)" opacity="0.3" />
              <defs>
                <radialGradient id="gradReflect">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* Advanced Machine Base */}
              <rect x="150" y="380" width="500" height="20" rx="2" fill="#1e293b" />
              <rect x="160" y="350" width="480" height="30" rx="4" fill="#334155" stroke="#475569" strokeWidth="1" />
              
              {/* Conveyor USD Mesh Simulation */}
              <g className={isSimulating ? 'animate-pulse' : ''}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <g key={i} transform={`translate(${200 + i * 55}, 355)`}>
                    <rect width="40" height="20" rx="4" fill={isSimulating ? (hasConflict ? '#f43f5e' : '#10b981') : '#1e293b'} opacity={isSimulating ? 0.4 : 0.2} />
                    <rect width="40" height="20" rx="4" fill="none" stroke={isSimulating ? (hasConflict ? '#f43f5e' : '#10b981') : '#334155'} strokeWidth="1" />
                  </g>
                ))}
              </g>

              {/* RT Robotic Arm USD Representation */}
              <g transform="translate(400, 350)" className="transition-all duration-700 ease-in-out">
                <circle r="30" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <g className={isSimulating ? 'animate-[arm-move_4s_infinite_ease-in-out]' : ''} style={{ transformOrigin: '0 0' }}>
                   <rect x="-10" y="-120" width="20" height="120" rx="10" fill="url(#armGrad)" stroke="#10b981" strokeOpacity="0.5" />
                   <circle cx="0" cy="-120" r="15" fill="#10b981" opacity={isSimulating ? 0.6 : 0.2} />
                   <defs>
                     <linearGradient id="armGrad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
                       <stop offset="100%" stopColor="#064e3b" stopOpacity="0.8"/>
                     </linearGradient>
                   </defs>
                </g>
              </g>

              {/* Engineering Overlays (Mistake Avoidance Tool) */}
              {isSimulating && (
                <g>
                  {hasConflict && (
                    <g className="animate-pulse">
                      <circle cx="250" cy="360" r="40" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5 5" />
                      <text x="210" y="310" className="text-[10px] fill-rose-500 font-bold uppercase tracking-widest">Interference Detected</text>
                    </g>
                  )}
                  <text x="50" y="50" className="text-[12px] fill-emerald-400 font-mono tracking-tighter uppercase">RTX® Render: Active</text>
                  <text x="50" y="70" className="text-[12px] fill-emerald-400 font-mono tracking-tighter uppercase">PhysX® Solver: Validating</text>
                </g>
              )}
            </svg>
          </div>

          <style>{`
            @keyframes arm-move {
              0%, 100% { transform: rotate(-15deg); }
              50% { transform: rotate(45deg); }
            }
          `}</style>

          {/* Viewport HUD */}
          <div className="absolute top-8 left-8 flex flex-col gap-4">
            <div className="p-4 bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-slate-800 flex gap-6 items-center shadow-2xl">
              <div className="space-y-1 border-r border-slate-800 pr-6">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">USD Layer Stack</span>
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-700'}`} />
                  {isSimulating ? 'L_Simulation_Master.usd' : 'Workspace Ready'}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`p-3 rounded-xl transition-all ${isSimulating ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'} shadow-xl shadow-black/50`}
                >
                  {isSimulating ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white fill-current" />}
                </button>
                <button 
                  onClick={() => setValidationResult(null)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white transition-all shadow-xl"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Collaboration HUD */}
          <div className="absolute top-8 right-8 flex gap-2">
            {['JD', 'MS', 'TK', 'AI'].map((user, i) => (
              <div key={user} className={`w-10 h-10 rounded-full border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-white shadow-xl ${
                user === 'AI' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-800 hover:bg-slate-700 cursor-pointer'
              }`} title={`User: ${user}`}>
                {user}
              </div>
            ))}
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
            <div className="flex gap-4 pointer-events-auto">
              <div className="px-4 py-2 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-xl text-[10px] font-mono text-emerald-400 uppercase tracking-tighter">
                LATENCY: 4.2ms | NUCLEUS®
              </div>
              <div className="px-4 py-2 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-xl text-[10px] font-mono text-emerald-400 uppercase tracking-tighter">
                REFRESH: 120Hz | RTX®
              </div>
            </div>
            <div className="flex gap-3 pointer-events-auto">
              <button className="p-3 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
                <Maximize2 className="w-4 h-4" />
              </button>
              <button className="p-3 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Configuration & Engineering Insights Panel */}
        <div className="xl:col-span-4 space-y-6 flex flex-col h-full max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar pr-2">
          
          {/* AI Conflict Detection Report */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <MonitorCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-widest">Engineering Insights<span className="text-emerald-400">®</span></h3>
              </div>
              {isValidating && <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />}
            </div>

            {validationResult ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
                  validationResult.status === 'Safe' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' :
                  validationResult.status === 'At Risk' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' :
                  'bg-rose-500/5 border-rose-500/20 text-rose-400'
                }`}>
                  {validationResult.status === 'Safe' ? <CheckCircle2 className="w-6 h-6" /> : <AlertOctagon className="w-6 h-6" />}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Design Status</p>
                    <p className="text-lg font-black">{validationResult.status.toUpperCase()}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Score</p>
                    <p className="text-lg font-mono font-bold">{validationResult.efficiencyScore}%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Identified Conflicts & Risks</p>
                  {validationResult.conflicts.map((conflict, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/30 transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                          conflict.severity === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {conflict.severity}
                        </span>
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{conflict.type}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-bold mb-2 leading-relaxed">{conflict.description}</p>
                      <div className="pt-2 border-t border-slate-800/50 mt-2">
                        <p className="text-[10px] text-emerald-400/70 font-medium">MITIGATION:</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed italic">{conflict.mitigation}</p>
                      </div>
                    </div>
                  ))}
                  {validationResult.conflicts.length === 0 && (
                     <div className="text-center py-6 text-slate-500 text-xs italic">
                        No critical engineering mistakes detected in the current layer.
                     </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                <Activity className="w-12 h-12 text-slate-800 mb-4 animate-pulse" />
                <h4 className="text-slate-400 font-bold text-sm mb-2">Awaiting Simulation Feed</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Start the Digital Twin® simulation to trigger the AiAutomateUK® Immersive Engineering validation suite.
                </p>
              </div>
            )}
          </div>

          {/* Scene USD Control Parameters */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <Settings2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">USD Layer Attributes</h3>
            </div>

            <div className="space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Operational Load</label>
                    <span className={`text-xs font-mono font-bold ${load > 85 ? 'text-rose-500' : 'text-emerald-400'}`}>{load}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" value={load} 
                    onChange={(e) => setLoad(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                  />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Physics Friction (μ)</label>
                    <span className="text-xs font-mono font-bold text-emerald-400">{friction.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.01" value={friction} 
                    onChange={(e) => setFriction(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                  />
               </div>

               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <label className="text-[9px] text-slate-500 font-black uppercase mb-2 block">Ambient Temp</label>
                    <div className="flex items-center justify-between">
                       <Thermometer className="w-4 h-4 text-blue-400" />
                       <span className="text-sm font-mono font-bold text-white">{ambientTemp}°C</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <label className="text-[9px] text-slate-500 font-black uppercase mb-2 block">USD Sync Rate</label>
                    <div className="flex items-center justify-between">
                       <Zap className="w-4 h-4 text-amber-400" />
                       <span className="text-sm font-mono font-bold text-white">60Hz</span>
                    </div>
                  </div>
               </div>

               <button className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-slate-700 shadow-xl">
                  Commit Mesh to Nucleus®
               </button>
            </div>
          </div>

          {/* Benefits Summary Footer */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-4 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
              <h4 className="font-bold text-sm tracking-tight">Mistake Avoidance Engine®</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              By simulating virtual commissioning in this AiAutomateUK® Hub before physical wiring, we estimate a reduction in onsite correction costs by <span className="text-emerald-400 font-bold">~82%</span>. 
              {isSimulating ? " Current RTX® ray-tracing is validating photon interaction with sensor nodes." : " Workspace synchronized with Global Nucleus® Server."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
