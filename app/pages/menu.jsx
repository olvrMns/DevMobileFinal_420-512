import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from "react-native-gesture-handler";

const Menu = () => {
    return(
        <>
        <View className="flex-col bg-orange-100 h-full w-full justify-center ">
            <ScrollView>
            <SafeAreaView id="menuContainer">
                        <TouchableOpacity className="bg-orange-400 border-2 rounded-2xl w-5/6 px-32 py-24 justify-start m-10 flex-row">
                            <Text className="text-white text-3xl w-full justify-start">Catalogue</Text>
                            <Icon name="book" className="w-1/5"></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-orange-400 border-2 rounded-2xl w-5/6 px-32 py-24 justify-start m-10 flex-row">
                            <Text className="text-white text-3xl w-full justify-start">Favorite Picker</Text>
                            <Icon name="heart" className="w-1/5"></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-orange-400 border-2 rounded-2xl w-5/6 px-32 py-24 justify-start m-10 flex-row">
                            <Text className="text-white text-3xl w-full justify-start">Friends</Text>
                            <Icon name="user" className="w-1/5"></Icon>
                        </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
                
            </View>
        </>
    )
}

export default Menu;