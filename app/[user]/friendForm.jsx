import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions,ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import { colorsPalette } from '../../assets/colorsPalette'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../contexts/ThemeContext'
import { addFriend } from '../../lib/axios'
import {useGlobalSearchParams } from 'expo-router';
import { useAuthContext } from '../../contexts/authContext'

const  WIDTH_BTN = Dimensions.get('window').width - 56

const friendForm=()=>{
    
    const { theme } = useTheme();
    const colors = colorsPalette[theme];
    const [alertIdentifier, setAlertIdentifier] = useState(false)
    const [alertMDP, setAlertMDP] = useState(false)
    const [msgErreur, setMsgErreur] = useState("")
    const [loading, setLoading] = useState(false)
    const [friendId, setFriendId] = useState(""); 
    //const glob = useGlobalSearchParams();
    const [friendDescription,setFriendDescription]=useState("");
    const authContext = useAuthContext();


    const handleAddFriend=async()=>{
        
        try{
            setLoading(true);
            const addingFriend=await addFriend(authContext.userId, friendId,friendDescription)
            setLoading(false);
            setMsgErreur("")
            console.log("success in adding friend")
        }catch(error){
            setMsgErreur("Add id or Friend already added or can't add yourself as friend")
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-zinc-200 align-middle">
    
        
        <Text className="text-4xl font-semibold pb-4" style={{ color: colors.text }}>Add a Friend</Text>
        {loading ? <ActivityIndicator size="large" color={colors.primary} /> : null}
            {!msgErreur == "" ? 
                <View
                className="items-center justify-center py-5 rounded-lg border-2" style={[{width:WIDTH_BTN,color:colors.text,backgroundColor:colors.lightAlert,borderColor:colors.alert} ]}
                >
                <Text className="text-md" style={{color:colors.alert}}>{msgErreur}</Text> 
                </View>
                : null
            }
        <View className="flex-col items-center">
        <TextInput className="justify-center py-5 rounded-lg text-center m-5" 
            style={[{color:colors.text,backgroundColor:colors.background, width:WIDTH_BTN}]}
            placeholder="Entrez l'id de votre ami"
            placeholderTextColor={colors.secondary}
            value={friendId}
            onChangeText={setFriendId}
        />

<TextInput className="justify-center py-5 rounded-lg text-center m-5" 
            style={[{color:colors.text,backgroundColor:colors.background, width:WIDTH_BTN}]}
            placeholder="Entrez une description de votre nouveau ami (Optionel)"
            placeholderTextColor={colors.secondary}
            value={friendDescription}
            onChangeText={setFriendDescription}
        />
        <TouchableOpacity className="py-4 rounded-xl px-3" style={[{width:WIDTH_BTN,color:colors.text,backgroundColor:colors.primary}]} onPress={handleAddFriend}>
            <Text className="text-center font-medium text-2xl">Add friend</Text>

        </TouchableOpacity>
        </View>
       
        </SafeAreaView>



    );


   


}

export default friendForm;