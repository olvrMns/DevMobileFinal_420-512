import { LOGGER } from '../utils/logger.js';

/**
 * @note
 * 
 */
class RawgURLBuilder {

}

/**
 * @note
 * 
 */
export class RawgService {

    static page_size = 10;

    static async fetch_(url) {
        try {
            const res = await fetch(url);
            return (await res.json()).results;
        } catch (ex) {
            LOGGER.log("error", ex.message)
            return null;
        }
    }

    static async getAllGames(page) {
        return await this.fetch_(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=${this.page_size}&page=${page ? page : 1}`);
    }

    // static async getAllGamesByDevelopers(page = 1, developers) {
    //     return await this.fetch_(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=${this.page_size}&page=1&developers=${developers}`);
    // }

    // static async getAllGamesByGenres(page = 1, genres) {
    //     return await this.fetch_(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=${this.page_size}&page=1&genres=${genres}`);
    // }

}
