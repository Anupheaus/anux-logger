import { getMethodFromLevel, serialiseData } from './common';
import { LogEntry, LogLevel } from './models';
import chalk from 'chalk';

function getColourForLevel(level: LogLevel) {
  switch (level) {
    case 'verbose': return chalk.rgb(100, 100, 100);
    case 'debug': return chalk.rgb(150, 150, 150);
    case 'warning': return chalk.yellow;
    case 'error': return chalk.red;
    default: return chalk.rgb(255, 255, 255);
  }
}

export function processOnNode(entry: LogEntry): void {
  const method = getMethodFromLevel(entry.level);
  const serialisedData = (entry.data != null ? `\n\x1b[39m${serialiseData(entry.data, '\x1b[39m')}` : '');
  const category = entry.category != null ? `[${entry.category}] ` : '';
  const level = `[${entry.level.toString().padStart(7)}]`;
  method(getColourForLevel(entry.level)(`${category}${level} ${entry.message}${serialisedData}`));
}
