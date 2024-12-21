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

export async function getUserByUsernameOrEmailAndPassword(usernameOrEmail, password) {
    
    console.log(`Database : get user with username/email : ${usernameOrEmail} and password : ${password}`)
    
    const [users] = await QUERIER.execute(`SELECT * FROM user WHERE (username=? OR email=?) AND pwd=?;`,[usernameOrEmail,usernameOrEmail,password])
    
    
    return users[0];
} 


export async function getUserByUsernameAndPassword(username, password){
    
    console.log(`Database : get users with username: ${username} and password : ${password}`)
    
    const [rows] = await QUERIER.execute(`SELECT * FROM user WHERE username=? and pwd=?`,[username,password])
    return rows[0]
}


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

export async function getUserById(id){
    
    console.log(`Database : get users by Id : ${id}`)
    
    const [rows] = await QUERIER.execute(`SELECT * FROM user WHERE user_id=?`,[id])
    return rows[0]
}

export async function updateUserProfile(userData){
    //Modifie les données de l'utilisateur avec userData = {id,username,email}
   
    console.log(`Database : update users with userData.id : ${userData.id}`)
    
    const [rows] = await QUERIER.execute(`   UPDATE user
                                        SET 
                                            username = ?,
                                            email = ?

                                        WHERE user_id = ?;`,[userData.username,userData.email,userData.user_id])
    return true
}



export async function deleteUserById(id){
    
    console.log(`Database : delete users with id : ${id}`)
    
    const status = await QUERIER.execute(`   DELETE FROM user
                                        WHERE user_id = ?;`,[id])
    return status[0].affectedRows
}

export async function addFriend(userId,friendId) {
    console.log(`Database: friend relation to user: ${userId} and friend: ${friendId}`);

   

    const [isAlreadyFriend]=await QUERIER.execute(`SELECT * FROM rel_friend WHERE id_origin_user=? AND id_friend_user=?`,[userId,friendId]);

    if(isAlreadyFriend.length){
        throw new Error("Already friends");
    }
    
    const [result]=await QUERIER.execute(`INSERT INTO rel_friend (id_origin_user,id_friend_user) VALUES (?,?)`,[userId,friendId]);

    console.log("Friend added");

    return result[0];
}

export async function getAllFriendsByUserId(userId){
    console.log(`Database: Fetching friends by user : ${userId}`);

    const query=`SELECT user_id, username, email
                FROM user
                JOIN rel_friend 
                ON id_friend_user=user_id
                WHERE id_origin_user=?`;

    const [result]=await QUERIER.execute(query,[userId]);
    return result;

}
