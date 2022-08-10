import { Connection } from 'amqplib';
import { createConnection } from './createConnection';

let connectionState: Promise<Connection>;

export const getConnection = (): Promise<Connection> => {
    if (!connectionState) {
        connectionState = createConnection();
    }
    return connectionState;
};
