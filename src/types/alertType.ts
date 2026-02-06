type AlertModeType = 'success' | 'info' | 'warning' | 'error';

export interface AlertType {
  content: string;
  status?: number;
  type: AlertModeType;
}
