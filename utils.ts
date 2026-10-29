import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configuration for dev-toolkit-71 logger
 */
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.json()
);

export const logger: Logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    }),
    new (transports as any).DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export const logMessage = (level: 'info' | 'error' | 'warn', message: string, meta?: object): void => {
  logger.log(level, message, meta);
};