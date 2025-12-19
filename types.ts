
export enum AppSection {
  DASHBOARD = 'DASHBOARD',
  DIGITAL_TWIN = 'DIGITAL_TWIN',
  PREDICTIVE_MAINTENANCE = 'PREDICTIVE_MAINTENANCE',
  IOT_MANAGEMENT = 'IOT_MANAGEMENT',
  CONFIGURATOR = 'CONFIGURATOR',
  RESOURCES = 'RESOURCES'
}

export interface DeviceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  battery: number;
  lastSeen: string;
}

export interface MaintenanceReport {
  timestamp: string;
  prediction: string;
  confidence: number;
  recommendations: string[];
}

export interface AutomationSolution {
  title: string;
  description: string;
  components: string[];
  estimatedROI: string;
}

export interface EngineeringConflict {
  type: 'Mechanical' | 'Logical' | 'Physics';
  severity: 'Critical' | 'Warning' | 'Info';
  description: string;
  mitigation: string;
}

export interface DesignValidation {
  status: 'Safe' | 'At Risk' | 'Violation';
  conflicts: EngineeringConflict[];
  efficiencyScore: number;
}
