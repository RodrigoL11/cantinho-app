import React, { useState } from "react";
import { BackHandler, Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from 'react-native-super-grid';

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
  Valor,
  Id,
  Aviso,
  AvisoLabel
} from "./styles";

export default function Home() {
  const navigation = useNavigation();
  const [search, setSearch] = useState<string>("")
  const [showForms, setShowForms] = useState(false)
  const [comandas, setComandas] = useState(list2)
  const amount = comandas.length;

  const toogleForms = () => { setShowForms(!showForms) }

  function handleBackButtonClick() {
    if (showForms) setShowForms(false);
    else navigation.goBack();

    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  })

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
                <Valor>R$ {item.total.toFixed(2)}</Valor>
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
      <ActionButton name="add" size={40} onPress={toogleForms} />

      {showForms
        ? <FormsComanda comandas={comandas} setComandas={setComandas} toogleVisibility={toogleForms} />
        : null
      }
    </Container>
  );
}