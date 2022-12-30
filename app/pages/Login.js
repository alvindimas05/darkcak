import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, ToastAndroid, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import config from "./config";

const Login = ({navigation}) => {
  const [username, setUsername] = useState(""),
  [password, setPassword] = useState("");

  var inp = { borderColor:"white", marginTop:5, borderWidth:1, color:"white", width:"75%", paddingVertical:4, paddingHorizontal:8 },
  txt = { fontSize:17, marginTop:3, color:"white"};
  
  async function login(){
    var res = await axios.post(config.base_url + "/api/admin/admin/login", {
        username:username,
        password:password
    });
    if(res.data.status){
      await AsyncStorage.setItem("admin_id", res.data.admin_id);
      await AsyncStorage.setItem("role_id", "" + res.data.role_id);
      navigation.navigate("Home");
    } else Alert.alert("Darkcak Admin", "Username atau password salah!");
  }

  useEffect(() => {
    (async () => {
      if(await AsyncStorage.getItem("admin_id") && await AsyncStorage.getItem("role_id"))
      navigation.navigate("Home");
    })();
  }, [navigation]);
  return(
    <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
      <Text style={{ fontSize:26, color:"white", fontWeight:"500" }}>Login Darkcak</Text>
      <Text style={txt}>Username</Text>
      <TextInput style={inp} onChangeText={e => setUsername(e)} placeholder="Username"/>
      <Text style={txt}>Password</Text>
      <TextInput style={inp} onChangeText={e => setPassword(e)} secureTextEntry={true} placeholder="Password"/>
      <TouchableOpacity onPress={login} underlayColor="none" style={{ backgroundColor:"white", paddingVertical:5, 
      paddingHorizontal:10, marginTop:10, borderColor:"black", borderWidth:1, borderRadius:5 }}>
        <Text style={{ color:"black", fontSize:18 }}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;