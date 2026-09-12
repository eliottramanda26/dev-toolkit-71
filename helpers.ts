import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  logDir: string;
  maxSizeMb: number;
}

/**
 * Manages log file rotation based on size
 */
export const setupLogger = (config: LoggerConfig) => {
  const logPath = path.join(config.logDir, 'app.log');

  if (!fs.existsSync(config.logDir)) {
    fs.mkdirSync(config.logDir, { recursive: true });
  }

  return (message: string) => {
    const entry = `[${new Date().toISOString()}] ${message}\n`;

    if (fs.existsSync(logPath)) {
      const stats = fs.statSync(logPath);
      const fileSizeMb = stats.size / (1024 * 1024);

      if (fileSizeMb >= config.maxSizeMb) {
        const timestamp = Date.now();
        fs.renameSync(logPath, `${logPath}.${timestamp}.bak`);
      }
    }

    fs.appendFileSync(logPath, entry);
  };
};

export const logger = setupLogger({ 
  logDir: './logs', 
  maxSizeMb: 5 
});