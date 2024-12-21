import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View} from "react-native";

const Menu = () => {
    return(
        <>
        <View>
            <SafeAreaView id="menuContainer">
                <SafeAreaView id="GamePicker">
                    <TouchableOpacity>
                        <Text>menu</Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <SafeAreaView id="GameCatalogue"></SafeAreaView>
                <SafeAreaView id="Friends"></SafeAreaView>
            </SafeAreaView>
            </View>
        </>
    )
}

export default Menu;