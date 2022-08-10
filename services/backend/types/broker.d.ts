interface IBrokerHandlerArgs {
    payload: any;
}

export type IBrokerHandler = (args: IBrokerHandlerArgs) => Promise<{ acked?: boolean } | void>;

export interface IQueue {
    name: string;
    binding: string;
    options: Record<string, any>;
}

export interface IExchange {
    name: string;
    type: 'direct' | 'fanout' | 'topic' | 'headers' | 'match' | 'x-delayed-message';
    options: {
        durable: boolean;
    };
    queues: Record<string, IQueue>;
}
