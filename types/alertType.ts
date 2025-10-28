type AlertModeType = 'success' | 'info' | 'warning' | 'error';

export interface AlertType {
  isExists: boolean;
  content?: string;
  status?: number;
  type?: AlertModeType;
}
