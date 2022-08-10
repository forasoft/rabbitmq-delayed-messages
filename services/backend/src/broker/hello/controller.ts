import { IBrokerHandler } from '../../../types/broker';
import { world } from '../../services/hello/world';
import { logger } from '../../config/logger';

export const consumeHelloWorld: IBrokerHandler = async ({ payload }) => {
    const result = await world({ name: payload.name });
    logger.info(result.message);
};
