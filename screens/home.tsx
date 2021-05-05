import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Product from '../components/product';
import { header } from '../Styles/components/header';

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
    <View style={header.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

        {/* Today's Products */}
        <View style={header.productsWrapper}>
          <Text style={header.sectionTitle}>My products</Text>
          <View style={header.items}>
            {/* This is where the products will go! */}
            {
              productItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => removeProduct(index)}>
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
        style={header.writeProductWrapper}
      >
        <TextInput style={header.input} placeholder={'Write a product'} value={product} onChangeText={text => setProduct(text)} />
        <TouchableOpacity onPress={() => addProduct()}>
          <View style={header.addWrapper}>
            <Text style={header.addText}>+</Text>
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

