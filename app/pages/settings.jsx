import { Text, Switch, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSettingsContext } from "../../contexts/settingsContext"


export default SettingsPage = () => {
    const settingsContext = useSettingsContext();
    

    return(
        <SafeAreaView className="w-full h-full">
            <View className="flex-row w-1/2">
                <Text>SHOW PLATFORMS</Text>
                <Switch value={settingsContext.showPlatforms} onValueChange={settingsContext.toggle}/>
            </View>
        </SafeAreaView>
    )
}