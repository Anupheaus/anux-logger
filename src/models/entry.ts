import { AnyObject } from 'anux-common';

export type LogLevel = 'verbose' | 'debug' | 'info' | 'warning' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  category?: string;
  data?: AnyObject;
}
