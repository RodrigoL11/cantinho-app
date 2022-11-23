import React, { Dispatch, SetStateAction, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'


import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { View } from 'react-native';
import { Container, Label, StrongLabel, SubTitle } from './styles';
import { themes, useTheme } from '@hooks/theme';

interface Props {
  status: string
  setStatus: Dispatch<SetStateAction<string>>
  options: any
}

export default function Status({ status, setStatus, options }: Props) {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme();
  const color = themes[theme].colors.text_color[500]

  return (
    <View>
      <SubTitle>Status</SubTitle>
      <Menu style={{width: 120}} onOpen={() => setOpen(true)} onClose={() => setOpen(false)} >
        <MenuTrigger>
          <Container>
            <StrongLabel>{options[status as keyof typeof options]}</StrongLabel>
            <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color={color} />
          </Container>
        </MenuTrigger>
        <MenuOptions customStyles={{ optionsContainer: { marginTop: 35, padding: 8, width: 120, backgroundColor: themes[theme].colors.bgCard } }}>
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