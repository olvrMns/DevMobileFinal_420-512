import { RawgService, getParamsAsStr } from "../services/rawg.service.js";
import { StatusCodes } from "http-status-codes";
import { LOGGER } from "../utils/logger.js";

export class RawgController {

    static async getGames(request, response) {
        try {
            LOGGER.log("info", `GetGames Request Received [params:${getParamsAsStr(request.body.params)}]...`);
            const res = await RawgService.getAllGames(request.body.params, request.body.page_size);
            response.status(StatusCodes.OK).send(res);
        } catch(ex) {
            LOGGER.log("error", ex.message)
            response.status(StatusCodes.BAD_GATEWAY).send(null);
        }
    }

    static async getPreview(request, response) {
        try {
            LOGGER.log("info", `GetPreview Request Received [gameId:${request.body.gameId}]...`);
            const res = await RawgService.getPreview(request.body.gameId);
            response.status(StatusCodes.OK).send(res);
        } catch(ex) {
            LOGGER.log("error", ex.message)
            response.status(StatusCodes.BAD_GATEWAY).send(null);
        }
    }

}