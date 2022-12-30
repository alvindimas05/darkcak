import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking, Alert, TextInput, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "./config";

function Post(props){
    var data = props.data;

    async function category(category){
        ToastAndroid.show("Loading...", ToastAndroid.SHORT);
        var res = await axios.post(config.base_url + "/api/admin/post/category", {
            admin_id:await AsyncStorage.getItem("admin_id"),
            post_id:data.post_id,
            category:category
        });
        if(res.data.status) props.setCheck(false);
    }
    return(
        <View style={{ display:"flex", flexDirection:"row", borderBottomColor:"black", borderBottomWidth:1 }}>
            <TouchableOpacity underlayColor="none" onPress={() => Linking.openURL(config.base_url + "/g/" + data.post_id)}
            style={{ paddingVertical:10, paddingHorizontal:15, backgroundColor:"rgb(50,50,50)", flex:55 }}>
                <View>
                    <Text style={{ color:"white", fontSize:18 }}>{data.title}</Text>
                    <Text style={{ color:"white", fontSize:14 }}>{data.username}</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flex:20, backgroundColor:"rgb(50,50,50)", display:"flex", alignItems:"center", padding:5 }}>
                <TouchableOpacity onPress={() => category("hide")}>
                   <View style={{ paddingVertical:5, paddingHorizontal:7, backgroundColor:"lime", alignSelf:"flex-start" }}>
                        <Text style={{ textAlign:"center", color:"black", borderColor:"black" }}>
                            { data.category.includes("hide") ? "Unhide" : "Hide" }
                        </Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop:5 }} onPress={async () => {
                    ToastAndroid.show("Loading...", ToastAndroid.SHORT);
                    var res = await axios.post(config.base_url + "/api/admin/post/delete", {
                        admin_id:await AsyncStorage.getItem("admin_id"),
                        post_id:data.post_id
                    });
                    if(res.status.data) props.setCheck(false);
                }}>
                   <View style={{ paddingVertical:5, paddingHorizontal:7, backgroundColor:"red", alignSelf:"flex-start" }}>
                     <Text style={{ textAlign:"center", color:"white", borderColor:"black" }}>
                        { data.deleted ? "Restore" : "Delete" }
                     </Text>
                   </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex:25, backgroundColor:"rgb(50,50,50)", display:"flex", alignItems:"center", padding:5 }}>
                <TouchableOpacity onPress={() => category("nsfw")}>
                   <View style={{ paddingVertical:5, paddingHorizontal:7, backgroundColor:"cyan", alignSelf:"flex-start" }}>
                     <Text style={{ textAlign:"center", color:"black", borderColor:"black" }}>
                        { data.category.includes("nsfw") ? "UnNSFW" : "NSFW" }
                     </Text>
                   </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop:5 }} onPress={() => category("gore")}>
                   <View style={{ paddingVertical:5, paddingHorizontal:7, backgroundColor:"yellow", alignSelf:"flex-start" }}>
                     <Text style={{ textAlign:"center", color:"black", borderColor:"black" }}>
                        { data.category.includes("gore") ? "UnGore" : "Gore" }
                     </Text>
                   </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const Posts = ({navigation}) => {
    const [data, setData] = useState(null),
    [search, setSearch] = useState(0),
    [check, setCheck] = useState(false);

    useEffect(() => {
        if(!check && search) (async () => {
            var post = await axios.get(`${config.base_url}/api/post/id?post_id=${search}`);
            if(post.data.status) setData(post.data.data);
            setCheck(true);
        })();
    }, [check, search]);
    return(
        <View>
            <View>
                <TextInput style={{ fontSize:16, color:"white", borderColor:"black", borderWidth:1, paddingHorizontal:10 }} 
                keyboardType="number-pad" placeholder="Search by id post" onChangeText={e => {
                    setSearch(e);
                    setCheck(false);
                }}/>
            </View>
            { check && search ? <Post data={data} setCheck={setCheck}/> : <></>}
        </View>
    );
}

export default Posts;