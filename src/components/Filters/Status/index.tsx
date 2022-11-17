import React, { Dispatch, SetStateAction, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'


import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { View } from 'react-native';
import { Container, Label, StrongLabel, SubTitle } from './styles';

interface Props {
  status: string
  setStatus: Dispatch<SetStateAction<string>>
  options: any
}

export default function Status({ status, setStatus, options }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <View>
      <SubTitle>Status</SubTitle>
      <Menu style={{width: 120}} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} >
        <MenuTrigger>
          <Container>
            <StrongLabel>{options[status as keyof typeof options]}</StrongLabel>
            <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#717171" />
          </Container>
        </MenuTrigger>
        <MenuOptions customStyles={{ optionsContainer: { marginTop: 35, padding: 8, width: 120 } }}>
          {Object.keys(options).map((key, index) =>
            <MenuOption key={index} onSelect={() => setStatus(key)}>
              <Label>{options[key]}</Label>
            </MenuOption>
          )}
        </MenuOptions>
      </Menu>
    </View>
  )
}