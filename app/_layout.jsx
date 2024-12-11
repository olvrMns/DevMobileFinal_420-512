import React from 'react'
import { Stack,Link } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerHeader from '../components/CustomDrawerHeader';
import { ThemeProvider } from '../contexts/ThemeContext';

import "../global.css"; 

const RootLayout = () => {
  return (
    <ThemeProvider>
       <Layout/>
    </ThemeProvider>
    
    
  )
}


const Layout = () => {

    return (
      <>
              <GestureHandlerRootView className="flex-1" >
          <Drawer 
              screenOptions={{
                swipeEnabled:true,
                headerShown:false,

              
              }
            }>
              <Drawer.Screen name="index" options={{headerShown:false}} />
              <Drawer.Screen name="auth" options={{headerShown:false}} />
          </Drawer>
        </GestureHandlerRootView>

      </>
    )
  }
  
  export default RootLayout