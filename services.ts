import * as fs from 'fs';
import * as path from 'path';

interface LoggerOptions {
  logDir: string;
  maxSizeMB: number;
}

export const setupLogger = (options: LoggerOptions) => {
  const logFile = path.join(options.logDir, 'app.log');

  if (!fs.existsSync(options.logDir)) {
    fs.mkdirSync(options.logDir, { recursive: true });
  }

  const rotateLogs = () => {
    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      if (stats.size > options.maxSizeMB * 1024 * 1024) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        fs.renameSync(logFile, path.join(options.logDir, `app-${timestamp}.log`));
      }
    }
  };

  return {
    log: (message: string) => {
      rotateLogs();
      const entry = `[${new Date().toISOString()}] ${message}\n`;
      fs.appendFileSync(logFile, entry);
    }
  };
};

export const logger = setupLogger({
  logDir: './logs',
  maxSizeMB: 5
});