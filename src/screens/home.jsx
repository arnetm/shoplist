import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Product from '../components/product';

export default function App() {

  const [product, setProduct] = useState();
  const [productItems, setProductItems] = useState([]);

  const addProduct = () => {
    Keyboard.dismiss();
    setProductItems([...productItems, product])
    setProduct(null);
  }

  const removeProduct = (index) => {
    let itemsCopy = [...productItems];
    itemsCopy.splice(index, 1);
    setProductItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Products */}
      <View style={styles.productsWrapper}>
        <Text style={styles.sectionTitle}>My products</Text>
        <View style={styles.items}>
          {/* This is where the products will go! */}
          {
            productItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => removeProduct(index)}>
                  <Product text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a product */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeProductWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a product'} value={product} onChangeText={text => setProduct(text)} />
        <TouchableOpacity onPress={() => addProduct()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const updateListCountries = async () => {
  const productTest = await getProductItems();
  console.log(productTest);
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  productsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeProductWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

