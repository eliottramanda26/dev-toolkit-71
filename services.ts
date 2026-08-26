import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxFileSizeMb: number;
}

export class RotatingLogger {
  private logFilePath: string;
  private maxBytes: number;

  constructor(options: LoggerOptions) {
    this.logFilePath = path.join(options.logDir, 'app.log');
    this.maxBytes = options.maxFileSizeMb * 1024 * 1024;
    
    if (!fs.existsSync(options.logDir)) {
      fs.mkdirSync(options.logDir, { recursive: true });
    }
  }

  public log(message: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    this.rotateIfNeeded();
    fs.appendFileSync(this.logFilePath, logEntry, 'utf8');
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.logFilePath)) {
      return;
    }

    const stats = fs.statSync(this.logFilePath);
    if (stats.size >= this.maxBytes) {
      const timestamp = Date.now();
      const rotatedPath = `${this.logFilePath}.${timestamp}`;
      fs.renameSync(this.logFilePath, rotatedPath);
    }
  }
}
