import { createConnection } from 'mysql2';

// WILL BE REMOVED ===================================
import Dotenv, { config } from 'dotenv';
import path from 'path';
config({path: `${path.resolve()}/.${process.env.NODE_ENV}.env`});
// ===================================================

const connection = createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME //temp
}).promise();

export const getUsers = async () => {
    const users = await connection.query("select * from user;");
    return users[0];
}

// class DBQuerier {

// }

