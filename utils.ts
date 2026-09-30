import * as fs from 'fs';
import * as path from 'path';

export interface LoggerOptions {
  logDir?: string;
  maxFileSizeMB?: number;
  maxFiles?: number;
  prefix?: string;
}

export class RotatingLogger {
  private logDir: string;
  private maxSizeBytes: number;
  private maxFiles: number;
  private prefix: string;
  private currentFilePath: string;

  constructor(options: LoggerOptions = {}) {
    this.logDir = options.logDir || path.join(process.cwd(), 'logs');
    this.maxSizeBytes = (options.maxFileSizeMB || 5) * 1024 * 1024;
    this.maxFiles = options.maxFiles || 5;
    this.prefix = options.prefix || 'app';
    this.currentFilePath = path.join(this.logDir, `${this.prefix}-current.log`);

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  private rotateLogsIfNeeded(): void {
    if (!fs.existsSync(this.currentFilePath)) return;

    const stats = fs.statSync(this.currentFilePath);
    if (stats.size < this.maxSizeBytes) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivedPath = path.join(this.logDir, `${this.prefix}-${timestamp}.log`);
    fs.renameSync(this.currentFilePath, archivedPath);

    this.cleanOldLogs();
  }

  private cleanOldLogs(): void {
    const files = fs
      .readdirSync(this.logDir)
      .filter((file) => file.startsWith(this.prefix) && file.endsWith('.log') && file !== `${this.prefix}-current.log`)
      .map((file) => ({
        name: file,
        path: path.join(this.logDir, file),
        mtime: fs.statSync(path.join(this.logDir, file)).mtimeMs,
      }))
      .sort((a, b) => b.mtime - a.mtime);

    while (files.length > this.maxFiles - 1) {
      const oldest = files.pop();
      if (oldest && fs.existsSync(oldest.path)) {
        fs.unlinkSync(oldest.path);
      }
    }
  }

  public log(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
    this.rotateLogsIfNeeded();
    const entry = `[${new Date().toISOString()}] [${level}] ${message}\n`;
    fs.appendFileSync(this.currentFilePath, entry, 'utf-8');
    console.log(entry.trim());
  }

  public info(message: string): void { this.log('INFO', message); }
  public warn(message: string): void { this.log('WARN', message); }
  public error(message: string): void { this.log('ERROR', message); }
}