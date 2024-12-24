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

        <SafeAreaView  className="flex-1 justify-center items-center bg-zinc-200 align-middle">
            <ScrollView className="">
                <Text className={"text-6xl font-bold tracking-[2px] text-center uppercase mt-20 mx-6"}>Pick your games</Text>
                <Text className="text-2xl mx-14 mt-10 capitalize font-light antialiased ">Access an extensible game catalogue, but most importantly, find what is your OBJECTIVE favorite Video Game to exist...</Text>
                <SafeAreaView id='btns' className="items-center content-center">
                    <Text className="my-6 text-xl text-center cap uppercase w-full font-bold">Start Picking now</Text>
                    <TouchableOpacity className={`rounded bg-orange-400 border-solid border-orange-500 border-2 rounded-3xl w-40 h-24 justify-center`}  onPress={() => { router.push("/auth/signup")}}>
                        <Text className={`text-lg text-center align-middle font-bold`} style={{color:colors.lightText}} >Create a new account</Text>
                    </TouchableOpacity>

                    <SafeAreaView className="flex flex-col justify-center items-center mt-10 ">
                        <Text className="my-6 text-center capitalize w-full">Already have an account?</Text>
                        <TouchableOpacity className={`rounded bg-orange-400 border-solid border-orange-500 border-2 rounded-3xl w-32 h-16  justify-center`} onPress={() => { router.push("/auth/signin")}}>
                            <Text className={`text-lg text-center align-middle`} style={{color:colors.lightText}} >Sign in</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                    
                </SafeAreaView>
                
                
           
            </ScrollView>
        </SafeAreaView>
    )
}

export default index