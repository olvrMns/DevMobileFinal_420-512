import {Text, View, TextInput, Dimensions, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform} from 'react-native'
import React, {useState} from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { colorsPalette } from '../../assets/colorsPalette'
import { TouchableOpacity } from 'react-native'
import { useRouter, Link} from 'expo-router'
import { setToken, signUp } from '../../lib/axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context'

const  WIDTH_BTN = Dimensions.get('window').width - 56

const SignUp = () => { 

    return (

        <SafeAreaView  className="flex-1 items-center">
            <ScrollView>
                <Text>GameList</Text>
                <Text>Email</Text>
                <Text>Password</Text>
            </ScrollView>
        </SafeAreaView>
    )
}