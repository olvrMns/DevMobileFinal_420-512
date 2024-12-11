import {Text,TextInput, ScrollView,View} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Signin = () => { 
    const [form, setForm] = useState({email:"",password:""})

    return (

        <SafeAreaView  className="flex-1 items-center">
            <ScrollView>
                <Text className="text-6xl font-bold tracking-[2px] text-center uppercase">sign in</Text>

                <View className="flex-row items-center">
                <Text>Email:</Text>
                <TextInput className="justify-center py-5 rounded-lg text-center focus:border-2"
                onChangeText={(item) => {setForm({...form,email : item})}}
                placeholder="Entrez votre courriel"
                value={form.email}
                />

                </View>

                <View className="flex-row items-center">
                <Text>Password:</Text>
                <TextInput className="justify-center py-5 rounded-lg text-center focus:border-2"
                onChangeText={(item) => {setForm({...form,password : item})}}
                placeholder="Entrez le mot de passe"
                value={form.password}
                />

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Signin