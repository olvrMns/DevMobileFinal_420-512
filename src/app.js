import Express from 'express';
import { getUserByUsernameOrEmail,createUser } from './db.js';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors'
import jwt from 'jsonwebtoken';

export const app = Express();

const SECRET_KEY = 'your_secret_key';

app.use(cors());

app.use(Express.json());




app.post("/users", async (req, res) => {
    const { username, pwd, email } = req.body;

    
    if (!username || !pwd || !email) {
        return res.status(400).json({ error: "Username, password, and email are required." });
    }

    try {
        
        const existingUser = await getUserByUsernameOrEmail(username, email);
        if (existingUser) {
            return res.status(409).json({ error: "Username or email already exists." });
        }

        
        const newUser = await createUser( email, username, pwd );
        const token = jwt.sign({ userId:newUser.user_id }, SECRET_KEY, { expiresIn: '1h' });
        console.log(token)
       
        res.status(201).json({
            id: newUser.user_id,
            username: newUser.username,
            email: newUser.email,
            token
            
        });
    } catch (error) {
        console.error('Error during signup: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


