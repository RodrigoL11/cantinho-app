import React, { useState } from "react";
import { Alert, BackHandler, Platform } from "react-native";
import { Feather } from '@expo/vector-icons'

import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from 'react-native-super-grid';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


import ActionButton from "@components/ActionButton";
import FormsComanda from "@components/FormsComanda";
import Header from "@components/Header";

import { list2 } from "../../data";

import {
  Container,
  Card,
  InputContainer,
  Input,
  Row,
  Nome,
  Mesa,
  Id,
  Aviso,
  AvisoLabel,
  OptionContainer,
  OptionLabel
} from "./styles";

export default function Home() {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>("")
  const [showForms, setShowForms] = useState(false)
  const [comandas, setComandas] = useState(list2)
  const [comandaIndex, setComandaIndex] = useState<number>()
  const amount = comandas.length;

  const closeForms = () => {
    setShowForms(false);
    setComandaIndex(undefined);
  }

  const deleteComanda = (id: number) => {
    const delComanda = comandas[id]

    Alert.alert(
      "Deletar comanda",
      `Tem certeza que deseja excluir a comanda ${delComanda.name}?`,
      [
        {
          text: "Sim",
          onPress: () => { setComandas(comandas.filter(comanda => comanda !== delComanda)) }
        },
        {
          text: "Cancelar",
          onPress: () => { return }
        }
      ]
    )
  }
  
  // React.useEffect(() => {
  //   const handleBackButtonClick = () => {
  //     if (showForms) closeForms()
  //     else navigation.goBack()
      
  //    return true;
  //   }

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress', 
  //     handleBackButtonClick
  //   );

  //   return () => backHandler.remove();
  // }, [])

  const filteredSearch = search.length > 0
    ? comandas.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header
        title={`Comandas (${amount})`}
        onPress={navigation.goBack}
      />
      <InputContainer>
        <Input
          placeholder="Buscar..."
          onChangeText={e => setSearch(e)}
          value={search}
        />
      </InputContainer>
      <FlatGrid
        itemDimension={100}
        data={search.length > 0 ? filteredSearch : comandas}
        style={{ flex: 1, marginTop: 10 }}
        spacing={10}
        renderItem={({ item, index }) => {
          return (
            <Card
              key={index}
              onLongPress={() => console.log('oii')}
              onPress={() => { navigation.navigate("Comanda", { id: index }) }}
              style={item.pedidos > 0 ? { borderColor: 'greenyellow' } : null}
            >              
              <Row>
                <Id>#{item.id}</Id>
                <Menu>
                  <MenuTrigger style={{right: -4}} >
                    <Feather name="more-vertical" color={"#dadada"} size={17} />
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={{padding: 4, maxWidth: 140, marginTop: -2}}>
                    <MenuOption onSelect={() => {
                      setComandaIndex(index);
                      setShowForms(true);
                    }}>
                      <OptionContainer>
                        <Feather name="edit-2" size={13} />
                        <OptionLabel>Editar</OptionLabel>
                      </OptionContainer>
                    </MenuOption>
                    <MenuOption onSelect={() => deleteComanda(index)}>
                      <OptionContainer>
                        <Feather name="trash-2" size={13} />
                        <OptionLabel>Excluir</OptionLabel>
                      </OptionContainer>
                    </MenuOption>
                    <MenuOption disabled={item.pedidos > 0 ? false : true}>
                    <OptionContainer>
                        <Feather name="clipboard" size={13} />
                        <OptionLabel>Ver pedidos</OptionLabel>
                      </OptionContainer>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </Row>
              <Nome numberOfLines={2}>{item.name}</Nome>
              <Mesa>Mesa: {item.mesa}</Mesa>
              {item.pedidos > 0 ? (
                <Aviso>
                  <AvisoLabel>{item.pedidos}</AvisoLabel>
                </Aviso>
              ) : null}
            </Card>
          )
        }}
      />
      <ActionButton name="add" size={40} onPress={() => setShowForms(true)} />

      {showForms
        ? <FormsComanda index={comandaIndex} comandas={comandas} setComandas={setComandas} toogleVisibility={closeForms} />
        : null
      }
    </Container>
  );
}