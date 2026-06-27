import type { IoTDevice } from '../types';

const DEVICES: IoTDevice[] = [
  { id: 'd1', name: 'Flow Sensor — Influent', location: 'Headworks', status: 'online', lastSeen: '2 min ago', batteryLevel: 88 },
  { id: 'd2', name: 'Turbidity Sensor — Effluent', location: 'Outfall', status: 'online', lastSeen: '1 min ago', batteryLevel: 76 },
  { id: 'd3', name: 'DO Probe — Aeration 1', location: 'Aeration Basin 1', status: 'warning', lastSeen: '14 min ago', batteryLevel: 22 },
  { id: 'd4', name: 'pH Probe — Clarifier', location: 'Primary Clarifier', status: 'online', lastSeen: '3 min ago', batteryLevel: 91 },
  { id: 'd5', name: 'Level Sensor — Sludge Tank', location: 'Sludge Holding', status: 'offline', lastSeen: '3 hr ago', batteryLevel: 4 },
];

const STATUS_COLOR: Record<IoTDevice['status'], string> = {
  online: '#34d399',
  warning: '#fbbf24',
  offline: '#f87171',
};

export default function IoTManagement() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>IoT Management</h1>
      <p style={{ color: '#7d8aa0' }}>Connected sensors and field devices across the plant.</p>

      <div style={{ background: '#11192b', borderRadius: 12, border: '1px solid #1c2738', marginTop: 24, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#7d8aa0', borderBottom: '1px solid #1c2738' }}>
              <th style={{ padding: 12 }}>Device</th>
              <th style={{ padding: 12 }}>Location</th>
              <th style={{ padding: 12 }}>Status</th>
              <th style={{ padding: 12 }}>Last Seen</th>
              <th style={{ padding: 12 }}>Battery</th>
            </tr>
          </thead>
          <tbody>
            {DEVICES.map((device) => (
              <tr key={device.id} style={{ borderBottom: '1px solid #1c2738' }}>
                <td style={{ padding: 12 }}>{device.name}</td>
                <td style={{ padding: 12, color: '#aab4c4' }}>{device.location}</td>
                <td style={{ padding: 12 }}>
                  <span style={{ color: STATUS_COLOR[device.status], textTransform: 'capitalize' }}>
                    ● {device.status}
                  </span>
                </td>
                <td style={{ padding: 12, color: '#aab4c4' }}>{device.lastSeen}</td>
                <td style={{ padding: 12, color: '#aab4c4' }}>{device.batteryLevel}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
