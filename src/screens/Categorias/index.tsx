import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
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
import Status from '@components/Filters/Status';
import ActiveCategory from '@components/FormsProduct/ActiveCategory';

export default function Categorias() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<ICategories | undefined>(undefined)
  const [status, setStatus] = useState("A");

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const reponse = await api.get(`categorias/status=${status}`);
      const { results } = reponse.data;
      setCategories(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      loadData();
    });

    return willFocusSubscription;
  }, [status])

  useEffect(() => {
    navigation.setOptions({
      title: `Categorias (${filteredCategories.length})`
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
      <View style={{ paddingLeft: 15 }}>
        <Status
          status={status}
          setStatus={setStatus}
          options={
            {
              'A': 'Ativo',
              'I': 'Inativo',
              'T': 'Todos'
            }
          }
        />
      </View>
      {filteredCategories.length > 0 ?
        <Content>
          {filteredCategories.map((item, index) => {
            if ((item.status !== status) && (status !== "T")) return;
            return (
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
                <Card style={item.status === "I" ? {backgroundColor: '#FFEBEE'} : null}>
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
            ? selected.status === "I" ? <ActiveCategory status={status} toogleForm={() => setShow(false)} setCategories={setCategories} categories={categories} cID={selected.id} />
              : <EditCategory status={status} toogleForm={() => setShow(false)} setCategories={setCategories} categories={categories} cID={selected.id} />
            : <CreateCategory toogleForm={() => setShow(false)} setCategories={setCategories} categories={categories} />}
        </TouchableWithoutFeedback>

      </Modal>
    </Container>
  )
}