export type SectionId =
  | 'dashboard'
  | 'digital-twin'
  | 'iot-management'
  | 'predictive-maintenance'
  | 'solution-configurator'
  | 'resources';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface SensorReading {
  timestamp: string;
  flowRate: number;
  turbidity: number;
  dissolvedOxygen: number;
  ph: number;
  temperature: number;
}

export type AssetStatus = 'online' | 'warning' | 'offline';

export interface PlantAsset {
  id: string;
  name: string;
  type: string;
  status: AssetStatus;
  healthScore: number;
}

export interface IoTDevice {
  id: string;
  name: string;
  location: string;
  status: AssetStatus;
  lastSeen: string;
  batteryLevel: number;
}

export interface MaintenanceForecast {
  assetId: string;
  assetName: string;
  failureRisk: number;
  predictedWindow: string;
  recommendation: string;
}
