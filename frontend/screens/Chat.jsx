import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Chat = ({navigation}) => {
    return(
        <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
        <Ionicons name={"arrow-back"} size={40} onPress={() => navigation.navigate("Messages")}/>
        <Text>This is your chat with</Text>
        </View>
    )
}

export default Chat;