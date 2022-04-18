import React from 'react'
import {
  View,
  Text
} from 'react-native'

import { useNavigation } from '@react-navigation/native';

import Button from '../../Components/Button'

export default function Home(){
  const navigation = useNavigation()

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
      <Text>Home</Text>
      <Button
        onPress={() => navigation.navigate("Comandas")} 
        title='Go to comandas'
      />
    </View>
  );
}
