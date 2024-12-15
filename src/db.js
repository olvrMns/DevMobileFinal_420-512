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

    async execute(query, params) {
        try {
            await this.openConnection();
            let [results] = await this.connection.execute(query, params);
            await this.closeConnection();
            return results[0];
        } catch(err) {
            LOGGER.log("error", err.message);
            return null;
        } finally {
            await this.closeConnection();
        }
    }

}

export const QUERIER = new DBQuerier();

export const getUser = async (username, email, pwd) => {
    const users2 = await QUERIER.execute("SELECT * FROM user WHERE username = ? AND pwd = ?;", ["test", "test"]);
    //const users = await connection.query("select * from user;");
    return users2?.username;
}

console.log("value: " + (await getUser("test", "test@gmail.com", "test")));
