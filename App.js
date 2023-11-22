import {View,Text, Button} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import Home from "./components/Home";
import Welcome from "./components/Welcome";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerBackTitleVisible: false,headerLeft: null,}}/>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerBackTitleVisible: false,headerLeft: null,}}/>
      <Stack.Screen name="Home" component={Home} options={{headerBackTitleVisible: false,headerLeft: null,}}/>

    </Stack.Navigator>
  </NavigationContainer>
   
  );
}

