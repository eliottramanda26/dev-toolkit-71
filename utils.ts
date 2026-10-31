import * as fs from 'fs';
import * as path from 'path';

/**
 * Minimal logger with file rotation support
 * Keeps up to 5 log files of 1MB each
 */
export class Logger {
  private logPath: string;
  private maxSize: number = 1024 * 1024;

  constructor(logPath: string) {
    this.logPath = logPath;
  }

  public log(message: string): void {
    this.rotateIfNeeded();
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(this.logPath, entry);
  }

  private rotateIfNeeded(): void {
    if (!fs.existsSync(this.logPath)) return;

    const stats = fs.statSync(this.logPath);
    if (stats.size > this.maxSize) {
      this.performRotation();
    }
  }

  private performRotation(): void {
    for (let i = 4; i >= 1; i--) {
      const oldFile = i === 1 ? this.logPath : `${this.logPath}.${i - 1}`;
      const newFile = `${this.logPath}.${i}`;
      if (fs.existsSync(oldFile)) {
        fs.renameSync(oldFile, newFile);
      }
    }
  }
}