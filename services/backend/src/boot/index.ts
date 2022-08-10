import { logger } from '../config/logger';
import { startBroker } from './startBroker';
import { emitDelayedMessages } from './emitDelayedMessages';

export const runBootTasks = async () => {
    logger.info('BootTasks:running:start');
    // connect to broker and create exchanges with queues
    await startBroker();
    // publish messages to broker
    await emitDelayedMessages();
    logger.info('BootTasks:running:complete');
};
