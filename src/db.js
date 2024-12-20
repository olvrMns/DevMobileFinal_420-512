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
            let results = await this.connection.execute(query, params);
            await this.closeConnection();
            return results;
        } catch(err) {
            LOGGER.log("error", err.message);
            return null;
        } finally {
            await this.closeConnection();
        }
    }

}

export const QUERIER = new DBQuerier();



export async function getUserByUsernameOrEmail(username, email){
    
    console.log(`Database : get users with username: ${username} OR email : ${email}`)
    
    const [rows] = await QUERIER.execute(`SELECT * FROM user WHERE username=? OR email=?`,[username,email])
    
    return rows[0]
}

export async function createUser(email, username, password){
    
    console.log(`Database : creating user with email: ${email}, username: ${username} and password : ${password}`)
  
    const querry = await QUERIER.execute(`INSERT INTO user (username,email,pwd) VALUES (?,?,?);`,[username,email,password])
    const [rows] = await QUERIER.execute(`SELECT user_id, username, email FROM user WHERE username=? and email=?`,[username,email])
    return rows[0];
}




