import Dotenv from 'dotenv';
import path from 'path';
Dotenv.config({path: `${path.resolve()}/.${process.env.NODE_ENV}.env`});
import Express from 'express';
import {} from './db.js';

const app = Express();

app.get("/users", (request, response) => {

});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server started...${process.env.SERVER_PORT}`);
});