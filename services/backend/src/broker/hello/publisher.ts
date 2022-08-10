import {
    HELLO_DELAYED_EXCHANGE,
    HELLO_EXCHANGE, HELLO_PLUGIN_DELAYED_EXCHANGE,
} from '../const/exchanges';
import { createPublisher } from '../utils/createPublisher';

const {
    name: exchangeName,
    queues: {
        WORLD,
    },
} = HELLO_EXCHANGE;

const {
    name: exchangeNameDelayed,
    queues: {
        WORLD_DELAYED,
    },
} = HELLO_DELAYED_EXCHANGE;

const {
    name: exchangeNamePluginDelayed,
    queues: {
        WORLD_PLUGIN_DELAYED,
    },
} = HELLO_PLUGIN_DELAYED_EXCHANGE;

export const publishHelloWorld = createPublisher({
    exchangeName,
    queue: WORLD,
});

export const publishHelloDelayedWorld = createPublisher({
    exchangeName: exchangeNameDelayed,
    queue: WORLD_DELAYED,
    expirationInMs: 30000, // 30s
});

export const publishHelloPluginDelayedWorld = createPublisher({
    exchangeName: exchangeNamePluginDelayed,
    queue: WORLD_PLUGIN_DELAYED,
    delayInMs: 60000, // 60s
});
