import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { SensorReading } from '../types';

const READINGS: SensorReading[] = Array.from({ length: 12 }, (_, i) => ({
  timestamp: `${i}:00`,
  flowRate: 1200 + Math.round(Math.sin(i / 2) * 150),
  turbidity: 4 + Math.round(Math.cos(i / 3) * 1.5 * 10) / 10,
  dissolvedOxygen: 6 + Math.round(Math.sin(i / 4) * 0.8 * 10) / 10,
  ph: 7.1 + Math.round(Math.cos(i / 5) * 0.3 * 10) / 10,
  temperature: 18 + Math.round(Math.sin(i / 6) * 2 * 10) / 10,
}));

const KPI_CARDS = [
  { label: 'Influent Flow Rate', value: '1,284 m³/h', delta: '+3.2%' },
  { label: 'Effluent Turbidity', value: '3.8 NTU', delta: '-0.4 NTU' },
  { label: 'Dissolved Oxygen', value: '6.2 mg/L', delta: 'Stable' },
  { label: 'Plant Uptime', value: '99.4%', delta: '+0.1%' },
];

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Plant Dashboard</h1>
      <p style={{ color: '#7d8aa0' }}>Real-time overview of treatment plant performance.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, margin: '24px 0' }}>
        {KPI_CARDS.map((kpi) => (
          <div key={kpi.label} style={{ background: '#11192b', borderRadius: 12, padding: 16, border: '1px solid #1c2738' }}>
            <div style={{ fontSize: 12, color: '#7d8aa0' }}>{kpi.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#38bdf8', marginTop: 4 }}>{kpi.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#11192b', borderRadius: 12, padding: 16, border: '1px solid #1c2738' }}>
        <h3 style={{ marginTop: 0 }}>Flow Rate (last 12h)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={READINGS}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1c2738" />
            <XAxis dataKey="timestamp" stroke="#7d8aa0" />
            <YAxis stroke="#7d8aa0" />
            <Tooltip contentStyle={{ background: '#172033', border: '1px solid #1c2738' }} />
            <Line type="monotone" dataKey="flowRate" stroke="#38bdf8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
