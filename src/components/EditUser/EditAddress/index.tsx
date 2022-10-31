import React, { Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios';

import Header from '@components/Header'
import Input from '@components/Input'
import Button from '@components/Button'

import { IAddress } from '@interfaces/main'

import {
  Container,
  Content,
  Row,
  Column,
  ErrorMessage
} from './styles'
import api from '@services/api';
import { Alert } from 'react-native';

interface Props {
  id: number,
  toogleForm: () => void,
  setAddress: Dispatch<SetStateAction<IAddress[]>>,
  address: IAddress[] | undefined,
}

const states = {
  'AC': 'Acre',
  'AL': 'Alagoas',
  'AP': 'Amapá',
  'AM': 'Amazonas',
  'BA': 'Bahia',
  'CE': 'Ceará',
  'DF': 'Distrito Federal',
  'ES': 'Espírito Santo',
  'GO': 'Goías',
  'MA': 'Maranhão',
  'MT': 'Mato Grosso',
  'MS': 'Mato Grosso do Sul',
  'MG': 'Minas Gerais',
  'PA': 'Pará',
  'PB': 'Paraíba',
  'PR': 'Paraná',
  'PE': 'Pernambuco',
  'PI': 'Piauí',
  'RJ': 'Rio de Janeiro',
  'RN': 'Rio Grande do Norte',
  'RS': 'Rio Grande do Sul',
  'RO': 'Rondônia',
  'RR': 'Roraíma',
  'SC': 'Santa Catarina',
  'SP': 'São Paulo',
  'SE': 'Sergipe',
  'TO': 'Tocantins'
}

export default function EditAddress({ id, toogleForm, setAddress, address }: Props) {
  const selectedAddress = address?.find(item => item.id === id)

  const [logradouro, setLogradouro] = useState(selectedAddress?.logradouro || "");
  const [bairro, setBairro] = useState(selectedAddress?.bairro || "");
  const [numero, setNumero] = useState(selectedAddress?.num_endereco || "");
  const [CEP, setCEP] = useState(selectedAddress?.cep || "");
  const [cidade, setCidade] = useState(selectedAddress?.cidade || "");
  const [estado, setEstado] = useState(selectedAddress?.estado || "");
  const [errors, setErrors] = useState({
    logradouro: "",
    bairro: "",
    numero: "",
    CEP: "",
  })

  const handleSubmit = async () => {
    let newErrors = {
      logradouro: "",
      bairro: "",
      numero: "",
      CEP: "",
    };

    if (logradouro.trim().length === 0)
      newErrors.logradouro = "Por favor, insira o nome da rua"
    else if (logradouro.trim().length < 3)
      newErrors.logradouro = "Nome da rua muito curto. O nome da rua precisa ter no mínimo 3 caracteres"

    if (bairro.trim().length === 0)
      newErrors.bairro = "Por favor, insira o nome do bairro"
    else if (bairro.trim().length < 3)
      newErrors.bairro = "Nome do bairro muito curto. O nome do bairro precisa ter no mínimo 3 caracteres"

    if (numero.trim().length === 0)
      newErrors.numero = "Por favor, insira o número da rua"


    if (CEP.trim().length != 8)
      newErrors.CEP = "Número do CEP precisa ter 8 caracteres"
    else if (cidade.trim().length === 0)
      newErrors.CEP = "CEP informado inválido"

    let hasError = false;

    Object.keys(newErrors).forEach(function (key, index) {
      if (newErrors[key as keyof typeof newErrors] != "")
        hasError = true;
    })

    if (!hasError) {
      setErrors(newErrors);
      
      const validatedData = {
        id: id,
        bairro: bairro,
        logradouro: logradouro,
        num_endereco: numero,
        cep: CEP,
        cidade: cidade,
        estado: estado,
        status: 'ativo'
      }

      if (address && selectedAddress) {
        Alert.alert(
          "Editar endereço",
          `Tem certeza que deseja editar o endereço ${selectedAddress.logradouro} ?`,
          [
            {
              text: "Sim",
              onPress: async () => {
                await api.put(`address/update/${id}`, {
                  data: validatedData
                })
                  .then(response => {
                    let newArr = [...address];
                    newArr[address.indexOf(selectedAddress)] = validatedData;
                    setAddress(newArr);
                    toogleForm();
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
    } else {
      setErrors(newErrors)
    }
  }

  const deleteAddress = async () => {
    Alert.alert(
      "Deletar endereço",
      `Tem certeza que deseja excluir o endereço ${selectedAddress?.logradouro}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`address/delete/${id}`)
              .then(response => {
                console.log(response);
                if (address) setAddress(address.filter(item => item !== selectedAddress))
                toogleForm();
              })
          }
        },
        {
          text: "Cancelar",
          onPress: () => { return }
        }
      ]
    )
  }

  const queryCEP = async (cep: string) => {
    const url = `https://viacep.com.br/ws/${cep}/json/`

    const response = await axios.get(url);
    const data = response.data
    if (data['erro'])
      setErrors({
        ...errors,
        CEP: "CEP informado inválido"
      })
    else {
      setErrors({
        ...errors,
        CEP: ""
      })
      setCidade(data["localidade"]);
      setEstado(states[data["uf"] as keyof typeof states]);
    }
  }

  const CEP_Mask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

  return (
    <Container>
      <Header title="Editar endereço" onPress={toogleForm} />
      <Content>
        <Input
          value={bairro}
          onChangeText={setBairro}
          placeholder="Bairro"
        />
        {errors.bairro ? (
          <>
            <ErrorMessage>{errors.bairro}</ErrorMessage>
          </>
        ) : null}
        <Row>
          <Column width={76}>
            <Input
              value={logradouro}
              onChangeText={setLogradouro}
              placeholder="Nome da rua"
            />
          </Column>
          <Column width={23}>
            <Input
              value={numero}
              onChangeText={setNumero}
              placeholder="Número"
              keyboardType='numeric'
              maxLength={5}
            />
          </Column>
        </Row>
        {errors.logradouro || errors.numero ? (
          <>
            <ErrorMessage>{errors.logradouro || errors.numero}</ErrorMessage>
          </>
        ) : null}
        <Input
          value={CEP}
          onChangeText={(masked, unmakesd) => {
            setCEP(unmakesd);
            if (unmakesd.length === 8) queryCEP(unmakesd)
            else {
              setEstado("");
              setCidade("");
            }
          }}
          placeholder="CEP"
          keyboardType='numeric'
          mask={CEP_Mask}
        />
        {errors.CEP ? (
          <>
            <ErrorMessage>{errors.CEP}</ErrorMessage>
          </>
        ) : null}
        <Input
          style={{ backgroundColor: "#ececec" }}
          value={cidade}
          placeholder="Cidade"
          editable={false}
        />
        <Input
          style={{ backgroundColor: "#ececec" }}
          value={estado}
          placeholder="Estado"
          editable={false}
        />
      </Content>

      <Button reverse={true} title="Excluir endereço" onPress={deleteAddress} />
      <Button title="Salvar" onPress={handleSubmit} />
    </Container>
  )
}