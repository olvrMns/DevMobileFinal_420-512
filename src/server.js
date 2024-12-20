import { LOGGER } from './utils/logger.js';
import { app } from './app.js';

export const serv = app.listen(process.env.SERVER_PORT, () => LOGGER.log('info', `Server started at port:${process.env.SERVER_PORT}`));