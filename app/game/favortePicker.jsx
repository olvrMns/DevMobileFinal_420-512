import { SafeAreaView } from "react-native-safe-area-context"
import { ParamSelector, GameCard } from "./catalog.jsx";
import { defaultSelectText, selectorsData, styles } from "../../lib/dropdown.js";
import { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { getGames } from "../../lib/axios.js";


export default FavoritePicker = () => {

    const [gameArray, setGameArray] = useState([]);
    const [inSelectionMode, setInSelectionMode] = useState(false);
    const [params, setParams] = useState({
            page: 1
    });

    const updateParams = (param) => {
        let nParams = {...params};
        if (param.label != defaultSelectText) nParams[param.type] = param.value;
        else delete nParams[param.type];
        setParams(nParams);
    }

    const search = async () => {
        const games = await getGames(params, 50);
        setGameArray(games);
    }

    const reset = () => {
        setGameArray([]);
    }

    const toggleSelection = () => {
        setInSelectionMode((oldValue) => !oldValue);
    }

    useEffect(() => {
    }, [gameArray])

    return(
        <SafeAreaView className="h-full">
            <View className="h-3/4 flex-row">
                <View className="h-full w-1/5 border-solid border-4 border-red-600">
                    {selectorsData.map((obj, index) => (
                        <ParamSelector 
                        data={obj}
                        onChange={updateParams} 
                        key={index.toString()} 
                        dropdownStyle={{...styles.dropdown, width: "100%"}} 
                        value={defaultSelectText}/>
                    ))}

                    <TouchableOpacity onPress={search}>
                        <FontAwesomeIcon icon={faSearch} size={60}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={reset}>
                        <FontAwesomeIcon icon={faRefresh} size={60}/>
                    </TouchableOpacity>
                </View>

                <View className="h-full w-4/5 border-solid border-4 border-purple-600">
                    {inSelectionMode ? 
                        <Picker gameArray={gameArray}/> 
                    : 
                        <FlatList data={gameArray} renderItem={({item}) => <GameCard game={item} handlePress={null}/>} keyExtractor={(item, index) => index.toString()} numColumns={3}/>
                    }
                </View>
            </View>

            <View className="w-full h-1/4 border-solid border-4 border-green-600">
                <TouchableOpacity onPress={toggleSelection}>
                    <FontAwesomeIcon icon={faStarHalfStroke} size={60}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const Picker = (props) => {


    return(
        <View>

        </View>
    )
}