import { Channel, ConsumeMessage } from 'amqplib';
import { logger } from '../../config/logger';
import { IBrokerHandler } from '../../../types/broker';

interface IArgs {
    handlers: IBrokerHandler[];
    channel: Channel;
    noAck?: boolean;
    log?: boolean;
}

export const wrapMsgPayloadWithCatch = ({
    handlers,
    channel,
    noAck,
    log,
}: IArgs) => (message: ConsumeMessage | null) => {
    if (!message) {
        return;
    }
    const jsonBody = message.content.toString();
    const payload = JSON.parse(jsonBody);
    const runHandlers = async () => {
        if (log) {
            logger.info(`Broker; receive message; ${JSON.stringify({
                exchange: message.fields.exchange,
                routingKey: message.fields.routingKey,
                data: payload,
            })}`);
        }
        try {
            // eslint-disable-next-line no-restricted-syntax
            for (const h of handlers) {
                // eslint-disable-next-line no-await-in-loop
                const r = await h({ payload });
                if (r?.acked) {
                    return;
                }
            }
            if (!noAck) {
                channel.ack(message);
            }
        } catch (e: any) {
            setTimeout(() => {
                logger.error(
                    `\t*1.Stack*:\n\t${e.stack}`
                    + '\n\t*2.Message info*:'
                    + `\n\t  *exchange*: ${message.fields.exchange}`
                    + `\n\t  *routingKey*: ${message.fields.routingKey}`
                    + `\n\t  *redelivered*: ${message.fields.redelivered}`
                    + `\n\t*3.Message data*:\n${JSON.stringify(payload, null, '   ')}`
                    + `\n\t*4.Error*:\n\t${e.message}\n`,
                );
                if (channel) {
                    channel.nack(message);
                }
            }, 10000);
        }
    };
    runHandlers();
};
