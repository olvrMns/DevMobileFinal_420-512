import { Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"



export default GameProfil = (props) => {


    return(
        <SafeAreaView>
            <Text>
                {props.game.name}
            </Text>
        </SafeAreaView>
    )
}