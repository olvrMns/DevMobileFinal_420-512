import QRCode from 'react-native-qrcode-svg';
import { View,Text, TouchableOpacity } from 'react-native';
import { useRouter, useGlobalSearchParams } from 'expo-router';

const qrCodeUser=()=>{
    const glob = useGlobalSearchParams();


    const router = useRouter();

    const handleGoBack = () => {
        router.push(glob.user + "/" + "privProfile")
    }

    return (
        <View className="flex-col items-center">
            <TouchableOpacity onPress={handleGoBack}><Text>Go back to profile</Text></TouchableOpacity>
            <Text className="text-5xl text-center my-10 text-orange-600 font-bold ">Your QR code</Text>
            <QRCode className=""
            value={glob.user}
            size={250}
            color='black'
            backgroundColor='white'/>
            <Text className="capitalize text-lg text- text-center w-full my-10 font-bold ">Let this qr code be scanned to add a friend!</Text>
        </View>
    )

}
export default qrCodeUser;