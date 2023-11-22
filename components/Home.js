import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  Modal,
  ScrollView,
  Pressable,Alert
} from "react-native";
import React, { useEffect, useState } from "react";

import { signOut } from "firebase/auth";
import {doc, setDoc,getDocs, collection,deleteDoc, addDoc,docRef,onSnapshot,getDoc} from "firebase/firestore";

import { auth, db, storage } from "./config";
import { ref, getDownloadURL } from "firebase/storage";
import { Card } from "@rneui/themed";
import { Avatar } from "@rneui/base";
import { Dropdown } from "react-native-element-dropdown";

export default function Home({ navigation }) {
  const [itemName, setItemName] = useState();
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState();
  const [ob, setOb] = useState();
  const [value, setValue] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [fetchedData,setFetchedData] = useState([])
  const data = [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "White", value: "white" },
    { label: "Black", value: "black" },
    { label: "Yellow", value: "yellow" },
  ]
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Button
          onPress={() => navigation.navigate("LoginScreen")}
          title="Sign Out"
        />
      ),
      headerTitleAlign: "center",
    });

  }, [navigation]);

  useEffect(()=>
  {

          const collectionRef = collection(db, 'Assignment4');

          const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
              const newData = snapshot.docs.map((doc) => doc.data());
              console.log('From DB\t', newData);
              setFetchedData(newData);
          });   
  }, [])
  //************************************ */

  //************************************* */
  const readAll = async () => {
    
    
  }

  //************************************* */

  const clear = () => {
   
    setItemName('')
    setPrice(0)
    setValue(null)
    setOb(null)
  }
  //************************************* */

  const create = async () => {
          console.log(itemName,price,value)
  
          const docRef = doc(collection(db, 'Assignment4'), itemName)
          await setDoc(docRef, {name:itemName,price:price,color:value})
          console.log('Document written with ID: ', itemName)
          clear()
  }

  //************************************* */

  //delete row
  const deleteUser = async (id) => {
    alert('Data deleted');
    await deleteDoc(doc(db, "Assignment4", id));
    console.log('Document deleted sucessfully with doc id',id)
    
    clear()
  }

  //************************************* */
  const edit = async(id) => {
    setModalVisible(true)
    console.log(id)
    const docRef = doc(db, 'Assignment4', id);
    const docSnap = (await getDoc(docRef)).data()
    setValue(docSnap.color)
    setItemName(docSnap.name)
    setPrice(docSnap.price)
    console.log(docSnap)
    
  };
  //************************************* */

  const update = async  => {
    alert('Data Updated');
    setModalVisible(false)

    create()
    clear()
  }
  //************************************* */

  const friend = (doc) => {
    return (
      <View key={doc.itemName}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Avatar
           
          />
          <Text style={styles.text}>{doc.itemName}</Text>
          <View style={{ flexDirection: "row" }}>
           
          </View>

          <Text
           
            style={{ alignSelf: "center", fontSize: 16, color: "orange" }}
          >
            Edit
          </Text>

          <Text
          
            style={{ alignSelf: "center", fontSize: 16, color: "red" }}
          >
            Delete
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* *********************************************** */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
             
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
            <TextInput
              style={styles.input}
              value={itemName}
              onChangeText={text =>  setItemName(text)}
              editable={false}
              placeholder="Item Name"

              autoFocus={true}
            />
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text =>  setPrice(text)}
              placeholder="Price"
      
            
            />

          <Dropdown
              data={data}
              style={[styles.input, { width: "100%" }]}
              search
              selectedTextStyle={{ fontSize: 20 }}
              searchPlaceholder="Search..."
              value={value}
              onChange={item => { setValue(item.value);}}
              labelField="label"
              valueField="value"
            />

              </View>
              <View style={{ flexDirection: "row", margin: 10 }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>close</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                >
                  <Text style={styles.textStyle} onPress={update}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>


        <View style={{ width: "95%" }}>
          <Card>
            <Card.Title
              style={{
                backgroundColor: "darkblue",
                color: "white",
                height: 50,
                fontSize: 22,
                padding: 10,
              }}
            >
              Add items
            </Card.Title>
            <Card.Divider />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
            <TextInput
                placeholder='Item Name'
                value={itemName}
                onChangeText={text =>  setItemName(text) }
                style={styles.input}
          
            />
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text =>  setPrice(text)}
              placeholder="Price"

            
            />

          <Dropdown
              data={data}
              style={[styles.input, { width: "100%" }]}
              search
              selectedTextStyle={{ fontSize: 20 }}
              searchPlaceholder="Search..."
              value={value}
              onChange={item => { setValue(item.value);}}
              labelField="label"
              valueField="value"
            />
              
            </View>
            <Button title="Add" onPress={create} />
          </Card>
        </View>
        <View style={{ width: "95%" }}>
          <Card>
            <Card.Title
              style={{
                backgroundColor: "darkblue",
                color: "white",
                height: 50,
                fontSize: 22,
                padding: 10,
              }}
            >
              Item List
            </Card.Title>
            <View
              style={{ flexDirection: "column", justifyContent: "space-around"}}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                <Text style={{ fontWeight: 'bold'}}>Icon</Text>
                <Text style={{ marginLeft: 30, fontWeight: 'bold' }}>Name</Text>
                <Text style={{ marginLeft: 30, fontWeight: 'bold'  }}>Price</Text>
                <Text style={{ marginLeft: 30, fontWeight: 'bold' }}>Edit</Text>
                <Text style={{ marginLeft: 30, fontWeight: 'bold' }}>Del</Text>
               
              </View>

            </View> 

            {fetchedData.map((x,i)=>  
            <View>
<View style={{ flexDirection: "row", justifyContent: "space-around" }} key={i}>
  <Avatar
    rounded
    containerStyle={{ backgroundColor: x.color, height: 30, width: 30,marginLeft:5 }}
    title={x.name[0]}
  />

  <Text style={{ width: 60, textAlign: 'center',marginLeft:30 }}>{x.name}</Text>

  <Text style={{ width: 60, textAlign: 'center',marginLeft:30 }}>
    {(x.price - (x.price * 0.10)).toFixed(2) + '$'}
  </Text>

  <Text
    style={{
      color: 'orange',
      width: 30,
      textAlign: 'center',
      marginLeft:30
    }}
    onPress={() => edit(x.name)}
  >
    Edit
  </Text>

  <Text
    style={{
      color: 'red',
      width: 50,
      textAlign: 'center',
      marginLeft:30
    }}
    onPress={() => deleteUser(x.name)}
  >
    Delete
  </Text>
</View>

          <View key={i+1}><Text></Text></View>
          <Card.Divider />
          </View>
            )}

          </Card>
        </View>
     
       
      
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 18,
    padding: 10,
    width: "45%",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: "2%",
  },
  text: {
    alignSelf: "center",
    fontSize: 16,
    margin: 15,
  },
  title: {
    alignSelf: "center",
    fontSize: 16,
    margin: 15,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,

  },
  modalView: {
    width: 350,
    margin: 20,
    backgroundColor: "#e8eddf",
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonOpen: {
    backgroundColor: "#8fec8d",
  },
  buttonClose: {
    backgroundColor: "lightgrey",
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
