import { useLocalSearchParams } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleFavorite, getIdFromJwt } from "../../lib/axios";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import { faHeart as emptyHeartIcon } from "@fortawesome/free-regular-svg-icons";


export default GameProfil = () => {
    const game = useLocalSearchParams();
    const [favorited, setFavorited] = useState(false);

    const checkFavoritedState = async () => {
        try {
            let userId = await getIdFromJwt();
            if (userId) setFavorited(handleFavorite(userId, game.id, "check"));
        } catch(ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        checkFavoritedState();
    }, [])

    useEffect(() => {
        
    }, [favorited])

    const handleAddFavorite = async () => {
        let userId = await getIdFromJwt();
        if (userId) setFavorited(handleFavorite(userId, game.id, "add"));
    };

    return(
        <SafeAreaView>
            <Image className="w-1/4 h-1/4" source={{uri: game.background_image}}/>
            <Text className="">{game.name}</Text>
            <Text className="">{game.rating}/{game.rating_top}</Text>
            <Text className="">{game.platforms}</Text>
            <TouchableOpacity onPress={handleAddFavorite} className="" style={{backgroundColor: "green"}}>
                <Text className="">ADD TO FAVORITE</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}