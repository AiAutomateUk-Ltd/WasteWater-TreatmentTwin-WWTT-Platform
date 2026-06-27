import { useState } from 'react';

const PLANT_SIZES = ['Small (<5 MLD)', 'Medium (5-50 MLD)', 'Large (>50 MLD)'];
const MODULES = ['Digital Twin', 'IoT Sensor Fleet', 'Predictive Maintenance', 'AI Process Optimization'];

export default function SolutionConfigurator() {
  const [plantSize, setPlantSize] = useState(PLANT_SIZES[0]);
  const [selectedModules, setSelectedModules] = useState<string[]>([MODULES[0]]);

  function toggleModule(module: string) {
    setSelectedModules((prev) =>
      prev.includes(module) ? prev.filter((m) => m !== module) : [...prev, module]
    );
  }

  const estimate = 8000 + selectedModules.length * 3500 + (plantSize === PLANT_SIZES[1] ? 4000 : plantSize === PLANT_SIZES[2] ? 12000 : 0);

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Solution Configurator</h1>
      <p style={{ color: '#7d8aa0' }}>Build a tailored deployment package for your plant.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24 }}>
        <div style={{ background: '#11192b', borderRadius: 12, padding: 16, border: '1px solid #1c2738' }}>
          <h3 style={{ marginTop: 0 }}>Plant Size</h3>
          {PLANT_SIZES.map((size) => (
            <label key={size} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', cursor: 'pointer' }}>
              <input type="radio" name="plantSize" checked={plantSize === size} onChange={() => setPlantSize(size)} />
              {size}
            </label>
          ))}

          <h3 style={{ marginTop: 24 }}>Modules</h3>
          {MODULES.map((module) => (
            <label key={module} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', cursor: 'pointer' }}>
              <input type="checkbox" checked={selectedModules.includes(module)} onChange={() => toggleModule(module)} />
              {module}
            </label>
          ))}
        </div>

        <div style={{ background: '#11192b', borderRadius: 12, padding: 16, border: '1px solid #1c2738' }}>
          <h3 style={{ marginTop: 0 }}>Estimated Package</h3>
          <div style={{ fontSize: 12, color: '#7d8aa0' }}>Plant size</div>
          <div style={{ marginBottom: 12 }}>{plantSize}</div>
          <div style={{ fontSize: 12, color: '#7d8aa0' }}>Selected modules</div>
          <ul style={{ marginTop: 4 }}>
            {selectedModules.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <div style={{ fontSize: 12, color: '#7d8aa0', marginTop: 16 }}>Estimated monthly cost</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#38bdf8' }}>${estimate.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
