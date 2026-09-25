import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configuration for logger instance
 * daily rotation setup with 14 day retention
 */
export const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export const logError = (msg: string, meta?: any): void => {
  logger.error(msg, { meta });
};

export const logInfo = (msg: string, meta?: any): void => {
  logger.info(msg, { meta });
};