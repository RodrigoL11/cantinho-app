import React, { Dispatch, SetStateAction, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'


import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { View } from 'react-native';
import { Container, Label, StrongLabel, SubTitle } from './styles';

interface Props{
  status: string
  setStatus: Dispatch<SetStateAction<string>>
}

export default function Status({  status, setStatus }: Props) {
  const [open, setOpen] = useState(false)

  const siglas = {
    'A': 'Ativo',
    'E': 'Entregue',
    'C': 'Cancelado',
    'T': 'Todos'
  }

  return (
    <View>
      <SubTitle>Status</SubTitle>      
      <Menu onOpen={() => setOpen(true)} onClose={() => setOpen(false)} >
        <MenuTrigger>
          <Container>
          <StrongLabel>{siglas[status as keyof typeof siglas]}</StrongLabel>
          <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#717171" />
          </Container>
        </MenuTrigger>
        <MenuOptions customStyles={{optionsContainer: {marginTop: 35, padding: 8, width: 120}}}>
          <MenuOption onSelect={() => setStatus("A")}>
            <Label>Ativo</Label>
          </MenuOption>
          <MenuOption onSelect={() => setStatus("E")}>
            <Label>Entregue</Label>
          </MenuOption>
          <MenuOption onSelect={() => setStatus("C")}>
            <Label>Cancelado</Label>
          </MenuOption>
          <MenuOption onSelect={() => setStatus("T")}>
            <Label>Todos</Label>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  )
}