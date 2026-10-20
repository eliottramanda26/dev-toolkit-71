import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
  logToConsole?: boolean;
}

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private logToConsole: boolean;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    this.logToConsole = options.logToConsole ?? true;
    this.currentFilePath = path.join(this.logDir, 'app.log');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateLogs(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldFile = path.join(this.logDir, `app.${i}.log`);
      const newFile = path.join(this.logDir, `app.${i + 1}.log`);
      if (fs.existsSync(oldFile)) {
        if (i === this.maxFiles - 1) {
          fs.unlinkSync(oldFile);
        } else {
          fs.renameSync(oldFile, newFile);
        }
      }
    }

    fs.renameSync(this.currentFilePath, path.join(this.logDir, 'app.1.log'));
  }

  public log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    const meta = context ? ` ${JSON.stringify(context)}` : '';
    const entry = `[${timestamp}] [${level.toUpperCase()}] ${message}${meta}\n`;

    if (this.logToConsole) {
      process.stdout.write(entry);
    }

    this.rotateLogs();
    fs.appendFileSync(this.currentFilePath, entry, 'utf-8');
  }

  public info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  public error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }

  public debug(message: string, context?: Record<string, unknown>): void {
    this.log('debug', message, context);
  }
}