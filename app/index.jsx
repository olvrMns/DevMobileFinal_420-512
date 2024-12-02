import {Text, Dimensions, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const  WIDTH_BTN = Dimensions.get('window').width - 56

const index = () => { 

    return (

        <SafeAreaView  className="flex-1 justify-evenly items-center">
            <ScrollView>
                <Text className={"text-6xl font-bold tracking-[2px] text-center uppercase"}>GameList</Text>
                <Text>Email</Text>
                <Text>Password</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default index