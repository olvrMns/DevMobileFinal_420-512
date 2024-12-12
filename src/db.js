import { createConnection } from 'mysql2';
console.log(process.env.DB_USER);

// const connection = createConnection({
//     user: process.env.DB_USER,
//     password: process.env.DB_PWD,
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME
// }).promise();

// export const getUsers = async () => {
//     const [users] = connection.query("select * from user");
//     return users;
// }

