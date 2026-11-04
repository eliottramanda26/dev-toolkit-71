import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Logger configuration for dev-toolkit-71
 * Uses daily file rotation to maintain storage constraints
 */
const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/toolkit-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    transport
  ]
});