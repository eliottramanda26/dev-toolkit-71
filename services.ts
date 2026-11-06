import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxFileSizeByte?: number;
  maxFiles?: number;
}

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export class RotatingLogger {
  private logDir: string;
  private maxFileSize: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxFileSize = options.maxFileSizeByte ?? 1024 * 1024;
    this.maxFiles = options.maxFiles ?? 5;
    this.currentFilePath = path.join(this.logDir, 'app.log');
    this.ensureDir();
  }

  private ensureDir(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateLogsIfNeeded(incomingBytes: number): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size + incomingBytes < this.maxFileSize) return;

    const oldestFile = path.join(this.logDir, `app.${this.maxFiles}.log`);
    if (fs.existsSync(oldestFile)) {
      fs.unlinkSync(oldestFile);
    }

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const src = path.join(this.logDir, i === 1 ? 'app.log' : `app.${i}.log`);
      const dest = path.join(this.logDir, `app.${i + 1}.log`);
      if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
      }
    }
  }

  public log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    const bytes = Buffer.byteLength(entry, 'utf-8');

    this.rotateLogsIfNeeded(bytes);
    fs.appendFileSync(this.currentFilePath, entry, 'utf-8');
  }

  public info(message: string): void {
    this.log('info', message);
  }

  public warn(message: string): void {
    this.log('warn', message);
  }

  public error(message: string): void {
    this.log('error', message);
  }

  public debug(message: string): void {
    this.log('debug', message);
  }
}