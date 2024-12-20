import { LOGGER } from '../utils/logger.js';
import { getUserByUsernameAndPassword } from '../db.js';
import { StatusCodes } from 'http-status-codes';

export class AuthController {

    static async getUser(request, response) {
        try {
            let user = await getUserFromUsernameAndPassword(request.body.username, request.body.password);
            response.status(StatusCodes.OK).send(user);
        } catch (err) {
            LOGGER.log("error", err.message)
            response.status(StatusCodes.BAD_REQUEST).send("Login error");
        }
    }
}