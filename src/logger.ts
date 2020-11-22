import { AnyObject, is } from 'anux-common';
import { LogEntry } from './models';

const CreateInstance = Symbol('createInstance');

interface LoggerConfig {
  category?: string;
}

export class Logger {
  private constructor(config: LoggerConfig) {
    this.#config = config;
  }

  public static [CreateInstance](config: LoggerConfig) { return new Logger(config); }

  #config: LoggerConfig;

  public error(message: string): void;
  public error(message: string, data: AnyObject): void;
  public error(error: Error): void;
  public error(error: Error, message: string): void;
  public error(error: Error, message: string, data: AnyObject): void;
  public error(...args: unknown[]): void {
    const error = args[0] instanceof Error ? args[0] : undefined;
    const message = (is.not.empty(args[0]) ? args[0] : is.not.empty(args[1]) ? args[1] : error != null
      ? error.message : undefined) ?? 'No message was provided for this log entry.';
    const data = is.plainObject(args[1]) ? args[1] : is.plainObject(args[2]) ? args[2] : undefined;
    this.process({ level: 'error', message, data });
  }

  public warning(message: string): void;
  public warning(message: string, data: AnyObject): void;
  public warning(message: string, data?: AnyObject): void {
    this.process({ level: 'warning', message, data });
  }

  public info(message: string): void;
  public info(message: string, data: AnyObject): void;
  public info(message: string, data?: AnyObject): void {
    this.process({ level: 'info', message, data });
  }

  public debug(message: string): void;
  public debug(message: string, data: AnyObject): void;
  public debug(message: string, data?: AnyObject): void {
    this.process({ level: 'debug', message, data });
  }

  public verbose(message: string): void;
  public verbose(message: string, data: AnyObject): void;
  public verbose(message: string, data?: AnyObject): void {
    this.process({ level: 'verbose', message, data });
  }

  private process(entry: LogEntry) {
    entry.category = this.#config.category;
    if (typeof (window) !== 'undefined')
      import('./browser').then(({ processOnBrowser }) => processOnBrowser(entry));
    else
      import('./node').then(({ processOnNode }) => processOnNode(entry));
  }

}

export function createLogger(config?: LoggerConfig) {
  return Logger[CreateInstance](config ?? {});
}