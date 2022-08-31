import React, { useState } from "react";
import { BackHandler } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from 'react-native-super-grid';

import ActionButton from "@components/ActionButton";
import FormsComanda from "@components/FormsComanda";
import Header from "@components/Header";

import { list2 } from "../../data";

import {
  Container,
  Content,
  Card,
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
  const amount = list2.length;
  const [search, setSearch] = useState<string>("")
  const [showForms, setShowForms] = useState(false)

  function handleBackButtonClick(){
    if(showForms) setShowForms(false);
    else navigation.goBack();

    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  })

  const filteredSearch = search.length > 0
    ? list2.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <Container>
      <Header
        title={`Comandas (${amount})`}
        onPress={navigation.goBack}
      />
      
        <Input
          placeholder="Buscar..."
          onChangeText={e => setSearch(e)}
          value={search}
        />
        <FlatGrid
          itemDimension={100}
          data={search.length > 0 ? filteredSearch : list2}
          style={{ flex: 1, marginTop: 10, backgroundColor: '#eee' }}
          spacing={10}
          renderItem={({ item, index }) => {
            return (
              <Card
                key={index}
                onPress={() => { navigation.navigate("Comanda", { id: index }) }}
                style={item.pedidos > 0 ? { borderColor: 'greenyellow' } : null}
              >
                <Row>
                  <Id>#{item.id}</Id>
                  <Valor>R$ {item.total.toFixed(2)}</Valor>
                </Row>
                <Nome>{item.name}</Nome>
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
          ? <FormsComanda />
          : null
        }
      
    </Container>
  );
}