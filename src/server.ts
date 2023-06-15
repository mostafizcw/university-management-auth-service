import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';
import { logger, errorlogger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  // console.log('Uncaught Exception is detected...');
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database is connected');
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error(err);
    errorlogger.error('failed to connect');
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGNTERM is received');
  if (server) {
    server.close();
  }
});
