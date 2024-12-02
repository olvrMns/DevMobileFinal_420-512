import React from 'react'
import { Stack,Link } from 'expo-router';
import { SafeAreaView } from 'react-native';


const RootLayout = () => {

    return (
      <>
      <>
        <SafeAreaView>
            <Link rel="stylesheet" href="index" >Go to index</Link>
        </SafeAreaView>
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            
        </Stack>
    </>
      </>
    )
  }
  
  export default RootLayout