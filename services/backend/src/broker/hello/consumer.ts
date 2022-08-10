import { HELLO_EXCHANGE, HELLO_PLUGIN_DELAYED_EXCHANGE } from '../const/exchanges';
import { createConsumer } from '../utils/createConsumer';
import * as controller from './controller';

export const initHelloExchange = () => Promise.all([
    createConsumer(
        {
            queueName: HELLO_EXCHANGE.queues.WORLD.name,
            prefetch: 50,
            log: true,
        },
        controller.consumeHelloWorld,
    ),
    createConsumer(
        {
            queueName: HELLO_PLUGIN_DELAYED_EXCHANGE.queues.WORLD_PLUGIN_DELAYED.name,
            prefetch: 50,
            log: true,
        },
        controller.consumeHelloWorld,
    ),
]);
