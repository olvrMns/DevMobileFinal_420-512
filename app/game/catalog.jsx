import { useEffect, useState } from "react"
import { Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context"
import { GetGames } from "../../lib/axios";
import { View } from "react-native";
import { Image } from "react-native";



export default Catalog = () => {
    const [gameArray, setGameArray] = useState([{id: 5, name: "wesh", image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg"}, {id: 7, name: "help", image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg"}]);
    const [page, setPage] = useState(1);

    const incrementPage = () => {
        setPage(page++)
    }

    const updateGameArray = async () => {
        const nPage = await GetGames(page);
        setGameArray([...gameArray, nPage]);
    }

    const handleLoadMore = async () => {
        await updateGameArray();
        incrementPage();
    }

    useEffect(() => {
        console.log("salut")
    }, []) //gameArray

    return(
        <SafeAreaView>
            <View className="">
                <FlatList data={gameArray} renderItem={({item}) => <GameCard game={item}/>} keyExtractor={(item) => item.id}/>
            </View>
            <TouchableOpacity className="bg-red-400 w-20 h-20 rounded-full items-center mt-10" onPress={handleLoadMore}>
                <Text className="text-white m-auto">Load More</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const GameCard = (props) => {

    const handlePress = () => {
        console.log(props.game)
    }

    return(
        <View className="bg-orange-400 w-40 h-30 items-center m-2 p-2 rounded-3xl">
            <TouchableOpacity className="" onPress={handlePress}>
                <Image className="w-20 h-20" source={{uri: props.game.image}}/>
                <Text className="color-green-600">{props.game.name}</Text>
            </TouchableOpacity>
        </View>
    )
}