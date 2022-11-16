import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

import api from '@services/api';
import { ICategories } from '@interfaces/main';

import SearchInput from '@components/SearchInput';
import ActionButton from '@components/ActionButton';

import {
  Card,
  Column,
  Container,
  Content,
  Label,
  Name,
} from './styles'
import EditCategory from '@components/FormsProduct/EditCategory';
import CreateCategory from '@components/FormsProduct/CreateCategory';
import Empty from '@components/Empty';

export default function Categorias() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<ICategories | undefined>(undefined)

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const reponse = await api.get(`categorias`);
      const { results } = reponse.data;
      setCategories(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();

    navigation.addListener(
      'focus',
      payload => {
        loadData();
      }
    );
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: `Categorias (${categories.filter(c => c.status != 'I').length})`
    })
  }, [categories])

  const filteredCategories = search.length > 0
    ? categories.filter(item => item.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()))
    : categories;

  return (
    <Container>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder={"Buscar categoria..."}
      />
      {filteredCategories.length > 0 ?
        <Content>
          {filteredCategories.map((item, index) => {
            return item.status === 'A' && (
              <TouchableHighlight
                style={{ marginTop: 1, marginBottom: 1 }}
                activeOpacity={0.8}
                underlayColor="#000"
                key={index}
                onPress={() => {
                  setSelected(item);
                  setShow(true);
                }}
              >
                <Card >
                  <Column>
                    <Name>{item.nome} ({item.NumberOfProducts || 0})</Name>
                    <Label>{item.tipo}</Label>
                  </Column>
                  <Column>
                    <Feather name="chevron-right" size={22} color="#b9b9b9" />
                  </Column>
                </Card>
              </TouchableHighlight>
            )
          })}
        </Content>
        :
        <Empty
          title={search.length === 0 
            ? "Não há nenhuma categoria\ncadastrada"
            : "Categoria não encontrada"}
          subtitle={search.length === 0
            ? "Cadastre uma categoria primeiro"
            : `Não encontramos nenhum resultado na\nbusca por "${search}"`}
        />
      }

      <ActionButton name="add" size={40} onPress={() => {
        setSelected(undefined);
        setShow(true)
      }
      } />
      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {selected
            ? <EditCategory toogleForm={() => setShow(false)} setCategories={setCategories} categories={categories} cID={selected.id} />
            : <CreateCategory toogleForm={() => setShow(false)} setCategories={setCategories} categories={categories} />}
        </TouchableWithoutFeedback>

      </Modal>
    </Container>
  )
}