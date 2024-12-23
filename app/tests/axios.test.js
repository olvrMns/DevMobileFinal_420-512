import { getGames, setToken, getToken } from "../../lib/axios";
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
