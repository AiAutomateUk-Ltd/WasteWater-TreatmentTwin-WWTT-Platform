import { useState } from 'react';
import type { MaintenanceForecast } from '../types';
import { explainMaintenanceForecast } from '../geminiService';

const FORECASTS: MaintenanceForecast[] = [
  {
    assetId: 'a3',
    assetName: 'Aeration Basin 1 Blower',
    failureRisk: 68,
    predictedWindow: '7-14 days',
    recommendation: 'Inspect bearing vibration and lubrication levels.',
  },
  {
    assetId: 'a6',
    assetName: 'UV Disinfection Unit',
    failureRisk: 92,
    predictedWindow: '0-3 days',
    recommendation: 'Replace UV lamp ballast; unit currently offline.',
  },
  {
    assetId: 'a1',
    assetName: 'Influent Pump Station',
    failureRisk: 31,
    predictedWindow: '30-45 days',
    recommendation: 'Schedule routine impeller wear check.',
  },
];

export default function PredictiveMaintenance() {
  const [insights, setInsights] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleExplain(forecast: MaintenanceForecast) {
    setLoadingId(forecast.assetId);
    try {
      const text = await explainMaintenanceForecast(
        forecast.assetName,
        forecast.failureRisk,
        forecast.recommendation
      );
      setInsights((prev) => ({ ...prev, [forecast.assetId]: text }));
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Predictive Maintenance</h1>
      <p style={{ color: '#7d8aa0' }}>AI-assisted failure risk forecasts for critical assets.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        {FORECASTS.map((forecast) => (
          <div key={forecast.assetId} style={{ background: '#11192b', borderRadius: 12, padding: 16, border: '1px solid #1c2738' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{forecast.assetName}</div>
                <div style={{ fontSize: 12, color: '#7d8aa0', marginTop: 4 }}>
                  Predicted window: {forecast.predictedWindow}
                </div>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  color: forecast.failureRisk > 60 ? '#f87171' : forecast.failureRisk > 35 ? '#fbbf24' : '#34d399',
                }}
              >
                {forecast.failureRisk}% risk
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#aab4c4', marginTop: 12 }}>{forecast.recommendation}</p>
            <button
              onClick={() => handleExplain(forecast)}
              disabled={loadingId === forecast.assetId}
              style={{
                marginTop: 8,
                background: '#172033',
                color: '#38bdf8',
                border: '1px solid #1c2738',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {loadingId === forecast.assetId ? 'Generating insight...' : 'Explain with AI'}
            </button>
            {insights[forecast.assetId] && (
              <p style={{ fontSize: 13, color: '#e6edf3', marginTop: 12, background: '#0b1220', padding: 12, borderRadius: 8 }}>
                {insights[forecast.assetId]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
