import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

const Menu = () => {

    const handleCataloguePress = () => {
        router.push("../../game/catalog");
      }
    const handleFavPress = () => {
    router.push("../../game/favoritePicker");
    }
    const handleFriendsPress = () => {
        router.push("../../user/showAllFriends");
    }
    return(
        <>
        <View className="flex-col bg-orange-100 h-full w-full justify-center md:space-x-1">
            <ScrollView>
            <SafeAreaView id="menuContainer">
                        <TouchableOpacity onPress={handleCataloguePress} className="bg-orange-300 border-2 rounded-3xl w-5/6 px-20 py-20 justify-start mx-10 my-2 flex-row items-center">
                            <Text className="text-white text-3xl w-full justify-start text-nowrap">Catalogue</Text>
                            <Icon name="book" className="w-1/5" size={30}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFavPress} className="bg-orange-400 border-2 rounded-3xl w-5/6 px-20 py-20 justify-start mx-10 my-2 flex-row items-center">
                            <Text className="text-white text-3xl w-full justify-start text-nowrap">Favorite Picker</Text>
                            <Icon name="heart" className="w-1/5" size={30}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFriendsPress} className="bg-orange-500 border-2 rounded-3xl w-5/6 px-20 py-20 justify-start mx-10 my-2 flex-row items-center">
                            <Text className="text-white text-3xl w-full justify-start text-nowrap">Friends</Text>
                            <Icon name="user" className="w-1/5 mr-" size={30}></Icon>
                        </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
                
            </View>
        </>
    )
}

export default Menu;