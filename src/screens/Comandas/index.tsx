import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from "react-native";
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
  DateLabel,
  Aviso,
  AvisoLabel,
  OptionContainer,
  OptionLabel,
  BackToTopButton
} from "./styles";
import Empty from "@components/Empty";
import Status from "@components/Filters/Status";
import DateFilter from "@components/Filters/Date";
import { formatDate, formatDateFrom, formatDateTo } from "../../utils/main";
import { Loading } from "@components/Loading";

export default function Home() {
  const navigation = useNavigation();
  const perPage = 20;
  const [page, setPage] = useState(0);

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const [search, setSearch] = useState<string>("");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [showForms, setShowForms] = useState(false)
  const [comandas, setComandas] = useState<IComandas[]>([]);
  const [comandaID, setComandaID] = useState<number>();
  const [status, setStatus] = useState("A");
  const [dateFrom, setDateFrom] = useState(yesterday);
  const [dateTo, setDateTo] = useState(tomorrow);
  const [handleInputQuery, setHandleInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFullLoaded, setIsFullLoaded] = useState(false);
  const [ref, setRef] = useState<any>();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // const handleScrollBackToTop = () => {
  //   if (!ref) return null;

  //   ref.scrollToLocation({
  //     x: 0,
  //     y: 0,
  //     animated: true
  //   })
  // }

  const loadData = async (reload?: boolean) => {
    if (loading || (isFullLoaded && !reload)) return;

    let _page = reload ? 0 : page;

    setLoading(true);

    try {
      const _search = search.trim().length > 2 ? search : "";
      const _dateFrom = formatDateFrom(dateFrom || yesterday);
      const _dateTo = formatDateTo(dateTo || tomorrow);

      const response = await api.get(`comandas/q=${_search}&num_mesa=${numeroMesa}&limit=${perPage}&offset=${perPage * _page}&status=${status || "A"}&dateFrom=${_dateFrom}&dateTo=${_dateTo}`);
      const { results } = response.data;
      if (results.length < perPage) setIsFullLoaded(true);
      reload ? setComandas(results) : setComandas([...comandas, ...results]);

      _page++;
      setPage(_page);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    setIsFullLoaded(false);
    loadData(true);
    const willFocusSubscription = navigation.addListener('focus', () => {
      loadData(true);
    });

    return willFocusSubscription;
  }, [status, dateFrom, dateTo, handleInputQuery, numeroMesa]);

  const closeForms = () => {
    setShowForms(false);
    setComandaID(undefined);
  }

  const deleteComanda = (id: number) => {
    const delComanda = comandas.find(c => c.id == id)

    if (!delComanda) return null;

    Alert.alert(
      "Deletar comanda",
      `${delComanda.pedidos ? `Há ${delComanda.pedidos} pedido${delComanda.pedidos > 1 ? 's' : ''} vinculado${delComanda.pedidos > 1 ? 's' : ''} a esta comanda! ` : ''}Tem certeza que deseja excluir a comanda ${delComanda.nome_cliente}?`,
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

  const Comanda = (comanda: IComandas, index: number) => {
    return (
      <Card
        activeOpacity={0.7}
        key={index}
        onPress={() => { navigation.navigate("Comanda", { comandaID: comanda.id, pedidos_ativos: comanda.pedidos_ativos }) }}
        hasPedidos={(comanda.pedidos_ativos || 0) > 0}
        status={comanda.status}
        disabled={comanda.status !== "A"}
      >
        <Row>
          <DateLabel style={{ top: -2 }}>{formatDate(new Date(comanda.data_hora_abertura))}</DateLabel>
          {comanda.status !== "A" ? null :
            <Menu>
              <MenuTrigger style={{ right: -4 }}>
                <Feather name="more-vertical" color={"#a5a5a5"} size={20} />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{ padding: 4, maxWidth: 140, marginTop: -2 }}>
                <MenuOption onSelect={() => {
                  setComandaID(comanda.id);
                  setShowForms(true);
                }}>
                  <OptionContainer>
                    <Feather name="edit-2" size={13} />
                    <OptionLabel>Editar</OptionLabel>
                  </OptionContainer>
                </MenuOption>
                <MenuOption onSelect={() => deleteComanda(comanda.id)}>
                  <OptionContainer>
                    <Feather name="trash-2" size={13} />
                    <OptionLabel>Excluir</OptionLabel>
                  </OptionContainer>
                </MenuOption>
              </MenuOptions>
            </Menu>
          }
        </Row>
        <Nome numberOfLines={2}>{comanda.nome_cliente}</Nome>
        <Mesa>Mesa: {comanda.num_mesa}</Mesa>
        {comanda.pedidos_ativos ?
          <Aviso>
            <AvisoLabel>{comanda.pedidos_ativos}</AvisoLabel>
          </Aviso>
          : null}
      </Card>
    )
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header
        title={`Comandas (${comandas.length})`}
        onPress={navigation.goBack}
      />
      <Row>
        <View style={{ width: '80%' }}>
          <SearchInput
            value={search}
            onChangeText={text => {
              setSearch(text);
              if (text.length > 2) setHandleInputQuery(text);
              if (text.length <= 2 && handleInputQuery) setHandleInputQuery("");
            }}
            placeholder="Busque um pedido..."
          />
        </View>
        <View style={{ width: '18%' }}>
          <SearchInput
            hideIcon={true}
            value={numeroMesa}
            onChangeText={text => {
              setNumeroMesa(text);
            }}
            placeholder="Mesa"
            keyboardType='numeric'
            style={{ paddingLeft: 16, paddingRight: 16 }}
            maxLength={5}
          />
        </View>
      </Row>
      <Row style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 12 }}>
        <Status
          status={status}
          setStatus={setStatus}
          options={
            {
              'A': 'Ativo',
              'F': 'Finalizado',
              'I': 'Cancelado',
              'T': 'Todos'
            }
          }
        />
        <Row>
          <DateFilter
            date={dateFrom}
            setDate={setDateFrom}
            subTitle="De"
          />
          <DateFilter
            date={dateTo}
            setDate={setDateTo}
            subTitle="Até"
          />
        </Row>
      </Row>
      {comandas.length > 0 ?
        <FlatGrid
          ref={setRef}
          itemDimension={100}
          data={comandas}
          keyboardShouldPersistTaps="always"
          style={{ flex: 1 }}
          spacing={10}
          renderItem={({ item, index }) => Comanda(item, index)}
          onEndReached={() => loadData()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<Loading load={loading} />}
          onScroll={({ nativeEvent }) => {
            nativeEvent.contentOffset.y > 100 ? setShowBackToTop(true) : setShowBackToTop(false);
          }}
        />
        :
        <Empty
          title={`Não há nenhuma comanda\npara os filtros aplicados`}
          subtitle={"Altere os filtros ou crie uma nova"}
        />
      }
      <ActionButton 
        name="add"
        size={40}
        onPress={() => setShowForms(true)}
      />

      {/* {!showBackToTop ?
        <BackToTopButton activeOpacity={1} onPress={handleScrollBackToTop}>
          <Feather name="chevron-up" size={24} color="#f4f5f6" />
        </BackToTopButton>
        : null} */}

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