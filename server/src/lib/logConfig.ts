import winston from 'winston';
import 'winston-daily-rotate-file';

//  log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Configure the transports for logging
const transports: winston.transport[] = [];

// Console transport for development
if (process.env.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

// Daily file rotation for 
transports.push(
    new winston.transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            logFormat
        ),
    })
);

// Error log file for errors
transports.push(
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp(),
            logFormat
        ),
    })
);

// Create the Winston logger
const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports,
});

// Export the logger for use in other modules
export default logger;
