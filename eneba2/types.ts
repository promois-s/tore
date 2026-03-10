
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
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
