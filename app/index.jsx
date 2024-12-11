import {Text, Dimensions, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '../contexts/ThemeContext'
import { Link, useRouter} from 'expo-router'
import { colorsPalette } from '../assets/colorsPalette'

const  WIDTH_BTN = Dimensions.get('window').width - 56

const index = () => { 

    const { theme } = useTheme()
    const router = useRouter()
    const colors = colorsPalette[theme]

    return (

        <SafeAreaView  className="flex-1 justify-evenly items-center">
            <ScrollView>
                <Text className={"text-6xl font-bold tracking-[2px] text-center uppercase"}>This is the main page</Text>

                <TouchableOpacity className={`rounded p-6 my-4`} style={{backgroundColor:colors.primary}} onPress={() => { router.push("./auth/signup")}}>
                <Text className={`text-2xl`} style={{color:colors.lightText}} >Sign-up</Text>
                </TouchableOpacity>


  
                <TouchableOpacity className={`rounded p-6 my-4`} style={{backgroundColor:colors.primary}} onPress={() => { router.push("./auth/signin")}}>
                <Text className={`text-2xl`} style={{color:colors.lightText}} >Sign-in</Text>
                </TouchableOpacity>
           
            </ScrollView>
        </SafeAreaView>
    )
}

export default index