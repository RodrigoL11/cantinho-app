import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert } from 'react-native';

import Button from '@components/Button';
import api from '@services/api';
import { useAuth } from '@hooks/auth';
import { IComandas } from '@interfaces/main';

import {
  Container,
  Background,
  Card,
  Title,
  Row,
  Column,
  ErrorMessage
} from './styles'
import Input from '@components/Input';

//arrumar isso
interface Props {
  toogleVisibility: () => void;
  setComandas: Dispatch<SetStateAction<IComandas[]>>,
}

export default function CreateComanda({ toogleVisibility, setComandas }: Props) {
  const { authData } = useAuth();
  const [nome, setNome] = useState<string>("");
  const [mesa, setMesa] = useState("");
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
        "Criar comanda",
        `Tem certeza que deseja criar uma comanda de nome ${nome.trim()}?`,
        [
          {
            text: "Sim",
            onPress: async () => {
              const dt = new Date();                           

              const validatedData = {
                id: 0,
                data_hora_abertura: dt,
                pedidos_abertos: 0,
                status: "A",
                num_mesa: mesa.trim(),
                nome_cliente: nome.trim(),
                uID: authData?.id || 0
              }

              await api.post(`comandas`, {
                data: validatedData
              }).then(response => {
                let newID = response.data.result.insertId;
                validatedData.id = newID;
                setComandas(arr => [...arr, validatedData])
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
        <Title>Criar comanda</Title>
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
          title="Criar"
        />
      </Card>
    </Container>
  )
}

