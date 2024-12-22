import QRCode from 'react-native-qrcode-svg';
import {useGlobalSearchParams } from 'expo-router';
import { View,Text } from 'react-native';
const qrCodeUser=()=>{
    const glob = useGlobalSearchParams();
    console.log(glob.user);
    
    return (
        <View>
            <Text>Your QR code</Text>
            <QRCode
            value={glob.user}
            size={250}
            color='black'
            backgroundColor='white'/>
            <Text>Let this qr code be scanned to become friend</Text>
        </View>
    )

}
export default qrCodeUser;