import React, { Dispatch, SetStateAction, useState } from 'react'
import CurrencyInput from 'react-native-currency-input';

import axios from 'axios';

import Header from '@components/Header'
import Input from '@components/Input'
import Button from '@components/Button'
import MoneyInput  from '@components/MoneyInput';

import { IAddress } from '@interfaces/main'

import {
  Container,
  Content,
  Row,
  Column,
  ErrorMessage
} from './styles'
import api from '@services/api';

interface Props {
  uID: number,
  toogleForm: () => void,
  setAddress: Dispatch<SetStateAction<IAddress[]>>,
  address: IAddress[] | undefined,
}

export default function CreateAddress() {
  const [nome, setNome] = useState("");
  const [precoCusto, setPrecoCusto] = useState<number>(0);  
  const [valorTabela, setValorTabela] = useState<number>(0);
  const [estoque, setEstoque] = useState(0);
  const [categoria, setCategoria] = useState("")
  const [errors, setErrors] = useState({
    logradouro: "",
    bairro: "",
    numero: "",
    CEP: "",
  })

  function currencyFormat(num: number) {
    return 'R$ ' + (num / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    // return 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <Container>
      <Header title="Criar produto" />
      <Content>
        <Input
          onChangeText={setNome}
          value={nome}
          placeholder="Insira o nome"
        />
        <MoneyInput
          value={precoCusto}
          onChangeValue={(text: number) => setPrecoCusto(text)}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          placeholder="Preço de custo"
          label="Preço de custo"
        />        
        <MoneyInput
          value={valorTabela}
          onChangeValue={(text: number) => setValorTabela(text)}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          placeholder="Valor de tabela"
          label="Valor de tabela"
        /> 
        <Input
          onChangeText={text => setEstoque(Number(text))}
          value={estoque.toString()}
          keyboardType="numeric"
          placeholder="Insira a quantidade em estoque"
        />
        <Input
          onChangeText={setCategoria}
          value={categoria}
          placeholder="Selecione a categoria"
        />
      </Content>
      <Button title="Salvar" onPress={() => console.log(precoCusto)}/>
    </Container>
  )
}