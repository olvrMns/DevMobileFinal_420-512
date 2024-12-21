import { Image, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"



export default GameProfil = (props) => {


    return(
        <SafeAreaView>
            <Image className="" source={{uri: props.game.background_image}}/>
            <Text className="">{props.game.name}</Text>
            <Text>{props.game.rating}</Text>
            <Text>{props.game.rating_top}</Text>
            <Text>{props.game.platforms}</Text>
        </SafeAreaView>
    )
}