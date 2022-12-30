import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import config from "./config";

const Reports = () => {
    const [data, setData] = useState(false),
    [check, setCheck] = useState(false);

    function Report(props){
        var data = props.data;
        return(
            <View activeOpacity={.7} underlayColor="none" style={{ paddingVertical:10,
            paddingHorizontal:15, backgroundColor:"rgb(50,50,50)", borderBottomColor:"black",
            borderBottomWidth:1 }}>
                <Text style={{ color:"white", fontSize:16 }}>From : {data.from}</Text>
                <Text style={{ color:"white", fontSize:16 }}>Type : {data.type === 1 ? "Post" : "Comment"}</Text>
                {data.type === 2 && <Text style={{ color:"white", fontSize:16 }}>To : {data.to}</Text>}
                <Text style={{ color:"white", fontSize:16 }}>Post ID : {data.post_id}</Text>
                <Text style={{ color:"white", fontSize:16 }}>Reason : {data.reason}</Text>
            </View>
        );
    }

    useEffect(() => {
        if(!check) (async () => {
            var res = await axios.get(config.base_url + "/api/admin/report?admin_id=" + 
            await AsyncStorage.getItem("admin_id"));
            if(res.data.status) setData(res.data.data);
            setCheck(true);
        })();
    }, [check]);

    return(
        <View style={{ borderTopColor:"black", borderTopWidth:1 }}>
            { check && data.map((dat, i) => <Report data={dat} key={i}/>) }
        </View>
    );
}

export default Reports;