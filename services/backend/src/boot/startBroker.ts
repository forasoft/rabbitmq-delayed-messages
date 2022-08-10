import { initExchanges } from '../broker/utils/initExchanges';
import { logger } from '../config/logger';
import { initConsumers } from '../broker';

export const startBroker = async () => {
    logger.info('boot:broker:start');
    await initExchanges();
    await initConsumers();
    logger.info('boot:broker:completed');
};
