import React from 'react'
import { useNavigation } from '@react-navigation/native';

import Button from '../../Components/Button';
import AccordionMenu from '../../Components/AccordionMenu';

import { Container } from './styles'

import { list } from '../../data'

export default function Comanda(){
  const navigation = useNavigation()

  return (
    <Container>
            {list.map((item, index) => (
                <AccordionMenu
                    title={item.name}
                    items={item.items}
                    key={index}
                />
            ))}
      <Button
        onPress={() => navigation.navigate("Home")} 
        title='Go to home'
      />
    </Container>
  );
}
