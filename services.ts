import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir: string;
  maxFileSize?: number; // size in bytes, defaults to 1MB
  maxFiles?: number;    // maximum backup files to keep
}

export class RotatingLogger {
  private logDir: string;
  private maxFileSize: number;
  private maxFiles: number;
  private currentFilePath: string;

  constructor(options: LoggerOptions) {
    this.logDir = options.logDir;
    this.maxFileSize = options.maxFileSize || 1024 * 1024;
    this.maxFiles = options.maxFiles || 5;
    this.currentFilePath = path.join(this.logDir, 'app.log');

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Rotates old log files sequentially when the current file size limit is reached
   */
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

  /**
   * Appends a structured log message, trigger rotation checks prior to write
   */
  public log(message: string): void {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${message}\n`;

    if (fs.existsSync(this.currentFilePath)) {
      const stats = fs.statSync(this.currentFilePath);
      if (stats.size + Buffer.byteLength(logLine) > this.maxFileSize) {
        this.rotate();
      }
    }

    fs.appendFileSync(this.currentFilePath, logLine, 'utf8');
  }
}