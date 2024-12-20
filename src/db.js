import { createConnection as createConnectionAsync } from 'mysql2/promise';
import { LOGGER } from './utils/logger.js';

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
            this.connection?.close();
            this.connection = null;
        }
    }

    /**
     * 
     * @note
     * returns rows
     */
    async execute(query, params) {
        try {
            await this.openConnection();
            let [results] = await this.connection.execute(query, params);
            await this.closeConnection();
            return results;
        } catch(err) {
            LOGGER.log("error", err.message);
            return null;
        } finally {
            await this.closeConnection();
        }
    }

    /**
     * 
     * @note
     * returns nothing (for inserts)
     */
    async query(query) {
        try {
            await this.openConnection();
            await this.connection.query(query);
            await this.closeConnection();
        } catch(err) {
            LOGGER.log("error", err.message);
        } finally {
            await this.closeConnection();
        }
    }

}

export const QUERIER = new DBQuerier();

export const getUserByUsernameAndPassword = async (username, pwd) => {
    const users2 = await QUERIER.execute("SELECT * FROM user WHERE username = ? AND pwd = ?;", [username, pwd]);
    return users2[0];
}

//console.log("value: " + (await getUserFromUsernameAndPassword("test", "test")).username);

