import * as fs from 'fs';
import * as path from 'path';

interface LoggerConfig {
  logDir: string;
  maxSizeMb: number;
}

export const setupLogger = (config: LoggerConfig) => {
  if (!fs.existsSync(config.logDir)) {
    fs.mkdirSync(config.logDir, { recursive: true });
  }

  const logPath = path.join(config.logDir, 'app.log');

  const rotateLogs = () => {
    if (fs.existsSync(logPath)) {
      const stats = fs.statSync(logPath);
      if (stats.size > config.maxSizeMb * 1024 * 1024) {
        const timestamp = new Date().getTime();
        fs.renameSync(logPath, path.join(config.logDir, `app-${timestamp}.log`));
      }
    }
  };

  return (message: string) => {
    rotateLogs();
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logPath, entry);
  };
};