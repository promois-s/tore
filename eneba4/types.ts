
export interface TelegramResponse {
  ok: boolean;
  result?: any;
  description?: string;
}

export interface IpInfo {
  ip: string;
}

export enum SubmissionStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  VERIFYING = 'VERIFYING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
