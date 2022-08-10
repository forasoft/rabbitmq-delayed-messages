import dotenv from 'dotenv';
import { parseBoolean } from '../utils/parsers/parseBoolean';
import { parseString } from '../utils/parsers/parseString';

dotenv.config();

export const vars = Object.freeze({
    env: parseString(process.env.NODE_ENV, 'develop'),
    isLocal: parseBoolean(process.env.IS_LOCAL, false),
    rabbit: {
        user: parseString(process.env.RABBIT_USER, 'rabbitmq'),
        pass: parseString(process.env.RABBIT_PASS, 'rabbitmq'),
        host: parseString(process.env.RABBIT_HOST, 'rabbit:5672'),
    },
});
