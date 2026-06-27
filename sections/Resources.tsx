
const RESOURCES = [
  { title: 'Platform Overview', description: 'Architecture and capabilities of the WWTT digital twin platform.' },
  { title: 'Sensor Integration Guide', description: 'Connecting third-party IoT sensors via Modbus/MQTT.' },
  { title: 'Predictive Maintenance Models', description: 'How failure risk scores are calculated and tuned.' },
  { title: 'Compliance & Reporting', description: 'Generating regulatory discharge reports from plant data.' },
];

export default function Resources() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Resources</h1>
      <p style={{ color: '#7d8aa0' }}>Documentation and guides for operating the platform.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 24 }}>
        {RESOURCES.map((resource) => (
          <div key={resource.title} style={{ background: '#11192b', borderRadius: 12, padding: 16, border: '1px solid #1c2738' }}>
            <div style={{ fontWeight: 600 }}>{resource.title}</div>
            <p style={{ fontSize: 14, color: '#aab4c4', marginTop: 8 }}>{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
