/* eslint-disable no-console */
import { LogLevel } from './models';
import { stringify } from 'jsan';
import { AnyObject } from 'anux-common';

export function getMethodFromLevel(level: LogLevel) {
  switch (level) {
    case 'verbose': return console.debug;
    case 'debug': return console.debug;
    case 'info': return console.log;
    case 'warning': return console.warn;
    case 'error': return console.error;
    default: return console.log;
  }
}

export function serialiseData(data: AnyObject, endingCode = '\x1b[97m'): string {
  return stringify(data, (key, value) => {
    if (value === undefined) return `<<\x1b[90mundefined${endingCode}>>`;
    if (value === null) return `<<\x1b[90mnull${endingCode}>>`;
    if (typeof (value) === 'number') return `<<\x1b[36m${value}${endingCode}>>`;
    if (typeof (value) === 'string') return `<<\x1b[33m"${value}"${endingCode}>>`;
    if (typeof (value) === 'boolean') return `<<\x1b[32m${value}${endingCode}>>`;
    return value;
  }, 2)
    .replace(/\\u001b\[/gm, '\x1b[') // replace codes that seem to get muddled
    .replace(/($\s+)"([^"]+)":/gm, '$1$2:') // remove quotes from property names
    .replace(/"<</gm, '') // remove quote before <<
    .replace(/>>"/gm, '') // remove quote after >>
    .replace(/\\"/gm, '"'); // replace escaped quote with quote;
}
