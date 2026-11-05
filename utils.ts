import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logDir: string;
  maxSizeMB: number;
}

export const setupLogger = (options: LoggerOptions) => {
  const logFilePath = path.join(options.logDir, 'app.log');

  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  const rotateLog = () => {
    if (fs.existsSync(logFilePath)) {
      const stats = fs.statSync(logFilePath);
      if (stats.size > options.maxSizeMB * 1024 * 1024) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        fs.renameSync(logFilePath, `${logFilePath}.${timestamp}.old`);
      }
    }
  };

  return {
    log: (message: string) => {
      rotateLog();
      const entry = `[${new Date().toISOString()}] ${message}\n`;
      fs.appendFileSync(logFilePath, entry);
    }
  };
};

export const logger = setupLogger({ logDir: './logs', maxSizeMB: 5 });