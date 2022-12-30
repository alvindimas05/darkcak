import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, ToastAndroid, Alert, Linking, TextInput } from "react-native";
import prompt from "react-native-prompt-android";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "./config";

function User(props){
    var data = props.data;
    function warn(){
        if(!data.warn){
            prompt("Darkcak Admin", `Masukkan pesan peringatan kepada "${data.username}"?\nKamu tidak bisa mengganti peringatan selama 3 hari setelah memberi peringatan!`, [
                { text:"Cancel" }, { text:"OK", onPress:async e => {
                    ToastAndroid.show("Loading...", ToastAndroid.SHORT);
                    await axios.post(config.base_url + "/api/admin/user/warn", {
                        admin_id:await AsyncStorage.getItem("admin_id"),
                        username:data.username,
                        warn:e
                    });
                } }
            ],{ cancelable:false, placeholder:"Pesan Peringatan" });
        }
        else Alert.alert("Darkcak Admin", "Kamu harus menunggu setidaknya 3 hari sebelum mengganti peringatan!");
    }
    function ban(){
        Alert.alert("Darkcak Admin", `Apakah kamu yakin akan ${data.banned ? "unbanned" : "membanned"} "${data.username}"?`, [
            { text:"Cancel" }, { text:"OK", onPress:async () => {
                ToastAndroid.show("Loading...", ToastAndroid.SHORT);
                await axios.post(config.base_url + "/api/admin/user/ban", {
                    admin_id:await AsyncStorage.getItem("admin_id"),
                    username:data.username,
                    banned:!data.banned
                });
            } }
        ], { cancelable:false });
    }

    return(
        <View style={{ display:"flex", flexDirection:"row", borderBottomColor:"black", borderBottomWidth:1 }}>
            <TouchableOpacity underlayColor="none" style={{ paddingVertical:10, paddingHorizontal:15, 
                backgroundColor:"rgb(50,50,50)", flex:80 }} onPress={() => Linking.openURL(config.base_url + "/u/" + data.username)}>
                <View style={{ display:"flex", flexDirection:"row" }}>
                    <Image style={{ width:50, height:50, borderRadius:25 }} resizeMode="cover" 
                    source={{ uri:data.image.data ? `data:${data.image.contentType};base64,${data.image.data}` : "https://via.placeholder.com/300" }}/>
                    <Text style={{ color:"white", fontSize:18 }}>&nbsp;&nbsp;{data.username}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flex:20, backgroundColor:"rgb(50,50,50)", display:"flex", alignItems:"center", padding:5 }}>
                <TouchableOpacity onPress={warn}>
                   <View style={{ paddingVertical:5, paddingHorizontal:7, backgroundColor:"yellow", alignSelf:"flex-start" }}>
                     <Text style={{ textAlign:"center", color:"black", borderColor:"black" }}>Warn</Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ban} style={{ marginTop:5 }}>
                   <View style={{ paddingVertical:5, paddingHorizontal:7, backgroundColor:"red", alignSelf:"flex-start" }}>
                     <Text style={{ textAlign:"center", color:"black", borderColor:"black" }}>Ban</Text>
                   </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Users = () => {
    const [data, setData] = useState(null),
    [search, setSearch] = useState("");
    return(
        <View>
            <TextInput style={{ fontSize:16, color:"white", borderColor:"black", borderWidth:1, 
            paddingHorizontal:10 }} placeholder="Search by username" 
            onChangeText={e => setSearch(e)} onSubmitEditing={async () => {
                ToastAndroid.show("Loading...", ToastAndroid.SHORT);
                var res = await axios.get(config.base_url + "/api/user/profile?username=" + search);
                if(res.data.status) setData({...res.data.data, username:search});
            }}/>
            { data && search && <User data={data}/> }
        </View>
    );
}

export default Users;