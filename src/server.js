import Dotenv, { config } from 'dotenv';
import path from 'path';
config({path: `${path.resolve()}/.${process.env.NODE_ENV}.env`});
import { LOGGER } from './logger.js';
import { app } from './app.js';

const serv = app.listen(process.env.SERVER_PORT, () => LOGGER.log('info', `Server started at port:${process.env.SERVER_PORT}`));