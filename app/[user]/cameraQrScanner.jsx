import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraPermissions,CameraView} from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter,useGlobalSearchParams} from "expo-router"
import { useState,useEffect } from "react";
import { addFriend, getIdFromJwt } from "../../lib/axios";
import Animated, { useAnimatedStyle, useSharedValue, withTiming,withRepeat} from 'react-native-reanimated';
import { useAuthContext } from "../../contexts/authContext";

const cameraQrScanner=()=>{
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanned, setIsScanned] = useState(false);
    const router=useRouter();
    const authContext = useAuthContext();
    //const glob = useGlobalSearchParams();
    
    const [isLoading, setIsLoading] = useState(false);

    const scanLineAnimation=useSharedValue(-280);

    useEffect(() => {
    }, []);

    const animatedStyle=useAnimatedStyle(()=>({
        transform:[{translateY:scanLineAnimation.value}]
    }))


    const scanning=async({type,data})=>{
        if(isScanned){
            return;
        }
        setIsScanned(true);
        scanLineAnimation.value=-280;
        
        scanLineAnimation.value=withRepeat(
            withTiming(0,{duration:1000}),
            2,
            true);
        
        console.log("Hello",data);  
        try{
            await handleAddFriend(data)
            setTimeout(()=>{
                router.push(`../.../privProfile`);
                alert("QR Code Scanned"); 
            },2500)
            
        }   catch(error){
            console.log("Error",error)
        } finally{
            setTimeout(()=>{
                scanLineAnimation.value=-280;
                setIsScanned(false);
            },2500)
        }
    }
    const handleAddFriend=async(friendId)=>{
        if (isLoading) return; 
        setIsLoading(true);
        
        try{
            const addingFriend=await addFriend(authContext.userId,friendId)
            console.log("success in adding friend")
        }catch(error){
            console.log(error);
        }
        
    }
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }

      if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }

return (
    <SafeAreaView style={styles.container}>
        <Text>QR code scanner to add friend</Text>
        <CameraView  style={styles.camera} 
       
        onBarcodeScanned={isScanned?undefined:scanning}
        >
            <View style={styles.overlay}>
            <View style={styles.scannerWindow}></View>
            <Animated.View style={[styles.scanLineAnimation,animatedStyle]}/>
            </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {router.push(`../${authContext.userId}/privProfile`)}} >
            <Text style={styles.text}>Exit</Text>
          </TouchableOpacity>
          </View>

        </CameraView>
       
    </SafeAreaView>
)


}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    scannerWindow: {
        width: '80%', 
        height: '40%',
        borderWidth: 2,
        borderColor: '#fff',
    },
    scanLineAnimation:{
        width:'80%',
        height: '40%',
        height:2,
        backgroundColor:'white',
    },
  });

export default cameraQrScanner;