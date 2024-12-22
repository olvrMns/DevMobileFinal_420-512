import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraPermissions,CameraView} from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter,useGlobalSearchParams} from "expo-router"
import { useState,useEffect } from "react";
import { addFriend } from "../../lib/axios";

const cameraQrScanner=()=>{
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanned, setIsScanned] = useState(false);
    const router=useRouter();
    const glob = useGlobalSearchParams();
    
    const [isLoading, setIsLoading] = useState(false);

    


    const scanning=async({type,data})=>{
        if(isScanned){
            return;
        }
        setIsScanned(true)
        
        console.log("Hello",data);
        alert("QR Code Scanned");   
        try{
            await handleAddFriend(data)
            router.push(`../${glob.user}/privProfile`);
        }   catch(error){
            console.log("Error",error)
        }
    }
    const handleAddFriend=async(friendId)=>{
        if (isLoading) return; 
        setIsLoading(true);
        
        try{
            const addingFriend=await addFriend(glob.user,friendId)
            console.log("success in adding friend")
        }catch(error){
            console.log(error);
        }
        finally {
            
            setTimeout(() => {
                setIsScanned(false);
            }, 2000);  
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
            </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {router.back()}} >
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
  });

export default cameraQrScanner;