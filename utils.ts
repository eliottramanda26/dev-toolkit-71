import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { resolve } from 'path';

/**
 * Configuration for application logging with daily rotation
 */
const logDirectory = resolve(__dirname, '../logs');

const transport = new winston.transports.DailyRotateFile({
  dirname: logDirectory,
  filename: 'dev-toolkit-%DATE%.log',
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
    transport,
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});