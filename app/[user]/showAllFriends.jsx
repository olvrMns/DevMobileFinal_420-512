import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions,ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { getAllFriendsByUserId } from '../../lib/axios'
import {useRouter, useGlobalSearchParams } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import Icon from 'react-native-vector-icons/FontAwesome5';

const showAllFriends=()=>{
    const [friends, setFriends] = useState([]);
    const glob = useGlobalSearchParams();
    const {theme} = useTheme()
    const router = useRouter();
    const colors = colorsPalette[theme]
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
    const loadFriends=async () => {
        try{
            setLoading(true);
            const friendsData=await getAllFriendsByUserId(glob.user);
            setFriends(friendsData.result);
            setLoading(false);
        }catch (error){
            console.log("Failed to load friends ",error)
        }
    }


   
        loadFriends();
        setIsMounted(true); 

        return () => {
          setIsMounted(false); // Clean up on unmount
        };
      }, []);

   
   
      useEffect(() => {
        console.log("Friends state:", friends); // Log after data is set
      }, [friends]);
    
  const renderFriends = ({item}) => {
    console.log("Rendering friend:", item); 
    return (
      <View className="flex-row w-full py-2 pl-16">
        <View className="w-4 h-full mx-3 rounded-full"/>
        <Text style={{color:colors.text}}>{item.username}</Text>
        <Text style={{color:colors.text}}>{item.email}</Text>
      </View>
    )
  }

  const handleCamera = () =>{
    router.push(glob.user + "/" + "cameraQrScanner");
  }
  const handleForm = () =>{
    router.push(glob.user + "/" + "friendForm");
  }

  return (
    <>
      <View>
          
        <View className="">
          <View className="w-16 flex-row justify-between">
            <TouchableOpacity className="items- mx-2" onPress={handleCamera}>
              <Icon name="camera" size={30}></Icon>
            </TouchableOpacity>
            <TouchableOpacity className="items-center mx-2" onPress={handleForm}>
              <Icon name="plus" size={30}></Icon>
            </TouchableOpacity>
          </View>
          
            {loading ? (
          <ActivityIndicator size="large" color={colors.text} />
        ) : (
            <>
            <Text className="mt-10 text-center text-orange-500 font-bold text-4xl ">Friends list</Text>
            <FlatList className="mt-10"
            data={friends}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={renderFriends}
            
            />
            </>
            )}
        </View>
      </View>
    </>

  )


}

export default showAllFriends;