import * as fs from 'fs';
import * as path from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes?: number;
  maxFiles?: number;
}

export class RotatingLoggerService {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes ?? 1024 * 1024; // Default: 1MB
    this.maxFiles = options.maxFiles ?? 5;
    this.currentFilePath = path.join(this.logDir, 'app.log');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateLogsIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const sourcePath = path.join(this.logDir, `app.${i}.log`);
      const targetPath = path.join(this.logDir, `app.${i + 1}.log`);

      if (fs.existsSync(sourcePath)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(sourcePath);
        } else {
          fs.renameSync(sourcePath, targetPath);
        }
      }
    }

    fs.renameSync(this.currentFilePath, path.join(this.logDir, 'app.1.log'));
  }

  public log(level: LogLevel, message: string): void {
    this.rotateLogsIfNeeded();

    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;

    process.stdout.write(formattedMessage);
    fs.appendFileSync(this.currentFilePath, formattedMessage, 'utf-8');
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
}