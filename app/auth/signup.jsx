import {Text,TextInput, ScrollView,View} from 'react-native'
import React, {useState} from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signUp } from '../../lib/axios'
const SignUp = () => { 
    const [form, setForm] = useState({email:"",password:""})


    const submit =async ()=>{
        try{
            const result=await signUp(form.email,form.password)

        }catch (error){
            console.log("Error",error)
        }
    }
    return (

        <SafeAreaView  className="flex-1 items-center">
            <ScrollView>
                <Text className="text-6xl font-bold tracking-[2px] text-center uppercase">sign up</Text>

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

                <TouchableOpacity className="py-4 rounded-xl px-3"  onPress={submit}>
                <Text className="text-center font-medium text-2xl">Creer le compte</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp