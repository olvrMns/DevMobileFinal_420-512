import { getGames, setToken, getToken, signUp, signIn, fetchProfileData, getIdFromJwt } from "../lib/axios";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock('@react-native-async-storage/async-storage');



describe('setToken', () => {
    it('test if the token is set (for auth user)', async () => {
        await setToken('tokenfortesting');
        //Verifie si la fonction a étée appelée avec ce token
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('jwt', 'tokenfortesting');
    })
});


describe('getToken', () => {
    it('test if the returned token is the right one', async () => {
        let res;
        jest.spyOn(AsyncStorage, 'getItem').mockResolvedValueOnce('tokenfortesting');
        res = await getToken();
        //Verifie si la fonction a étée appelée avec ce token
        expect(res).toBe('tokenfortesting');
    })
})

describe('getGames', () => {
    it('test if can get all games from api', async () => {
        let res = await getGames(2,2);
        let res2 = await getGames();
        console.log(res);
        expect(res).toHaveLength(2);
        res.forEach(game => {
            expect(game).toHaveProperty("id");
            expect(game).toHaveProperty("name");
            expect(game).toHaveProperty("released");
            expect(game).toHaveProperty("ratings");
            expect(game).toHaveProperty("metacritic");
        });
        expect(res2).toBeNull();
    })
})

