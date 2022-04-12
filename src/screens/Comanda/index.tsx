import { useNavigation } from '@react-navigation/native';
import React from 'react'
import {
  View,
  Text
} from 'react-native'
import Button from '../../Components/Button';

export default function Comanda(){
  const navigation = useNavigation()

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      }}>
      <Text>Comanda</Text>
      <Button
        onPress={() => navigation.navigate("Home")} 
        title='Go to home'
      />
    </View>
  );
}
