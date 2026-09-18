import { createLogger, format, transports, Logger } from 'winston';
import 'winston-daily-rotate-file';
import { resolve } from 'path';

const logDir = resolve(__dirname, '../logs');

/**
 * Daily rotation transport configuration
 * Keeps files for 14 days and max size of 20MB
 */
const transport = new (transports as any).DailyRotateFile({
  filename: `${logDir}/app-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

export const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'dev-toolkit-71' },
  transports: [
    transport,
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});