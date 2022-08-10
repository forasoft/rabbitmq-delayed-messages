import { Channel } from 'amqplib';
import { IQueue } from '../../../types/broker';
import { objectToJsonBuffer } from '../../utils/object/objectToJsonBuffer';
import { getConnection } from './getConnection';

let channelPromise: Promise<Channel>;

interface IGlobalArgs {
    exchangeName: string;
    queue: IQueue;
    expirationInMs?: number;
    delayInMs?: number;
    persistent?: boolean;
}

interface IArgs {
    expirationInMs?: number;
    delayInMs?: number;
    persistent?: boolean;
}

export const createPublisher = ({
    exchangeName,
    queue,
    expirationInMs: dExpirationInMs,
    delayInMs: dDelayInMs,
    persistent: dPersistent = true,
}: IGlobalArgs) => async (data: any, {
    persistent = dPersistent,
    expirationInMs = dExpirationInMs,
    delayInMs = dDelayInMs,
}: IArgs = {}): Promise<void> => {
    const connection = await getConnection();
    if (!channelPromise) {
        // @ts-ignore
        channelPromise = connection.createChannel();
    }
    const channel = await channelPromise;
    const payload = objectToJsonBuffer(data);

    channel.publish(
        exchangeName,
        queue.binding,
        payload,
        {
            persistent,
            expiration: expirationInMs,
            headers: { 'x-delay': delayInMs },
        },
    );
};
