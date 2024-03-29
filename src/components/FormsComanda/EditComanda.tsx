import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert } from 'react-native';

import Button from '@components/Button';
import api from '@services/api';

import {
  Container,
  Background,
  Card,
  Title,
  Row,
  Column,
  ErrorMessage
} from './styles'
import { IComandas } from '@interfaces/main';
import Input from '@components/Input';

//arrumar isso
interface Props {
  toogleVisibility: () => void;
  setComandas: Dispatch<SetStateAction<IComandas[]>>;
  comandas: IComandas[];
  comandaID: number;
}

export default function EditComanda({ toogleVisibility, comandas, setComandas, comandaID }: Props) {
  const comanda = comandas.find(c => c.id === comandaID);

  if (!comanda) return null;

  const [nome, setNome] = useState<string>(comanda.nome_cliente);
  const [mesa, setMesa] = useState(comanda.num_mesa);
  const [error, setError] = useState({
    nome: "",
    mesa: ""
  });

  const handleSubmit = () => {
    let errorMsg = {
      nome: "",
      mesa: ""
    }

    if (nome.trim() === '') errorMsg.nome = "Por favor, insira o nome do cliente."
    else if (nome.trim().length < 3) errorMsg.nome = "Nome precisa ter no mínimo 3 letras."
    else if (nome.trim().length > 50) errorMsg.nome = "Nome pode ter máximo 50 letras."
    else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(nome)) errorMsg.nome = "Nome não pode conter caracteres especiais"

    if (mesa.trim() === '') errorMsg.mesa = "Por favor, insira o número da mesa."
    else if (mesa.trim().length > 4) errorMsg.mesa = "Número inserido muito grande."

    if (errorMsg.nome === "" && errorMsg.mesa === "") {
      setError(errorMsg)

      Alert.alert(
        "Editar comanda",
        `Tem certeza que deseja editar a comanda de ${comanda.nome_cliente}?`,
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`comandas/${comanda.id}`, {
                data: {
                  num_mesa: mesa,
                  nome_cliente: nome
                }
              }).then(response => {
                let newArr = comandas;
                let index = comandas.indexOf(comanda);
                newArr[index].nome_cliente = nome.trim();
                newArr[index].num_mesa = mesa.trim();
                setComandas(newArr);
                toogleVisibility();
              })
            }
          },
          {
            text: "Cancelar",
            onPress: () => { return null }
          }
        ]

      )
    } else {
      setError(errorMsg)
    }
  }

  return (
    <Container>
      <Background onPress={toogleVisibility} activeOpacity={1} />
      <Card>
        <Title>Editar comanda</Title>
        <Row>
          <Column size={76}>
            <Input
              value={nome}
              placeholder="Nome"
              onChangeText={setNome}
            />
          </Column>
          <Column size={21}>
            <Input
              value={mesa}
              placeholder="Mesa"
              keyboardType="numeric"
              maxLength={5}
              onChangeText={setMesa}
            />
          </Column>
        </Row>
        {error.nome ? (
          <ErrorMessage>{error.nome}</ErrorMessage>
        ) : null}
        {error.mesa ? (
          <ErrorMessage>{error.mesa}</ErrorMessage>
        ) : null}

        <Button
          onPress={handleSubmit}
          title="Salvar"
        />
      </Card>
    </Container>
  )
}

