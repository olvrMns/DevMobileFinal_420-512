import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions,ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { getAllFriendsByUserId } from '../../lib/axios'
import {useGlobalSearchParams } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'

const showAllFriends=()=>{
    const [friends, setFriends] = useState([]);
    const glob = useGlobalSearchParams();
    const {theme} = useTheme()
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

  return (
    <View>
        {loading ? (
      <ActivityIndicator size="large" color={colors.text} />
    ) : (
        <>
        <Text>Friends list</Text>
        <FlatList
        data={friends}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={renderFriends}
        
        />
        </>
         )}
    </View>


  )


}

export default showAllFriends;