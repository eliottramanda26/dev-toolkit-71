import * as fs from 'node:fs';
import * as path from 'node:path';

export interface LoggerOptions {
  logDir: string;
  maxSizeBytes: number;
  maxFiles: number;
}

export class RotatingLoggerService {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxSizeBytes = options.maxSizeBytes;
    this.maxFiles = options.maxFiles;
    this.currentFilePath = path.join(this.logDir, 'app.log');
    this.ensureDirectory();
  }

  private ensureDirectory(): void {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldPath = path.join(this.logDir, `app.${i}.log`);
      const newPath = path.join(this.logDir, `app.${i + 1}.log`);
      if (fs.existsSync(oldPath)) {
        if (i === this.maxFiles - 1) {
          fs.unlinkSync(oldPath);
        } else {
          fs.renameSync(oldPath, newPath);
        }
      }
    }

    fs.renameSync(this.currentFilePath, path.join(this.logDir, 'app.1.log'));
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    this.rotateIfNeeded();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] [${level}]: ${message}\n`;
    fs.appendFileSync(this.currentFilePath, entry, 'utf-8');
  }

  public info(message: string): void {
    this.log('INFO', message);
  }

  public error(message: string): void {
    this.log('ERROR', message);
  }
}