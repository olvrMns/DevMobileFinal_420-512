import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions} from 'react-native'
import { useTheme } from '../../contexts/ThemeContext'
import OverlayMessage from '../../components/OverlayMessage'
import { colorsPalette } from '../../assets/colorsPalette'
import {useGlobalSearchParams, useRouter } from 'expo-router';
import { fetchProfileData, setToken, updateProfileData, deleteUserById } from '../../lib/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing, withSpring} from 'react-native-reanimated';

const profile = () =>{
    const {theme} = useTheme();
    const colors = colorsPalette[theme];
    const glob = useGlobalSearchParams();
    const router = useRouter()

    const [username,setUsername] = useState("Default")
    const [email,setEmail] = useState('Default@abc.ca')
    const [profilePic, setProfilePic] = useState('chiot1')

    const [isEditing,setIsEditing] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [messageVisible, setMessageVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isEditSuccess, setIsEditSuccess] = useState(false)

    useEffect(() => {
        // Fetch profile data
    
          const loadData = async () => {
            try{
              const profileData = await fetchProfileData(glob.user);
              if(!profileData) throw new Error('Failed fetching data -> no Data')
              setUsername(profileData.username);
              setEmail(profileData.email);
    
              
            }catch(error){
              console.log('Profile : Failed Loading profileData : ', error)
              router.push("/auth/signin")
            }
          };
          loadData();
        
        setIsMounted(true); 
    
        return () => {
          setIsMounted(false); // Clean up on unmount
        };
      }, []);

       //Saves and gives a feedback to user
  const handleSave = async () => {
    
    isSaved = false
    const saveProfileData = async () => {
      console.log("ici")
      const userData = {
        username,
        email,
        user_id: glob.user
      }
      try{
        isSaved = await updateProfileData(userData);
      }catch(error){
        console.log("Saving Error : " , error)
        isSaved = false
      }
      return isSaved
    }
    setIsEditSuccess(await saveProfileData())
    // setMessageVisible(true);
    //Works but still display an error, TO FIX  
    setTimeout(() => {
      setMessageVisible(false);
    }, 2000); 
   
  };

  
  //Handle changes in editing/non-editing mode
  useEffect(()=>{
    if(!isMounted) return
    if(!isEditing){
      handleSave()
    }
  },[isEditing,theme])

  // const supprimerUser = async () => {
  //   try{
  //     const deleteUser = await deleteUserById(glob.user)
  //     logOut()
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  const logOut = () => {
    setToken('')
    router.push('/')
  }

  const width = useSharedValue(350);
  const height = useSharedValue(170);

  const goingToMenu = () => {
    console.log("menu opening");
    router.push("/../../pages/menu");
  }
  const handleGamesPress = () => {
    width.value = width.value + 90;
    height.value = height.value + 90;
    setTimeout(goingToMenu, 1500)
    
  }

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(width.value, {duration:500}),
    height: withTiming(height.value, {duration:500}),
  }));

  


  return (
    <>
      <View className="h-full pb-16" style={{backgroundColor:colors.background_c1}}>
        <ScrollView>
        <View className="w-full" >
        <View className="justify-between text-center items-center flex-row mt-16">
          <View className="flex-col items-start justify-start text-center" >
            {/* USERNAME */}
            {!isEditing ?
                  <Text className="text-4xl px-16 text-center font-serif" >{username}</Text>
                  :
                  <TextInput
                  className="text-5xl px-16 text-center font-serif text-red-500 underline" 
                  onChangeText={(item) => {setUsername(item)}}
                  placeholder="Entrez l'identifiant"
                  placeholderTextColor={colors.secondary}
                  value={username}
                  
                  />
                  
              } 
              {/* EMAIL */}
                {!isEditing ?
                  <Text className="text-base px-16 text-center font-serif" >{email}</Text>
                  :
                  <TextInput
                  className="text-lg px-16 text-center font-serif text-red-500 underline" 
                  onChangeText={(item) => {setEmail(item)}}
                  placeholder="Entrez l'identifiant"
                  placeholderTextColor={colors.secondary}
                  value={email}
                  />
              }
          </View>
              
            <View>
              <TouchableOpacity onPress={logOut} className=" items-center justify-center h-16 w-16 mr-6 rounded-2xl bg-orange-500">
                <Icon  name="sign-out-alt" size={30} color={colors.lightText} />
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=>{setIsEditing((prev)=>{return !prev})}} className=" items-center justify-center h-16 w-16 mr-6 rounded-2xl mt-2 bg-orange-500" >
                <Icon  name="edit" size={30}  color={colors.lightText}/>
              </TouchableOpacity>  
              <TouchableOpacity className=" items-center justify-center h-16 w-16 mr-6 rounded-2xl mt-2 bg-orange-500" >
                <Icon  name="qrcode" size={30}  color={colors.lightText}/>
              </TouchableOpacity>  
            </View>
            
            
              
            </View>
          
          <View className="items-center">
           
          </View>
        </View>

        <View className="w-full items-center mt-20">
          <View className=""/>

          <View className="text-center flex-row mt-10">
            {/* MAP 3 FAV GAMES HERE (WHEN READY**) */}
            <View className="items-center">
              <Image id='gameImages' className="w-32 h-32 mx-2" source={require("../../assets/splash-icon.png")}></Image>
              <Text id='gameName' className="">Nom de jeu 1</Text>
            </View>
            <View className="items-center">
              <Image id='gameImages' className="w-32 h-32 mx-2" source={require("../../assets/splash-icon.png")}></Image>
              <Text id='gameName' className="">Nom de jeu 2</Text>
            </View>
            <View className="items-center">
              <Image id='gameImages' className="w-32 h-32 mx-2" source={require("../../assets/splash-icon.png")}></Image>
              <Text id='gameName' className="">Nom de jeu 3</Text>
            </View>
            
          </View>

          <Animated.View className="flex-row items-center justify-center align-middle" style={[animatedStyle]}>
            <TouchableOpacity onPress={handleGamesPress} className="bg-orange-500 items-center justify-center w-5/6 p-10 rounded-full text-white flex-row ">
              <Text className="text-white font-bold text-2xl">Navigate games</Text>
              <Icon name='gamepad' size={40} className="ml-6" color={colors.lightText}/>
            </TouchableOpacity>
          </Animated.View>
          
        </View>
        </ScrollView>
        
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        >
        
        <TouchableOpacity 
          style={{backgroundColor: 'rgba(0, 0, 0, 0.25)'}}
          className="flex-1 items-center justify-end   " 
          onPress={() => setIsModalVisible(false)}
        >
          <View className="w-full h-1/3">
           
          </View>            
        </TouchableOpacity>
      </Modal>
      <OverlayMessage
        message= {isEditSuccess ? "Changes saved successfully!" : "Error changes did not save"}
        styles={isEditSuccess ?   {backgroundColor:"#bbf7d0",borderColor:"#22c55e"}  : {backgroundColor:"#fecaca",borderColor:"#dc2626"} }
        visible={messageVisible}
        onDismiss={() => {setMessageVisible(false)}}
      />
     </>
    )
  }
  
  export default profile