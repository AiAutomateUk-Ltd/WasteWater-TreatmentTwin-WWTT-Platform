import React, { useState } from 'react';
import {
  LayoutDashboard,
  Boxes,
  Wifi,
  Wrench,
  Settings2,
  BookOpen,
  Droplets,
} from 'lucide-react';
import type { NavItem, SectionId } from './types';
import Dashboard from './sections/Dashboard';
import DigitalTwin from './sections/DigitalTwin';
import IoTManagement from './sections/IoTManagement';
import PredictiveMaintenance from './sections/PredictiveMaintenance';
import SolutionConfigurator from './sections/SolutionConfigurator';
import Resources from './sections/Resources';

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'digital-twin', label: 'Digital Twin' },
  { id: 'iot-management', label: 'IoT Management' },
  { id: 'predictive-maintenance', label: 'Predictive Maintenance' },
  { id: 'solution-configurator', label: 'Solution Configurator' },
  { id: 'resources', label: 'Resources' },
];

const ICONS: Record<SectionId, React.ComponentType<{ size?: number }>> = {
  dashboard: LayoutDashboard,
  'digital-twin': Boxes,
  'iot-management': Wifi,
  'predictive-maintenance': Wrench,
  'solution-configurator': Settings2,
  resources: BookOpen,
};

const SECTIONS: Record<SectionId, React.ComponentType> = {
  dashboard: Dashboard,
  'digital-twin': DigitalTwin,
  'iot-management': IoTManagement,
  'predictive-maintenance': PredictiveMaintenance,
  'solution-configurator': SolutionConfigurator,
  resources: Resources,
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard');
  const ActiveSection = SECTIONS[activeSection];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0b1220', color: '#e6edf3' }}>
      <aside
        style={{
          width: 240,
          flexShrink: 0,
          borderRight: '1px solid #1c2738',
          padding: '24px 12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px 24px' }}>
          <Droplets size={24} color="#38bdf8" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>WWTT</div>
            <div style={{ fontSize: 11, color: '#7d8aa0' }}>Treatment Digital Twin</div>
          </div>
        </div>
        <nav>
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.id];
            const isActive = item.id === activeSection;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  padding: '10px 12px',
                  marginBottom: 4,
                  borderRadius: 8,
                  border: 'none',
                  background: isActive ? '#172033' : 'transparent',
                  color: isActive ? '#38bdf8' : '#aab4c4',
                  cursor: 'pointer',
                  fontSize: 14,
                  textAlign: 'left',
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <ActiveSection />
      </main>
    </div>
  );
}
