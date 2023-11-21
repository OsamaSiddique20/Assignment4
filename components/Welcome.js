import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";


const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/fb/72/64/fb726493efc4b24dd170064c7fb6c756.jpg' }}
          style={{ width: 200, height: 130 ,marginBottom:300}}
        />

      <TouchableOpacity
        style={styles.button}
        onPress={()=>navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}
        
        >Continue </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  button: {
    width: "70%",
    alignItems: "center",
    backgroundColor: "#0782F9",
    borderRadius: 10,
    padding: 15,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonOutLine: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    fontSize: 16,
  },
  buttonOutLineText: {
    fontWeight: "700",
    color: "#0782F9",
    fontSize: 16,
  },
});
