//import { LOGGER } from '../utils/logger.js';

export const DEFAULT_PAGE_SIZE = 9;

/**
 * @note
 * - 
 * {
 *  search,
 *  page,
 *  page_size, 
 *  developers, 
 *  platforms, 
 *  genres, 
 *  tags, 
 *  publishers, 
 *  ordering
 * }
 */
class RawgURL {

    url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`
    page_size;

    constructor(params, page_size) {
        this.buildURL("page_size", page_size ? page_size : DEFAULT_PAGE_SIZE);
        this.processParams(params);
    }

    buildURL(key, value) {
        this.url = this.url + `&${key}=${value}`;
    }

    processParams(params) {
        for (const [key, value] of Object.entries(params)) 
            this.buildURL(key, value);
    }

    static GetURL(params, page_size) {
        return (new RawgURL(params, page_size)).url;
    }

    get [Symbol.toStringTag]() {
        return this.url;
    }

}

export const getParamsAsStr = (params) => {
    let str = "";
    for (const [key, value] of Object.entries(params)) str = str + `| ${key}:${value} `;
    return str.slice(1);
}

/**
 * @note
 * `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=${PAGE_SIZE}&page=${page ? page : 1}`
 */
export class RawgService {


    static async fetch_(url) {
        try {
            const res = await fetch(url);
            return (await res.json()).results;
        } catch (ex) {
            LOGGER.log("error", ex.message)
            return null;
        }
    }

    static async getAllGames(params, page_size) {
        return await this.fetch_(RawgURL.GetURL(params, page_size));
    }

    /**
     * @note
     * need rawg.io prenium to access all the trailers...... 
     */
    static async getPreview(gameId) {
        const res = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${process.env.RAWG_API_KEY}`);
        return (await res.json()).preview;
    }

}
