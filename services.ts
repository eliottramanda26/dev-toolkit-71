import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxFileSize?: number; // in bytes
  maxFiles?: number;
}

export class RotatingLogger {
  private logDir: string;
  private maxFileSize: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxFileSize = options.maxFileSize || 1024 * 1024; // Default 1MB
    this.maxFiles = options.maxFiles || 5;
    this.currentFilePath = path.join(this.logDir, 'app.log');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotate(): void {
    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = path.join(this.logDir, `app.${i}.log`);
      const newPath = path.join(this.logDir, `app.${i + 1}.log`);
      if (fs.existsSync(oldPath)) {
        if (i + 1 > this.maxFiles) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }
    if (fs.existsSync(this.currentFilePath)) {
      fs.renameSync(this.currentFilePath, path.join(this.logDir, 'app.1.log'));
    }
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [${level}] ${message}\n`;

    if (fs.existsSync(this.currentFilePath)) {
      const stats = fs.statSync(this.currentFilePath);
      if (stats.size >= this.maxFileSize) {
        this.rotate();
      }
    }

    fs.appendFileSync(this.currentFilePath, logLine, 'utf8');
  }

  public info(message: string): void { this.log('INFO', message); }
  public warn(message: string): void { this.log('WARN', message); }
  public error(message: string): void { this.log('ERROR', message); }
}