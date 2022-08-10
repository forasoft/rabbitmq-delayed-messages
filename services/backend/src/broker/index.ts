import { logger } from '../config/logger';
import { initHelloExchange } from './hello/consumer';

export const initConsumers = async () => {
    logger.info('broker:consumers:init:start');
    await initHelloExchange();
    logger.info('broker:consumers:init:complete');
};
