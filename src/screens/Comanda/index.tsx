import React from 'react'
import { useNavigation } from '@react-navigation/native';

import Button from '../../Components/Button';
import AccordionMenu from '../../Components/AccordionMenu';

import { Container } from './styles'

import { list2 } from '../../data'

export default function Comanda({route}: any){
  const navigation = useNavigation()
  const { id } = route.params;
 
  return (
    <Container>
            {list2[id].data.map((item, index) => (
                <AccordionMenu
                    title={item.name}
                    items={item.items}
                    key={index}
                />
            ))}
      <Button
        onPress={() => navigation.navigate("Comandas")} 
        title='Go to comandas'
      />
    </Container>
  );
}
