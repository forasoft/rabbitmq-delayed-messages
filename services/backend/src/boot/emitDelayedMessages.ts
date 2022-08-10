import { publishHelloDelayedWorld, publishHelloPluginDelayedWorld, publishHelloWorld } from '../broker/hello/publisher';

export const emitDelayedMessages = async () => {
    await publishHelloWorld({
        name: 'message without delay',
    });
    await publishHelloDelayedWorld({
        name: 'message without plugin with 5s delay',
    }, {
        expirationInMs: 5000,
    });
    await publishHelloDelayedWorld({
        name: 'message without plugin with 1s delay',
    }, {
        expirationInMs: 1000,
    });
    await publishHelloPluginDelayedWorld({
        name: 'message with plugin with 5s delay',
    }, {
        delayInMs: 5000,
    });
    await publishHelloPluginDelayedWorld({
        name: 'message with plugin with 1s delay',
    }, {
        delayInMs: 1000,
    });
};
