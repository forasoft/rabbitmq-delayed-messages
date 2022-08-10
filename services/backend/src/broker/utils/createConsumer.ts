import { IBrokerHandler } from '../../../types/broker';
import { wrapMsgPayloadWithCatch } from './wrapMsgPayloadWithCatch';
import { getConnection } from './getConnection';

interface IArgs {
    queueName: string;
    prefetch: number;
    noAck?: boolean;
    log?: boolean;
}

export const createConsumer = async ({
    queueName, prefetch, noAck, log,
}: IArgs, ...handlers: IBrokerHandler[]): Promise<void> => {
    const connection = await getConnection();
    const channel = await connection.createChannel();
    await channel.prefetch(prefetch, true);
    await channel.consume(queueName, wrapMsgPayloadWithCatch({
        handlers,
        channel,
        noAck,
        log,
    }));
};
