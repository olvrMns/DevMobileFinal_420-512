import { createConnection } from 'mysql2';
import { createConnection as createConnectionAsync } from 'mysql2/promise';
import { LOGGER } from './logger.js';

class DBQuerier {

    constructor() {
        this.connectionConfig = {
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME
        };
        this.connection = null;
    }

    async openConnection() {
        this.connection = await createConnectionAsync(this.connectionConfig);
    }

    async closeConnection() {
        if (this.connection != null) {
            this.connection.close();
            this.connection = null;
        }
    }

    async execute(asyncQueryCallback) {
        try {
            await this.openConnection();
            queryResult = await asyncQueryCallback();
            await this.closeConnection();
            return queryResult;
        } catch(err) {
            LOGGER.log("error", err.message);
            return null;
        } finally {
            await this.closeConnection();
        }
    }

}

export const QUERIER = new DBQuerier();

// const connection = createConnection({
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME
// }).promise();

export const getUsers = async () => {
    const users = await connection.query("select * from user;");
    return users[0];
}


