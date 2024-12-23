import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions,ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { getAllFriendsByUserId } from '../../lib/axios'
import {useGlobalSearchParams } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const renderFriends = ({item}) => {
    console.log("Rendering friend:", item); 
    return (
      <SafeAreaView className="flex-row w-full py-2 pl-16">
        <View className="flex-col justify-center"/>
        <Text className="p-1" style={{color:colors.text}}>{item.username} |</Text>
        <Text className="p-1"  style={{color:colors.text}}>{item.email} |</Text>
        <Text className="p-1"  style={{color:colors.text,flexWrap:"wrap",flex:1}}>{item.friendDescription || "No description"}</Text>
      
      </SafeAreaView>
    )
  }

  return (
    <View>
        {loading ? (
      <ActivityIndicator size="large" color={colors.text} />
    ) : (
        <>
        <Text>Friends list</Text>
        <View className="flex-row">
        <Text className="flex-1 text-center">Username</Text>
        <Text className="flex-1 text-center">Email</Text>
        <Text className="flex-1 text-center">Description</Text>
        </View>
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