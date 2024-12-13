import Express from 'express';
import {getUsers} from './db.js';
import { StatusCodes } from 'http-status-codes';

export const app = Express();

app.get("/users", async (request, response) => {
    let users = await getUsers();
    response.status(StatusCodes.OK).send(users);
});

