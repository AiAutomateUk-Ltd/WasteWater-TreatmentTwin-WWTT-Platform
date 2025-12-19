
import React, { useState, useMemo } from 'react';
import { analyzePredictiveMaintenance } from '../geminiService';
import { MaintenanceReport } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea
} from 'recharts';
import { 
  Cpu, 
  BrainCircuit, 
  CheckCircle2, 
  Loader2,
  RefreshCcw,
  Zap,
  Gauge,
  History,
  Clock,
  Calendar,
  Activity,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const MOCK_SENSORS = [
  { sensor: 'Vibration-X', value: '4.2', unit: 'mm/s', status: 'normal' },
  { sensor: 'Bearing Temp', value: '72.4', unit: '°C', status: 'warning' },
  { sensor: 'Lubricant pH', value: '6.8', unit: 'pH', status: 'normal' },
  { sensor: 'Motor Load', value: '88', unit: '%', status: 'warning' },
];

// Generate 24 hours of mock historical data (15-minute intervals = 96 points)
const GENERATED_HISTORY = Array.from({ length: 96 }).map((_, i) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - (95 - i) * 15);
  // Base temp around 68, with some noise, and a spike at the end
  const base = 68;
  const noise = Math.random() * 2;
  const trend = i > 80 ? (i - 80) * 0.4 : 0; 
  return {
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    fullTime: date.toLocaleString('en-GB'),
    temp: parseFloat((base + noise + trend).toFixed(1)),
  };
});

const PredictiveMaintenance: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MaintenanceReport | null>(null);
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('24h');

  const filteredHistory = useMemo(() => {
    const points = timeRange === '1h' ? 4 : timeRange === '6h' ? 24 : 96;
    return GENERATED_HISTORY.slice(-points);
  }, [timeRange]);

  const stats = useMemo(() => {
    const values = filteredHistory.map(d => d.temp);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return { max, min, avg: avg.toFixed(1) };
  }, [filteredHistory]);

  const handleAnalysis = async () => {
    setLoading(true);
    const result = await analyzePredictiveMaintenance(MOCK_SENSORS);
    if (result) {
      result.timestamp = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', '');
    }
    setReport(result);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900/40 border border-slate-800 p-8 rounded-[32px]">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Predictive Maintenance Analysis®</h2>
          <p className="text-slate-400 max-w-lg">
            Leverage AiAutomateUK® powered by Gemini 2.5 Flash to analyze real-time sensor streams and predict potential failures before they occur.
          </p>
        </div>
        <button 
          onClick={handleAnalysis}
          disabled={loading}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20 shrink-0"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
          {loading ? 'Analyzing Neural Patterns...' : 'Run Diagnostic Scan'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sensor Grid */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Real-time Ingest
            </h3>
            <div className="space-y-4">
              {MOCK_SENSORS.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex justify-between items-center group hover:border-emerald-500/30 transition-colors">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{s.sensor}</p>
                    <p className="text-xl font-bold text-white">{s.value} <span className="text-sm font-normal text-slate-500">{s.unit}</span></p>
                  </div>
                  <div className={`p-2 rounded-lg ${s.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <Gauge className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">
              <RefreshCcw className="w-3 h-3" /> Refresh Streams
            </button>
          </div>

          {/* New Statistics Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Thermal Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-bold mb-1">PEAK</p>
                <p className="text-lg font-bold text-white font-mono">{stats.max}°</p>
              </div>
              <div className="text-center border-x border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold mb-1">AVG</p>
                <p className="text-lg font-bold text-white font-mono">{stats.avg}°</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-bold mb-1">MIN</p>
                <p className="text-lg font-bold text-white font-mono">{stats.min}°</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Output and Historical Chart */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Historical Chart Component */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 transition-all hover:bg-slate-900/60 shadow-xl shadow-black/20 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-emerald-400" />
                  Bearing Thermal Analysis
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-3 h-3 text-emerald-500" />
                  <p className="text-xs text-slate-400 tracking-wide font-mono">SENSOR: BT-NODE-042 (LIVE)</p>
                </div>
              </div>
              <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
                {(['1h', '6h', '24h'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      timeRange === range 
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredHistory}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    interval={timeRange === '24h' ? 12 : timeRange === '6h' ? 4 : 0}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    domain={['65', '80']}
                    tickFormatter={(val) => `${val}°`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', fontSize: '11px' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                    labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                    cursor={{ stroke: '#334155', strokeWidth: 1 }}
                    formatter={(value: any) => [`${value}°C`, 'Temperature']}
                  />
                  {/* Warning Area Highlight */}
                  <ReferenceArea y1={72} y2={80} fill="#f59e0b" fillOpacity={0.05} />
                  <ReferenceLine y={72} label={{ position: 'right', value: 'WARNING', fill: '#f59e0b', fontSize: 10, fontWeight: 'bold' }} stroke="#f59e0b" strokeDasharray="3 3" />
                  
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorTemp)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex items-start gap-4 px-4 py-3 bg-slate-950/50 border border-slate-800 rounded-2xl">
              <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5" />
              <div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  <span className="text-emerald-400 font-bold uppercase mr-2 tracking-widest">AiAutomateUK® Trend Intelligence:</span> 
                  The {timeRange} window shows a <span className="text-emerald-400 font-bold">+{((parseFloat(stats.max) - parseFloat(stats.min))).toFixed(1)}°C variance</span>. 
                  {parseFloat(stats.max) > 72 ? " Thermal escalation detected beyond safe operational baseline." : " Temperature remains stable within designed tolerances."}
                </p>
              </div>
            </div>
          </div>

          {/* AI Output */}
          {report ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-2xl shadow-emerald-500/5">
              <div className="p-8 border-b border-slate-800 bg-emerald-500/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-emerald-500/10 rounded-2xl">
                        <Zap className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">AiAutomateUK® Diagnostic Report</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-1 ml-1 text-[11px] text-slate-500 font-mono tracking-tighter uppercase font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-600" />
                      <span>Scan ID: <span className="text-slate-400">#{(Math.random() * 10000).toFixed(0)}</span></span>
                      <span className="mx-1 text-slate-700">|</span>
                      <span>Analysis Time: <span className="text-emerald-400/80">{report.timestamp}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="px-4 py-2 rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5" />
                      Confidence: {report.confidence}%
                    </div>
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.2em]">Validated by Gemini® 2.5</span>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800/50 mb-2">
                  <p className="text-lg text-slate-200 leading-relaxed font-medium">
                    {report.prediction}
                  </p>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    AiAutomateUK® Recommended Actions
                  </h4>
                  <div className="h-px flex-1 bg-slate-800 mx-6 opacity-30" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800 hover:bg-slate-900/50 hover:border-emerald-500/20 transition-all group/item">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover/item:scale-110 transition-transform" />
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed group-hover/item:text-white transition-colors">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-[32px] p-12 text-center group">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <BrainCircuit className="w-10 h-10 text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">Awaiting Neural Diagnostic</h3>
              <p className="text-slate-500 max-w-sm">
                Connect your industrial sensors and trigger an AiAutomateUK® diagnostic scan to receive AI-powered maintenance forecasts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictiveMaintenance;
