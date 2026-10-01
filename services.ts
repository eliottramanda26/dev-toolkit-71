import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  logDir: string;
  maxSize: number;
}

/**
 * Manages application logging with file rotation
 */
export class LoggerService {
  private readonly logPath: string;
  private readonly maxSize: number;

  constructor(config: LoggerConfig) {
    this.logPath = path.join(config.logDir, 'app.log');
    this.maxSize = config.maxSize;

    if (!fs.existsSync(config.logDir)) {
      fs.mkdirSync(config.logDir, { recursive: true });
    }
  }

  private rotate(): void {
    const backupPath = `${this.logPath}.old`;
    if (fs.existsSync(this.logPath)) {
      fs.renameSync(this.logPath, backupPath);
    }
  }

  public log(message: string): void {
    try {
      if (fs.existsSync(this.logPath) && fs.statSync(this.logPath).size > this.maxSize) {
        this.rotate();
      }

      const entry = `[${new Date().toISOString()}] ${message}\n`;
      fs.appendFileSync(this.logPath, entry);
    } catch (err) {
      console.error('Logging failure:', err);
    }
  }
}