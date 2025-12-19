
import React, { useState } from 'react';
import { configureAutomationSolution } from '../geminiService';
import { AutomationSolution } from '../types';
import { 
  Sparkles, 
  Lightbulb, 
  Workflow, 
  TrendingUp, 
  Settings, 
  Loader2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const SolutionConfigurator: React.FC = () => {
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<AutomationSolution | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requirements.trim()) return;
    setLoading(true);
    const result = await configureAutomationSolution(requirements);
    setSolution(result);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3" /> AI Solution Architect®
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">Design Your Future Factory with AiAutomateUK®</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Describe your industrial challenges and our expert Gemini-powered architect will draft a bespoke AiAutomateUK® automation roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/40 border border-slate-800 p-8 rounded-[32px]">
          <div className="space-y-4">
            <label className="text-lg font-bold text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-emerald-400" />
              Project Requirements
            </label>
            <textarea 
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Example: We need a scalable PLC solution for a multi-stage food processing line that integrates with our existing SAP ERP and handles real-time weight validation..."
              className="w-full h-48 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                <option>High Throughput</option>
                <option>Energy Efficiency</option>
                <option>Maximum Safety</option>
                <option>Cost Reduction</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Timeframe</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                <option>3-6 Months</option>
                <option>6-12 Months</option>
                <option>1-2 Years</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading || !requirements}
            className="w-full py-4 bg-white hover:bg-slate-100 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-2xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lightbulb className="w-5 h-5" />}
            {loading ? 'Consulting AiAutomateUK® AI...' : 'Generate Solution Proposal'}
          </button>
        </form>

        <div className="space-y-8">
          {solution ? (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] overflow-hidden animate-in zoom-in-95 duration-700">
              <div className="p-8 border-b border-emerald-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-emerald-500 rounded-2xl">
                    <ShieldCheck className="w-6 h-6 text-slate-950" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {solution.description}
                </p>
              </div>
              
              <div className="p-8 space-y-8 bg-slate-950/30">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Proprietary Components
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {solution.components.map((comp, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-white text-sm uppercase tracking-widest">AiAutomateUK® ROI Estimate</h4>
                  </div>
                  <p className="text-emerald-400 font-bold text-lg">{solution.estimatedROI}</p>
                </div>

                <button className="w-full py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2">
                  Download Proprietary Blueprint <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col gap-6">
              <div className="p-8 bg-slate-900/20 border border-slate-800 rounded-3xl opacity-50 grayscale">
                <div className="w-12 h-12 bg-slate-800 rounded-xl mb-4" />
                <div className="h-4 w-3/4 bg-slate-800 rounded-lg mb-2" />
                <div className="h-4 w-1/2 bg-slate-800 rounded-lg" />
              </div>
              <div className="p-8 bg-slate-900/20 border border-slate-800 rounded-3xl opacity-30 grayscale scale-95">
                <div className="w-12 h-12 bg-slate-800 rounded-xl mb-4" />
                <div className="h-4 w-full bg-slate-800 rounded-lg mb-2" />
                <div className="h-4 w-2/3 bg-slate-800 rounded-lg" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolutionConfigurator;
