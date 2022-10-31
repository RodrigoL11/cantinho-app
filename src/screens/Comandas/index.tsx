import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback } from "react-native";
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
import Header from "@components/Header";
import CreateComanda from "@components/FormsComanda/CreateComanda";
import EditComanda from "@components/FormsComanda/EditComanda";
import SearchInput from '@components/SearchInput';
import { IComandas } from "@interfaces/main";
import api from "@services/api";

import {
  Container,
  Card,
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
  const [comandas, setComandas] = useState<IComandas[]>([])
  const [comandaID, setComandaID] = useState<number>()  

  const loadData = async () => {
    try {
      const response = await api.get('comandas');

      const { results } = response.data;

      setComandas(results)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const closeForms = () => {
    setShowForms(false);
    setComandaID(undefined);
  }

  const deleteComanda = (id: number) => {
    const delComanda = comandas.find(c => c.id == id)

    if(!delComanda) return null;

    Alert.alert(
      "Deletar comanda",
      `Tem certeza que deseja excluir a comanda ${delComanda.nome_cliente}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`comandas/${delComanda.id}`)
              .then(response => {
                setComandas(comandas.filter(comanda => comanda !== delComanda))
              })
          }
        },
        {
          text: "Cancelar",
          onPress: () => { return null }
        }
      ]
    )
  }

  const filteredSearch = search.length > 0
    ? comandas.filter(item => item.nome_cliente.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()))
    : comandas;

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header
        title={`Comandas (${filteredSearch.length})`}
        onPress={navigation.goBack}
      />
      <SearchInput
        placeholder="Buscar comanda..."
        onChangeText={e => setSearch(e)}
        value={search}
      />
      <FlatGrid
        itemDimension={100}
        data={filteredSearch}
        style={{ flex: 1 }}
        spacing={10}
        renderItem={({ item, index }) => {
          return (
            <Card
              activeOpacity={0.7}
              key={index}
              onPress={() => { navigation.navigate("Comanda", { comandaID: item.id }) }}
              hasPedidos={item.pedidos_abertos > 0}
            >
              <Row>
                <Id>#{item.id}</Id>
                <Menu>
                  <MenuTrigger style={{ position: 'absolute', right: -4, top: 2.5 }} >
                    <Feather name="more-vertical" color={"#a5a5a5"} size={20} />
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={{ padding: 4, maxWidth: 140, marginTop: -2 }}>
                    <MenuOption onSelect={() => {
                      setComandaID(item.id);
                      setShowForms(true);
                    }}>
                      <OptionContainer>
                        <Feather name="edit-2" size={13} />
                        <OptionLabel>Editar</OptionLabel>
                      </OptionContainer>
                    </MenuOption>
                    <MenuOption onSelect={() => deleteComanda(item.id)}>
                      <OptionContainer>
                        <Feather name="trash-2" size={13} />
                        <OptionLabel>Excluir</OptionLabel>
                      </OptionContainer>
                    </MenuOption>
                    <MenuOption disabled={item.pedidos_abertos > 0 ? false : true}>
                      <OptionContainer>
                        <Feather name="clipboard" size={13} />
                        <OptionLabel>Ver pedidos</OptionLabel>
                      </OptionContainer>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </Row>
              <Nome numberOfLines={2}>{item.nome_cliente}</Nome>
              <Mesa>Mesa: {item.num_mesa}</Mesa>
              {item.pedidos_abertos > 0 && 
                <Aviso>
                  <AvisoLabel>{item.pedidos_abertos}</AvisoLabel>
                </Aviso>
              }
            </Card>
          )
        }}
      />
      <ActionButton name="add" size={40} onPress={() => setShowForms(true)} />

      <Modal
        transparent={true}
        visible={showForms}
        onRequestClose={closeForms}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {comandaID ? (
              <EditComanda comandaID={comandaID} comandas={comandas} setComandas={setComandas} toogleVisibility={closeForms} />
            ) : (
              <CreateComanda setComandas={setComandas} toogleVisibility={closeForms} />
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
}