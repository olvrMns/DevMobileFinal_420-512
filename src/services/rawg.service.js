import { LOGGER } from '../logger.js';

/**
 * @note
 * `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&developers=fromsoftware`
 * `https://api.rawg.io/api/developers?key=${process.env.RAWG_API_KEY}`
 * 
 */
class RawgService {

    constructor() {}

    async fetch_(url) {
        try {
            return await fetch(url);
        } catch (ex) {
            LOGGER.error(ex.message)
            return null;
        }
    }

    async getGames() {

    }

    async getGamesByDevelopers(developers) {

    }

}

export const rawgService = new RawgService();
