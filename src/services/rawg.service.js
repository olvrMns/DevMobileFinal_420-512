//import { LOGGER } from '../utils/logger.js';

export const PAGE_SIZE = 10;

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

    url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page_size=${PAGE_SIZE}`
    search;
    page = 1;
    developers;
    platforms;
    genres;
    tags;
    publishers
    ordering;

    constructor(params) {
        this.processParams(params);
    }

    buildURL(key, value) {
        this.url = this.url + `&${key}=${value}`;
    }

    processParams(params) {
        for (const [key, value] of Object.entries(params)) 
            this.buildURL(key, value);
    }

    static GetURL(params) {
        return (new RawgURL(params)).url;
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

    static async getAllGames(params) {
        return await this.fetch_(RawgURL.GetURL(params));
    }

}
