
import React from 'react';
import { DeviceStatus } from '../types';
import { 
  Signal, 
  SignalLow, 
  Battery, 
  BatteryLow, 
  Search, 
  Filter, 
  MoreVertical,
  Plus,
  ArrowRight
} from 'lucide-react';

const MOCK_DEVICES: DeviceStatus[] = [
  { id: 'IOT-001-X', name: 'Assembly Line Conveyor', status: 'online', battery: 92, lastSeen: 'Just now' },
  { id: 'IOT-042-Y', name: 'Hydraulic Press B', status: 'online', battery: 14, lastSeen: '3m ago' },
  { id: 'IOT-099-Z', name: 'Climate Control Unit', status: 'warning', battery: 45, lastSeen: '12m ago' },
  { id: 'IOT-101-A', name: 'Secondary Storage Pump', status: 'offline', battery: 0, lastSeen: '4h ago' },
  { id: 'IOT-220-B', name: 'Valve Monitor 02', status: 'online', battery: 78, lastSeen: '1m ago' },
];

const IoTManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search devices by ID or Name..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
            <Plus className="w-4 h-4" /> Add Device
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Device Details</th>
                <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Connectivity</th>
                <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Battery</th>
                <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Last Check-in</th>
                <th className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DEVICES.map((device) => (
                <tr key={device.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{device.name}</span>
                      <span className="text-xs text-slate-500 font-mono mt-1">{device.id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                        device.status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : 
                        device.status === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                      }`}>
                        {device.status === 'online' ? <Signal className="w-4 h-4" /> : <SignalLow className="w-4 h-4" />}
                      </div>
                      <span className={`text-sm font-medium capitalize ${
                        device.status === 'online' ? 'text-emerald-400' : 
                        device.status === 'warning' ? 'text-amber-500' : 'text-rose-500'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1 ${device.battery < 20 ? 'text-rose-400' : 'text-slate-300'}`}>
                        {device.battery < 20 ? <BatteryLow className="w-4 h-4" /> : <Battery className="w-4 h-4" />}
                        <span className="text-sm font-mono">{device.battery}%</span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            device.battery < 20 ? 'bg-rose-500' : 
                            device.battery < 50 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`} 
                          style={{ width: `${device.battery}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-slate-400 font-mono">{device.lastSeen}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-950/30 flex justify-between items-center">
          <p className="text-xs text-slate-500">Showing {MOCK_DEVICES.length} active nodes out of 124 total across facility.</p>
          <button className="flex items-center gap-2 text-sm text-emerald-400 font-bold hover:underline">
            Manage All Assets <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IoTManagement;
