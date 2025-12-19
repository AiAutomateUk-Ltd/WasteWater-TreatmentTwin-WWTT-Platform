
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Activity, 
  Zap, 
  Thermometer, 
  Droplets,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Globe,
  Sparkles,
  Server,
  ZapOff,
  MonitorCheck
} from 'lucide-react';

const efficiencyData = [
  { time: 'Mon', active: 85, ideal: 100 },
  { time: 'Tue', active: 78, ideal: 100 },
  { time: 'Wed', active: 92, ideal: 100 },
  { time: 'Thu', active: 66, ideal: 100 },
  { time: 'Fri', active: 94, ideal: 100 },
  { time: 'Sat', active: 88, ideal: 100 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:bg-slate-900/60 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
      <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* Refined Hero Section with Immersive Mention */}
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-gradient-to-br from-slate-900/80 to-slate-950 border border-slate-800 p-10 rounded-[40px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" /> Intelligence Command Hub
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
              AiAutomateUK<span className="text-2xl align-top font-bold">®</span> <br/>
              <span className="text-emerald-400">Immersive</span> Autonomy
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              A unified ecosystem for Immersive Engineering®, NVIDIA Omniverse® digital twins, and AI-powered predictive forensics. Engineered to eliminate industrial deployment risks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
             <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl text-center min-w-[160px]">
                <MonitorCheck className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Simulated Scenes</p>
                <p className="text-2xl font-bold text-white font-mono">14</p>
             </div>
             <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl text-center min-w-[160px]">
                <Activity className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">AI Uptime</p>
                <p className="text-2xl font-bold text-emerald-400 font-mono">99.98%</p>
             </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Throughput" value="1.2M Units" icon={Activity} color="emerald" trend={12} />
        <StatCard title="Energy Consumption" value="2,450 kWh" icon={Zap} color="amber" trend={-5} />
        <StatCard title="Ambient Temp" value="24.5°C" icon={Thermometer} color="blue" trend={2} />
        <StatCard title="Hydraulic Pressure" value="2,100 PSI" icon={Droplets} color="indigo" trend={-1.5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-[40px] p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold text-white">Production Line Efficiency</h3>
              <p className="text-sm text-slate-400 mt-1">Real-time performance metrics vs. ideal benchmarks</p>
            </div>
            <div className="hidden sm:flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ideal Target</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={efficiencyData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `${val}%`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '12px' }}
                  itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  labelStyle={{ color: '#64748b', marginBottom: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area type="monotone" dataKey="active" stroke="#10b981" fillOpacity={1} fill="url(#colorActive)" strokeWidth={4} animationDuration={2000} />
                <Area type="monotone" dataKey="ideal" stroke="#334155" fill="transparent" strokeDasharray="6 6" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">Neural Alerts</h3>
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest border border-rose-500/20">4 Active</span>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {[
              { id: 1, type: 'critical', msg: 'PLC Node #45 Communication Timeout', time: '2m ago' },
              { id: 2, type: 'warning', msg: 'Omniverse® USD Mesh Sync Error', time: '14m ago' },
              { id: 3, type: 'info', msg: 'Weekly backup scheduled for 02:00 UTC', time: '1h ago' },
              { id: 4, type: 'warning', msg: 'Sensor Calibration due for Unit B', time: '3h ago' },
              { id: 5, type: 'info', msg: 'Security firmware update completed', time: '5h ago' },
            ].map(alert => (
              <div key={alert.id} className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 flex gap-4 items-start group hover:border-emerald-500/30 transition-colors">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  alert.type === 'critical' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 
                  alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-200 font-bold leading-tight group-hover:text-white transition-colors">{alert.msg}</p>
                  <p className="text-[10px] text-slate-500 mt-1.5 font-mono uppercase font-medium">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 rounded-2xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 group">
            <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" /> VIEW SECURITY LOGS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
