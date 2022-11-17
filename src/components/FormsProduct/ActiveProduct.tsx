import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { ICategories, IProducts } from '@interfaces/main'
import api from '@services/api';

import Header from '@components/Header'
import Input from '@components/Input'
import Button from '@components/Button'
import MoneyInput from '@components/MoneyInput';
import DropDown from '@components/DropDown';

import {
  Container,
  Content,
  Row,
  Column,
} from './styles'
import { Alert } from 'react-native';

interface Props {
  toogleForm: () => void,
  setProducts: Dispatch<SetStateAction<IProducts[]>>,
  products: IProducts[],
  pID: number
  status: string
}

export default function ActiveProduct({ status, toogleForm, setProducts, products, pID }: Props) {
  const product = products.filter(p => p.id === pID)[0];
  const [nome, setNome] = useState(product.nome);
  const [valorTabela, setValorTabela] = useState<number>(product.valor_tabela);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selected, setSelected] = useState<ICategories>();

  const loadData = async () => {
    try {
      const reponse = await api.get(`categorias/status=A`);
      const { results } = reponse.data;
      setSelected(results.find((r: ICategories) => r.id == product.cID));
      setCategories(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const handleSubmit = async () => {
    if (!selected) return

    let validatedData = {
      ...product,
      nome: nome.trim(),
      valor_tabela: valorTabela,
      categoria_nome: selected.nome || product.categoria_nome,
      cID: selected.id,
      status: "A"
    }

    Alert.alert(
      "Ativar produto",
      `Tem certeza que deseja reativar o produto ${product.nome}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.put(`produtos/${product.id}`, {
              data: validatedData
            })
              .then(response => {
                toogleForm();
                if (status !== "T") 
                  setProducts(arr => arr.filter(item => item.id !== product.id))
                else {
                  let newArr = [...products];
                  newArr[products.indexOf(product)] = validatedData;
                  setProducts(newArr);
                  toogleForm();
                }
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

  return (
    <Container>
      <Header title="Reativar produto" onPress={toogleForm} />
      <Content>
        <Input
          onChangeText={setNome}
          value={nome}
          placeholder="Insira o nome"
          editable={false}
        />
        <Row>
          <Column>
            <MoneyInput
              value={valorTabela}
              onChangeValue={(text: number) => setValorTabela(text)}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}
              placeholder="Valor de tabela"
              label="Valor de tabela"
              editable={false}
            />
          </Column>
          <Column >
              <DropDown
                placeholder={selected?.nome || product.categoria_nome || "Categoria"}
                items={categories}
                onChange={setSelected}
                itemSelected={selected}
                tipo="Categoria"
                disabled={true}
              />
          </Column>
        </Row>
      </Content>
      <Button title="Reativar produto" onPress={handleSubmit} />
    </Container>
  )
}