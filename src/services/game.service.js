import { insertFavorite, deleteFavorite, getFirstFavoriteByUserIdAndGameId } from "../db.js";

export class GameService {

    static async addFavorite(id_user, id_game) {
        try {
            const res = await insertFavorite(id_user, id_game);
            return res ? true : false;
        } catch (ex) {
            LOGGER.log("error", ex.message);
            return null;            
        }
    }

    static async removeFavorite(id_user, id_game) {
        try {
            const res = await deleteFavorite(id_user, id_game);
            return res.affectedRows < 1 ? false : true;
        } catch (ex) {
            LOGGER.log("error", ex.message);
            return null;
        }
    }

    static async checkFavorite(id_user, id_game) {
        try {
            const res = await getFirstFavoriteByUserIdAndGameId(id_user, id_game);
            return res.length < 1 ? false : true;
        } catch (ex) {
            LOGGER.log("error", ex.message);
            return null;
        }
    }


} 