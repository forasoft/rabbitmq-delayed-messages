import * as exchangesList from '../const/exchanges';
import { createChannel } from './createChannel';
import { createExchange } from './createExchange';
import { getConnection } from './getConnection';

export const initExchanges = async (): Promise<void> => {
    const connection = await getConnection();
    const channel = await createChannel({ connection });
    const exchanges = Object.values(exchangesList);
    await Promise.all(
        exchanges.map((exchange) => (
            createExchange({
                channel,
                exchange,
            })
        )),
    );
    await channel.close();
};
