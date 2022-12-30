import axios from "axios";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, ToastAndroid, Alert, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "./config";

function User(props){
    async function remove(){
        Alert.alert("Darkcak Admin", `Apakah kamu yakin akan menghapus "${props.title}?"`, [
            { text:"Cancel" }, { text:"OK", onPress:async () => {
                var id = await AsyncStorage.getItem("admin_id"),
                res = await axios.post(config.base_url + "/api/admin/admin/delete", { admin_id:id, username:props.title });
                console.log(config.base_url + "/api/admin/admin/delete");
                if(res.data.status) ToastAndroid.show("Admin berhasil dihapus!", ToastAndroid.SHORT);
                props.setCheck(false);
            }}
        ])
    }

    return(
        <View style={{ display:"flex", flexDirection:"row", borderBottomColor:"black", borderBottomWidth:1,
        paddingLeft:10, paddingVertical:5 }}>
            <View style={{ flex:8 }}>
                <Text style={{ color:"white", fontSize:18 }}>&nbsp;{props.title}</Text>
            </View>
            <View style={{ flex:2, backgroundColor:"rgb(50,50,50)", display:"flex", alignItems:"center", padding:5 }}>
                <TouchableOpacity onPress={remove}>
                   <View style={{ paddingVertical:5, paddingHorizontal:7, backgroundColor:"red", alignSelf:"flex-start" }}>
                     <Text style={{ textAlign:"center", color:"white", borderColor:"black" }}>Delete</Text>
                   </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Admins = () => {
    const [check, setCheck] = useState(false),
    [admins, setAdmins] = useState(null),
    [username, setUsername] = useState(""),
    [password, setPassword] = useState("");

    async function add(){
        Alert.alert("Darkcak Admin", `Apakah kamu yakin akan menambahkan user "${username}"?`, [
            { text:"Cancel" }, { text:"OK", onPress:async () => {
                var id = await AsyncStorage.getItem("admin_id"),
                res = await axios.post(config.base_url + "/api/admin/admin/add", {
                    admin_id:id,
                    username:username,
                    password:password
                });
        
                setUsername("");
                setPassword("");
                if(res.data.status) setCheck(false);
            }}
        ]);
    }
    useEffect(() => {
        if(!check) (async () => {
            var id = await AsyncStorage.getItem("admin_id"),
            res = await axios.post(config.base_url + "/api/admin/admin", { admin_id:id })
            if(res.data.status) setAdmins(res.data.data);
            setCheck(true);
        })();
    }, [check]);

    var inp = { fontSize:16, color:"white", borderColor:"black", borderWidth:1, paddingHorizontal:10, borderBottomWidth:0 };
    return(
        <View>
            <View style={{ display:"flex", flexDirection:"row", borderBottomColor:"black", borderBottomWidth:1 }}>
                <View style={{ flex:8 }}>
                    <TextInput style={inp} value={username} onChangeText={e => setUsername(e)} placeholder="Username"/>
                    <TextInput style={inp} value={password} onChangeText={e => setPassword(e)} placeholder="Password"/>
                </View>
                <View style={{ flex:2, display:"flex", justifyContent:"center", alignItems:"center", borderColor:"black", borderRightWidth:1, borderTopWidth:1 }}>
                    <TouchableOpacity onPress={add} style={{ backgroundColor:"cyan", paddingHorizontal:10, paddingVertical:5 }}>
                        <Text style={{ color:"black", fontSize:15 }}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
            { check ? admins.map((admin, i) => <User title={admin.username} setCheck={setCheck} key={i}/>) : <></>}
        </View>
    );
}

export default Admins;