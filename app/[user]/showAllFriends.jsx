import { Image, Text, View, TextInput, ScrollView,TouchableOpacity, Modal, FlatList, Dimensions,ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { getAllFriendsByUserId, updateFriendDescription } from '../../lib/axios'
import {useGlobalSearchParams } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
const showAllFriends=()=>{
    const [friends, setFriends] = useState([]);
    const glob = useGlobalSearchParams();
    const {theme} = useTheme()
    const colors = colorsPalette[theme]
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [description,setDescription]=useState("");
    const [isEditSuccess, setIsEditSuccess] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);
    const [editingFriendId, setEditingFriendId] = useState(null);
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

      const handleEdit=(friendId,description)=>{
        if (editingFriendId === friendId) {
            handleSave(friendId);

        }
        else{
        setEditingFriendId(friendId);
        setDescription(description);
        }
        

      }

       
  const handleSave = async (friendId) => {
    let isSaved=false;
        
          
      try{
        const updateFriends=[...friends];
        updateFriends.forEach((friend,index)=>{
          if(friend.user_id===friendId){
              updateFriends[index].friendDescription=description;
          }
        })
 
         isSaved = await updateFriendDescription(glob.user,friendId,description);

        if (isSaved) {
            setIsEditSuccess(true);
            setEditingFriendId(null);
      
          
        } else {
            setIsEditSuccess(false);
        }
        return isSaved;
        
       
      }catch(error){
        console.log("Saving Error : " , error)
      
        setIsEditSuccess(false);
      }
      return isSaved
    
    
  };

 


  const renderFriends = ({item}) => {
    console.log("Rendering friend:", item); 
    return (
      <SafeAreaView className="flex-row w-full py-2 pl-16">
        <View className="flex-col justify-center"/>
        <Text className="p-1" style={{color:colors.text}}>{item.username} |</Text>
        <Text className="p-1"  style={{color:colors.text}}>{item.email} |</Text>
        {editingFriendId !==item.user_id?(
            <Text className="p-1"  style={{color:colors.text,flexWrap:"wrap",flex:1}}>{item.friendDescription || "No description"}</Text>
        ):(
         <TextInput
                          className="text-5xl px-16 text-center font-serif text-red-500 underline" 
                          onChangeText={setDescription}
                          placeholder="Entrez le nouveau description"
                          placeholderTextColor={colors.secondary}
                          value={description}
                          />
        )}
        <TouchableOpacity onPress={()=>{handleEdit(item.user_id,item.friendDescription || "")}} className=" items-center justify-center h-16 w-16 mr-6 rounded-2xl mt-2 bg-orange-500" >
        <Icon  name="edit" size={30}  color={colors.lightText}/>
        </TouchableOpacity> 
        
      
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