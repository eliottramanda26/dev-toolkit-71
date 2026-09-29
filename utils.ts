import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * dev-toolkit-71 logger setup with daily file rotation
 * ensures log persistence while managing disk usage
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export interface LogMetadata {
  correlationId?: string;
  userId?: string;
  [key: string]: any;
}

export const logInfo = (message: string, meta?: LogMetadata) => {
  logger.info(message, meta);
};