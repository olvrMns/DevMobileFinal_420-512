import {Text, View, TextInput, Dimensions, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform,TouchableOpacity} from 'react-native'
import React, {useContext, useState} from 'react'
import { colorsPalette } from '../../assets/colorsPalette'
import { useRouter, Link} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signUp } from '../../lib/axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from '../../contexts/ThemeContext'
import { useAuthContext } from '../../contexts/authContext'

const  WIDTH_BTN = Dimensions.get('window').width - 56

const SignUp = () => { 

    const router = useRouter()
    const { theme } = useTheme()
    const authContext = useAuthContext();
    const [alertUsername, setAlertUsername] = useState(false)
    const [alertEmail, setAlertEmail] = useState(false)
    const [alertMDP, setAlertMDP] = useState(false)
    const [msgErreur, setMsgErreur] = useState("")
    const [loading, setLoading] = useState(false)
    const colors = colorsPalette[theme]


    const [form, setForm] = useState({username:"",email:"",pwd:""})



    const submit =async ()=>{

        if(form.username == "" || form.pwd == "" || form.email == ""){
            if(form.username == ""){
                setAlertUsername(true)
            }
            else{
              setAlertUsername(false)
            }
            if(form.pwd == ""){
              setAlertMDP(true)
            }
            else{
              setAlertMDP(false)
            }
            if(form.email == ""){
              setAlertEmail(true)
            }
            else{
              setAlertEmail(false)
            }
            return null
          } 
      
          console.log(`Trying to SignUp with username : ${form.username}, email : ${form.email} and pwd : ${form.pwd}`)
      
          try{
              setLoading(true)
              const result = await signUp(form.username, form.email ,form.pwd)
              
              setLoading(false)
              setForm({username:"", email:"", pwd:""})
              //Do not delete the routes, need it for the glob.user for all pages (Jimmy)
              authContext.setUserId(result.id);
              router.push(`../${result.id}/qrCodeUser`)
              router.push(`../${result.id}/cameraQrScanner`)
              router.push(`../${result.id}/showAllFriends`)
              router.push(`../${result.id}/friendForm`)
              router.push(`../${result.id}/privProfile`)
      
          } catch(error){
              setLoading(false)
              console.log(error)
              if(error.message.includes("Request failed with status code 409")){
                
                setMsgErreur("Email et/ou Identifiant déjà utilisé")
              }
              else{
                setMsgErreur("Désolé : Il y a un problème de notre côté, veuillez réessayer plus tard.")
              }
              console.log("Error : ",error)
          }
      
        }   

    return (
            <KeyboardAvoidingView 
            className="flex-1 items-center bg-gray-300"
            keyboardVerticalOffset={0}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView 
            className="flex-1 items-center "
            >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text className="text-2xl font-bold tracking-[2px] text-center uppercase pt-24 pb-16 text-orange-600 rotate-6" >Sign Up to GamePicker!</Text>
                <View className="flex-1 justify-center items-center gap-8" >
                <Text className="text-3xl font-semibold pb-4 mb-3 text-gray-700/90 -rotate-6" >Create your account!</Text>
                {loading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
                {!msgErreur == "" ? 
                <View
                    className="items-center justify-center py-5 rounded-lg border-2" style={[{width:WIDTH_BTN,color:colors.text,backgroundColor:colors.lightAlert,borderColor:colors.alert} ]}
                >
                    <Text style={{color:colors.alert}}>{msgErreur}</Text> 
                </View>
                : null
                }
                <View className="items-center justify-center ">
                    <View className="flex-row items-center justify-center" >
                    <TextInput
                        className="justify-center py-5 rounded-lg text-center bg-yellow-200/30 w-80 border " 
                        onChangeText={(item) => {setForm({...form,email : item})}}
                        placeholder="Enter your email"
                        placeholderTextColor={"#000"}
                        value={form.email}
                        />
                    {alertEmail ? <Icon className="absolute right-4" name="exclamation-triangle" size={30} color={colors.alert} />: null}
                    </View>
                    {alertEmail ? <Text style={{color:colors.alert, paddingTop:5}}>Email: the field must have an entry</Text> : null}
                </View>
                <View>
                    <View className="flex-row items-center justify-center">
                    <TextInput
                        className="justify-center py-5 rounded-lg text-center bg-yellow-200/30 w-80 border " 
                        onChangeText={(item) => {setForm({...form,username : item})}}
                        placeholder="Enter username"
                        placeholderTextColor={"#000"}
                        value={form.username}
                        />
                    {alertUsername ? <Icon className="absolute right-4" name="exclamation-triangle" size={30} color={colors.alert} />: null}
                    </View>
                    {alertUsername ? <Text style={{color:colors.alert, paddingTop:5}}>Username: the field must have an entry</Text> : null}
                </View>
                    <View className="flex-row items-center justify-center">
                    <TextInput
                        className="justify-center py-5 rounded-lg text-center bg-yellow-200/30 w-80 border " 
                        onChangeText={(item) => {setForm({...form,pwd : item})}}
                        placeholder='Enter new Password'
                        placeholderTextColor={"#000"}
                        value={form.pwd}
                        />
                    {alertMDP ? <Icon className="absolute right-4" name="exclamation-triangle" size={30} color={colors.alert} />: null}
                    </View>
                    {alertMDP? <Text style={{color:colors.alert, paddingTop:5}}>Password: the field must have an entry</Text> : null}
                <TouchableOpacity className="py-4 rounded-xl px-3 bg-orange-400/65" s onPress={submit}>
                    <Text className="text-center font-medium text-2xl" >Create new Account!</Text>
                </TouchableOpacity>
                <View className="border-b border-gray-300 my-2.5 w-3/4" />
                <Text class="text-3xl font-bold underline" style={{color:colors.text}}>If you already have an account <Link style={{color:colors.link}} href="./signin">Sign-in</Link></Text>    
                </View>
            </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
          )
}

export default SignUp