import { useLocalSearchParams } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleFavorite, getIdFromJwt } from "../../lib/axios";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import { faHeart as emptyHeartIcon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useSettingsContext } from "../../contexts/settingsContext";


export default GameProfil = () => {
    const game = useLocalSearchParams();
    const [favorited, setFavorited] = useState(false);
    const settingsContext = useSettingsContext();

    const checkFavoritedState = async () => {
        try {
            let userId = await getIdFromJwt();
            if (userId) setFavorited(await handleFavorite(userId, game.id, "check"));
        } catch(ex) {
            console.log(ex);
        }
    }

    useEffect(() => {
        checkFavoritedState();
    }, [])

    useEffect(() => {
        
    }, [favorited])

    const modifyFavoriteState = async () => {
        let userId = await getIdFromJwt();
        if (userId) {
            let res = await handleFavorite(userId, game.id, favorited ? "remove" : "add");
            setFavorited((favorited) => !favorited);
        }
    };

    return(
        <SafeAreaView className="bg-orange-200">
            <View className="w-full h-1/3 border-2 border-red-600 mb-4 p-4">
                <Image className="w-5/6 h-5/6 m-auto rounded-2xl" source={{uri: game.background_image}}/>
            </View>

            <View className="w-full h-1/3 border-2 border-red-600 mb-4 p-4">
                <Text className="font-extrabold text-4xl">{game.name}</Text>
                <Text className="">{game.rating}/{game.rating_top}</Text>
                <Text>{settingsContext.showPlatforms ? <Text>OUI</Text> : <Text>NON</Text>}</Text>
            </View>

            <View className="w-full h-1/3 border-2 border-red-600 mb-4 p-4">
                <TouchableOpacity onPress={modifyFavoriteState} className="m-auto w-1/2 h-1/4">
                    <FontAwesomeIcon icon={favorited ? faHeart : emptyHeartIcon} style={{color: "red", margin: "auto"}} size={80}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}