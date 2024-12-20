import { RawgService } from "../services/rawg.service.js";
import { StatusCodes } from "http-status-codes";
import { LOGGER } from "../utils/logger.js";

export class RawgController {

    static async getGames(request, response) {
        try {
            LOGGER.log("info", `GetGames Request Received [Page:${request.body.page}]...`);
            const res = await RawgService.getAllGames(request.body.page);
            response.status(StatusCodes.OK).send(res);
        } catch(ex) {
            LOGGER.log("error", ex.message)
            response.status(StatusCodes.BAD_GATEWAY).send(null);
        }
    }

    // static async getGamesByDevelopers(request, response) {
    //     try {

    //     } catch(ex) {

    //     }
    // }
}