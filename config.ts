import * as winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * logger configuration for dev-toolkit-71
 * rotating logs stored daily in logs/ directory
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});