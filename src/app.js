import Express from 'express';
import { authRouter } from './routes/auth.route.js';
import { rawgRouter } from './routes/rawg.route.js';

export const app = Express();

app.use(authRouter);
app.use(rawgRouter);

