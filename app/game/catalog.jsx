import { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context"
import { getGames } from "../../lib/axios";
import { View } from "react-native";
import { Image } from "react-native";


//{id: 5, name: "wesh", image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"}, {id: 7, name: "help", image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"}
export default Catalog = () => {
    const [gameArray, setGameArray] = useState([]);
    const [page, setPage] = useState(1);

    const updateGameArray = async () => {
        const nPage = await getGames(page);
        setGameArray([...gameArray, ...nPage]);
    }

    const handleLoadMore = async () => {
        await updateGameArray();
        setPage(page++)
    }

    const reset = () => {
        setPage(1);
        setGameArray([]);
    }

    useEffect(() => {
  
    }, [gameArray]) 

    return(
        <SafeAreaView>
            <View className="h-3/5 w-full p-2 border-solid border-2 border-red-700">
                <FlatList data={gameArray} renderItem={({item}) => <GameCard game={item}/>} keyExtractor={(item, index) => index.toString()} numColumns={3}/>
            </View>
            <TouchableOpacity className="bg-red-400 w-20 h-20 rounded-full items-center mt-10" onPress={handleLoadMore}>
                <Text className="text-white m-auto">Load More</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const GameCard = (props) => {

    const handlePress = () => {
        
    }

    return(
        <View className="bg-orange-400 w-1/4 items-center p-2 rounded-3xl border-solid border-2 border-sky-500 m-3">
            <TouchableOpacity className="" onPress={handlePress}>
                <Image className="w-20 h-20" source={{uri: props.game.background_image}}/>
                <Text className="color-green-600">{props.game.name}</Text>
            </TouchableOpacity>
        </View>
    )
}