import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, BackHandler } from "react-native";

const Logout = () => {
    Alert.alert("Darkcak Admin", "Apakah kamu yakin ingin log out?", 
    { text:"No" }, { text:"Yes", onPress:async () => {
        await AsyncStorage.removeItem("admin_id");
        await AsyncStorage.removeItem("role_id");
        BackHandler.exitApp();
    } });
};

export default Logout;