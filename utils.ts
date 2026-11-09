import winston from 'winston';
import 'winston-daily-rotate-file';

/**
 * Configures a rotating file logger for dev-toolkit-71
 */
export const createLogger = (serviceName: string) => {
  const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%-app.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });

  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      transport,
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ]
  });
};

export const logger = createLogger('dev-toolkit-71');