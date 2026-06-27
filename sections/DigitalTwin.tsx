import type { PlantAsset } from '../types';

const ASSETS: PlantAsset[] = [
  { id: 'a1', name: 'Influent Pump Station', type: 'Pump', status: 'online', healthScore: 96 },
  { id: 'a2', name: 'Primary Clarifier', type: 'Clarifier', status: 'online', healthScore: 91 },
  { id: 'a3', name: 'Aeration Basin 1', type: 'Aeration', status: 'warning', healthScore: 74 },
  { id: 'a4', name: 'Aeration Basin 2', type: 'Aeration', status: 'online', healthScore: 88 },
  { id: 'a5', name: 'Secondary Clarifier', type: 'Clarifier', status: 'online', healthScore: 93 },
  { id: 'a6', name: 'UV Disinfection Unit', type: 'Disinfection', status: 'offline', healthScore: 0 },
];

const STATUS_COLOR: Record<PlantAsset['status'], string> = {
  online: '#34d399',
  warning: '#fbbf24',
  offline: '#f87171',
};

export default function DigitalTwin() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Digital Twin</h1>
      <p style={{ color: '#7d8aa0' }}>Live model of plant assets and process units.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
        {ASSETS.map((asset) => (
          <div key={asset.id} style={{ background: '#11192b', borderRadius: 12, padding: 16, border: '1px solid #1c2738' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 600 }}>{asset.name}</div>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: STATUS_COLOR[asset.status],
                  display: 'inline-block',
                }}
              />
            </div>
            <div style={{ fontSize: 12, color: '#7d8aa0', marginTop: 4 }}>{asset.type}</div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, color: '#7d8aa0' }}>Health Score</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{asset.healthScore}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
