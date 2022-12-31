import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import Logout from "./Logout";

const Home = ({navigation}) => {
    const [admin, setAdmin] = useState(false),
    [check, setCheck] = useState(false);

    function Btn(props){
        return(
            <TouchableOpacity ctiveOpacity={.7} underlayColor="none" style={{ paddingVertical:10,
            paddingHorizontal:15, backgroundColor:"rgb(50,50,50)", borderBottomColor:"black",
            borderBottomWidth:1 }} onPress={ props.onPress ? props.onPress : () => navigation.navigate(props.title) }>
                <View>
                    <Text style={{ color:"white", fontSize:18 }}>{props.title}</Text>
                    <Text style={{ color:"white", fontSize:14 }}>{props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        if(!check) (async () => {
            var role = await AsyncStorage.getItem("role_id");
            if(parseInt(role) === 1) setAdmin(true);
            setCheck(true);
        })();
    }, [check]);

    return(
        <View style={{ borderTopColor:"black", borderTopWidth:1 }}>
            <Btn title="Reports" text="Mengecek laporan-laporan dari user"/>
            <Btn title="Posts" text="Search dan cek postingan-postingan user"/>
            <Btn title="Users" text="Search dan cek akun-akun user"/>
            { check && admin && <Btn title="Admins" text="Cek akun-akun admin"/>}
            <Btn title="Log out" text="Log out dari aplikasi" onPress={Logout}/>
        </View>
    );
}

export default Home;