import { GameService } from "../services/game.service.js";
import { StatusCodes } from "http-status-codes";
import { LOGGER } from "../utils/logger.js";

export class GameController {

    static async callback(response, logMessage, operation, onSuccessStatusCode = StatusCodes.OK) {
        try {
            LOGGER.log("info", logMessage);
            const res = await operation();
            if (res) response.status(onSuccessStatusCode).send(res);
            else throw new Error();
        } catch (ex) {
            response.sendStatus(StatusCodes.BAD_GATEWAY);
        }
    }
    
    static async addGameToFavorite(request, response) {
        await GameController.callback(response, "Add to favorite request received...", async () => await GameService.addFavorite(request.body.userId, request.body.gameId), StatusCodes.CREATED);
    }

    static async removeGameFromFavorite(request, response) {
        await GameController.callback(response, "Remove favorite request received...", async () => await GameService.removeFavorite(request.body.userId, request.body.gameId));
    }

    static async checkFavorite(request, response) {
        try {
            const res = await GameService.checkFavorite(request.body.userId, request.body.gameId);
            response.status(StatusCodes.OK).send(res);
        } catch (ex) {
            response.sendStatus(StatusCodes.BAD_GATEWAY);
        }
    }

} 