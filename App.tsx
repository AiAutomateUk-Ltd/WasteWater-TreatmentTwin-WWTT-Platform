
import React, { useState } from 'react';
import { AppSection } from './types';
import Dashboard from './sections/Dashboard';
import DigitalTwin from './sections/DigitalTwin';
import PredictiveMaintenance from './sections/PredictiveMaintenance';
import IoTManagement from './sections/IoTManagement';
import SolutionConfigurator from './sections/SolutionConfigurator';
import Resources from './sections/Resources';
import { 
  LayoutDashboard, 
  Box, 
  Zap, 
  Cpu, 
  Settings, 
  BookOpen, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { id: AppSection.DASHBOARD, name: 'Command Center', icon: LayoutDashboard },
    { id: AppSection.DIGITAL_TWIN, name: 'Digital Twin', icon: Box },
    { id: AppSection.PREDICTIVE_MAINTENANCE, name: 'AI Maintenance', icon: Zap },
    { id: AppSection.IOT_MANAGEMENT, name: 'IoT Lifecycle', icon: Cpu },
    { id: AppSection.CONFIGURATOR, name: 'Solution Designer', icon: Settings },
    { id: AppSection.RESOURCES, name: 'Knowledge Hub', icon: BookOpen },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.DASHBOARD: return <Dashboard />;
      case AppSection.DIGITAL_TWIN: return <DigitalTwin />;
      case AppSection.PREDICTIVE_MAINTENANCE: return <PredictiveMaintenance />;
      case AppSection.IOT_MANAGEMENT: return <IoTManagement />;
      case AppSection.CONFIGURATOR: return <SolutionConfigurator />;
      case AppSection.RESOURCES: return <Resources />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-start">
                AiAutomate<span className="text-emerald-400">UK</span>
                <span className="text-[10px] ml-0.5 leading-none font-bold">®</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Industrial Intelligence</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent'}
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">System Status</span>
              </div>
              <p className="text-[11px] text-slate-400">Proprietary neural nodes operational. Data integrity verified by AiAutomateUK® Security protocols.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="flex items-center justify-between px-6 py-4 bg-slate-950/50 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 lg:hidden text-slate-400 hover:text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-white">
              {navigation.find(n => n.id === activeSection)?.name}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
              <span className="text-emerald-400">LAT:</span> 51.5074° N <span className="text-emerald-400">LON:</span> 0.1278° W
            </div>
            <button className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 hover:bg-slate-900 transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10 custom-scrollbar">
          {renderSection()}
        </section>

        <footer className="px-6 py-6 bg-slate-950/50 border-t border-slate-800 text-center space-y-2">
          <p className="text-xs text-slate-300 font-semibold tracking-wide">
            © 2025 AiAutomateUK® Ltd. All rights reserved. 
          </p>
          <p className="text-[10px] text-slate-500 max-w-4xl mx-auto leading-relaxed uppercase tracking-tighter">
            AI-Driven Automation & Digital Lifecycle Management. AiAutomateUK®, the logo, and all associated marks are registered trademarks of AiAutomateUK® Ltd. 
            All other trademarks, service marks, and trade names are proprietary to their respective owners. Unauthorized use is strictly prohibited.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
