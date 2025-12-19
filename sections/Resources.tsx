
import React from 'react';
import { 
  PlayCircle, 
  BookOpen, 
  FileText, 
  ArrowUpRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const ShieldCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

const RESOURCES = [
  { 
    title: 'AiAutomateUK® PLC Optimization', 
    type: 'Video Series', 
    icon: PlayCircle, 
    color: 'emerald',
    desc: 'Proprietary techniques for reducing cycle times and improving logic efficiency in SIEMENS® & Allen Bradley® PLCs.'
  },
  { 
    title: 'Industrial SCADA Protocols 2025®', 
    type: 'Whitepaper', 
    icon: ShieldCheck, 
    color: 'blue',
    desc: 'Deep dive into AiAutomateUK® next-gen encryption and zero-trust models for industrial control networks.'
  },
  { 
    title: 'Digital Twin® Implementation', 
    type: 'Case Study', 
    icon: FileText, 
    color: 'amber',
    desc: 'How AiAutomateUK® reduced client downtime by 40% using our predictive simulation models.'
  },
  { 
    title: 'IoT Lifecycle Hub® 101', 
    type: 'E-Book', 
    icon: BookOpen, 
    color: 'indigo',
    desc: 'A comprehensive guide to managing industrial sensor fleets using the AiAutomateUK® software stack.'
  },
];

const Resources: React.FC = () => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white tracking-tight">AiAutomateUK® Knowledge Hub</h2>
          <p className="text-slate-400 text-lg">Deepen your industrial expertise with our curated technical resources.</p>
        </div>
        <button className="flex items-center gap-2 text-emerald-400 font-bold hover:underline mb-2 group">
          Browse Library <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {RESOURCES.map((resource, idx) => {
          const Icon = resource.icon;
          return (
            <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 hover:bg-slate-900/60 transition-all group flex gap-8">
              <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-${resource.color}-500/10 border border-${resource.color}-500/20 flex items-center justify-center`}>
                <Icon className={`w-8 h-8 text-${resource.color}-400`} />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest text-${resource.color}-400 mb-1 block`}>{resource.type}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{resource.title}</h3>
                  </div>
                  <button className="p-2 text-slate-600 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{resource.desc}</p>
                <button className="flex items-center gap-2 text-xs font-bold text-white hover:text-emerald-400 transition-colors uppercase tracking-widest pt-2">
                  Access Intellectual Property <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative rounded-[40px] overflow-hidden bg-slate-900 border border-slate-800 p-12 lg:p-20 mt-16 group">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <svg className="w-full h-full text-emerald-500/20" viewBox="0 0 100 100">
             <circle cx="80" cy="20" r="40" fill="currentColor" />
             <path d="M0 100 Q 50 0 100 100" stroke="currentColor" fill="none" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl space-y-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-white leading-tight">Custom AiAutomateUK® Consulting</h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              Our engineering team provides proprietary consultations and on-site training sessions for specific industrial hardware configurations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">
              Request Technical Support
            </button>
            <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all border border-slate-700">
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
