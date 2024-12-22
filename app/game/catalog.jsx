import { useEffect, useState } from "react"
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context"
import { getGames } from "../../lib/axios";
import { View } from "react-native";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { selectorsData, defaultSelectText, styles as dropdownStyles } from "../../lib/dropdown";


export default Catalog = () => {

    const [gameArray, setGameArray] = useState([]);
    const [catalogIsLoading, setCatalogIsLoading] = useState(true);

    const [params, setParams] = useState({
        page: 1
    });

    /**
     * @note
     * IS BUGGED (sometimes? selector wont update, but useState(params) does...)
     */
    const updateParams = (param) => {
        let nParams = {...params};
        if (param.label != defaultSelectText) nParams[param.type] = param.value;
        else delete nParams[param.type];
        setParams(nParams);
    }

    const incrementPage = () => {
        setParams({...params, page: params.page + 1});
    }

    const updateGameArray = async () => {
        setCatalogIsLoading(true);
        const nPage = await getGames(params);
        setGameArray([...gameArray, ...nPage]);
        incrementPage();
        setCatalogIsLoading(false);
    }

    const handleLoadMore = async () => {
        await updateGameArray();
    }

    const reset = () => {
        setParams({...params, page: 1});
        setGameArray([]);
    }
    
    const handleSearch = async () => {
        reset();
        await updateGameArray();
    }

    useEffect(() => {
        updateGameArray();
    }, [])

    useEffect(() => {
    }, [gameArray, params]) 

    return(
        <SafeAreaView>
            <View className="h-4/5 w-full">
                <View className="w-full h-1/4 bg-orange-200 p-2">
                    <View className="flex-row h-1/2">
                        {selectorsData.map((obj, index) => (
                            <ParamSelector data={obj} onChange={updateParams} key={index.toString()}/>
                        ))}
                    </View>
                    
                    <View className="flex-row justify-center">
                        <TouchableOpacity className="rounded-full bg-red-400 w-20 h-20 ml-2 mr-2" onPress={handleSearch}>
                            <Text className="text-white m-auto ml-4">Search</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="rounded-full bg-red-400 w-20 h-20 ml-2 mr-2" onPress={reset}>
                            <Text className="text-white m-auto ml-4">Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="w-full h-3/4">
                    <FlatList data={gameArray} renderItem={({item}) => <GameCard game={item}/>} keyExtractor={(item, index) => index.toString()} numColumns={3}/>
                </View>
            </View>
            <View className="h-1/5 w-full border-solid border-2 border-blue-700">
                <TouchableOpacity className="bg-red-400 w-24 h-24 rounded-full items-center mt-10 mr-auto ml-auto" onPress={handleLoadMore}>
                    <Text className="text-white m-auto">View more</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const ParamSelector = (props) => {
    return(
        <Dropdown data={props.data} 
        onChange={(param) => props.onChange(param)} 
        maxHeight={200} labelField={"label"} 
        valueField={"value"}
        style={dropdownStyles.dropdown}
        selectedTextStyle={dropdownStyles.selectedTextStyle}
        inputSearchStyle={dropdownStyles.inputSearchStyle}
        value={defaultSelectText}/>
    )
}

const GameCard = (props) => {

    const router = useRouter();

    const handlePress = () => {
        router.push({pathname: "./gameProfil", params: props.game});
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