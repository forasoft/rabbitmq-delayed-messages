import { IExchange } from '../../../types/broker';

export const HELLO_EXCHANGE = Object.freeze({
    name: 'hello',
    type: 'direct',
    options: {
        durable: true,
    },
    queues: {
        WORLD: {
            name: 'hello.world',
            binding: 'hello.world',
            options: {
                durable: true,
            },
        },
    },
}) as IExchange;

export const HELLO_DELAYED_EXCHANGE = Object.freeze({
    name: 'helloDelayed',
    type: 'direct',
    options: {
        durable: true,
        queueMode: 'lazy',
    },
    queues: {
        WORLD_DELAYED: {
            name: 'helloDelayed.world',
            binding: 'hello.world',
            options: {
                durable: true,
                queueMode: 'lazy',
                arguments: {
                    'x-dead-letter-exchange': HELLO_EXCHANGE.name,
                },
            },
        },
    },
}) as IExchange;

export const HELLO_PLUGIN_DELAYED_EXCHANGE = Object.freeze({
    name: 'helloPluginDelayed',
    type: 'x-delayed-message',
    options: {
        durable: true,
        arguments: {
            'x-delayed-type': 'direct',
        },
    },
    queues: {
        WORLD_PLUGIN_DELAYED: {
            name: 'helloPluginDelayed.world',
            binding: 'helloPluginDelayed.world',
            options: {
                durable: true,
            },
        },
    },
}) as IExchange;
