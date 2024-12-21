import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Menu = () => {
    
    return(
        <>
            <SafeAreaView id="menuContainer">
                <SafeAreaView id="GamePicker"></SafeAreaView>
                <SafeAreaView id="GameCatalogue"></SafeAreaView>
                <SafeAreaView id="Friends"></SafeAreaView>
            </SafeAreaView>
        </>
    )
}

export default Menu