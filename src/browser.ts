/* eslint-disable no-console */
import { getMethodFromLevel, serialiseData } from './common';
import { LogEntry, LogLevel } from './models';

function getStyleForLevel(level: LogLevel): string {
  switch (level) {
    case 'verbose': return 'color:rgb(100,100,100);';
    case 'debug': return 'color:rgb(150,150,150);';
    case 'warning': return 'color:yellow';
    case 'error': return 'color:red';
    default: return 'color:rgb(255,255,255);';
  }
}

export function processOnBrowser(entry: LogEntry): void {
  const method = getMethodFromLevel(entry.level);
  const serialisedData = (entry.data != null ? `\n\x1b[97m${serialiseData(entry.data)}` : '');
  const category = entry.category != null ? `[${entry.category}] ` : '';
  method(`%c${category}[${entry.level.toString().padStart(7)}] ${entry.message}${serialisedData}`, getStyleForLevel(entry.level));
}