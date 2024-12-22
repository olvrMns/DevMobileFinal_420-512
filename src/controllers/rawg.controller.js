import { RawgService, getParamsAsStr } from "../services/rawg.service.js";
import { StatusCodes } from "http-status-codes";
import { LOGGER } from "../utils/logger.js";

export class RawgController {

    static async getGames(request, response) {
        try {
            LOGGER.log("info", `GetGames Request Received [params:${getParamsAsStr(request.body.params)}]...`);
            const res = await RawgService.getAllGames(request.body.params);
            response.status(StatusCodes.OK).send(res);
        } catch(ex) {
            LOGGER.log("error", ex.message)
            response.status(StatusCodes.BAD_GATEWAY).send(null);
        }
    }

}