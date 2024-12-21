import { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context"
import { getGames } from "../../lib/axios";
import { View } from "react-native";
import { Image } from "react-native";


export default Catalog = () => {
    const [gameArray, setGameArray] = useState([]);
    const [page, setPage] = useState(1);

    const updateGameArray = async () => {
        const nPage = await getGames(page);
        setGameArray([...gameArray, ...nPage]);
        setPage(page + 1)
    }

    const handleLoadMore = async () => {
        await updateGameArray();
    }

    const reset = () => {
        setPage(1);
        setGameArray([]);
    }

    useEffect(() => {
        updateGameArray();
    }, [])

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
                <Image className="w-20 h-20 rounded-lg" source={{uri: props.game.background_image}}/>
                <Text className="color-green-600">{props.game.name}</Text>
            </TouchableOpacity>
        </View>
    )
}