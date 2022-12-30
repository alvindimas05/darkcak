import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Admins from "./pages/Admins";
import Report from "./pages/Reports";
import Notif from "./pages/Notifications";

const Stack = createStackNavigator();

var theme = {
  dark:true,
  colors:{
    primary:"rgb(30,30,30)"
  }
}
export default function App(){
  useEffect(Notif, []);
  return(
    <>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Users" component={Users}/>
          <Stack.Screen name="Posts" component={Posts}/>
          <Stack.Screen name="Reports" component={Report}/>
          <Stack.Screen name="Admins" component={Admins}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}