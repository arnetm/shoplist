import React from 'react';
import { View, Text } from 'react-native';
import { item } from '../Styles/components/item';

const Product = (props) => {

  return (
    <View style={item.item}>
      <View style={item.itemLeft}>
        <View style={item.square}></View>
        <Text style={item.itemText}>{props.text}</Text>
      </View>
    </View>
  )
}

export default Product;