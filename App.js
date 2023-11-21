 import {View,Text} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import Home from "./components/Home";
import Welcome from "./components/Welcome";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="LogineScreen">
         <Stack.Screen name="LoginScreen" component={LoginScreen} />
         <Stack.Screen name="Welcome" component={Welcome} />
         <Stack.Screen name="Home" component={Home} />
       
       </Stack.Navigator>
     </NavigationContainer>
   
  );
}

