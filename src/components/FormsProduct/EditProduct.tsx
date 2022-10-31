import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { isNumber } from 'lodash';

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
  ErrorMessage
} from './styles'
import { Alert } from 'react-native';

interface Props {
  toogleForm: () => void,
  setProducts: Dispatch<SetStateAction<IProducts[]>>,
  products: IProducts[],
  pID: number
}

export default function EditProduct({ toogleForm, setProducts, products, pID }: Props) {
  const product = products.filter(p => p.id === pID)[0];
  const [nome, setNome] = useState(product.nome);
  const [precoCusto, setPrecoCusto] = useState<number>(product.preco_custo);
  const [valorTabela, setValorTabela] = useState<number>(product.valor_tabela);
  const [estoque, setEstoque] = useState<number>(product.quantidade_estoque);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selected, setSelected] = useState<ICategories>();
  const [errors, setErrors] = useState({
    nome: "",
    precoCusto: "",
    valorTabela: "",
    estoque: "",
    selected: ""
  });

  const loadData = async () => {
    try {
      const reponse = await api.get(`categorias`);
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
    let _errors = {
      nome: "",
      precoCusto: "",
      valorTabela: "",
      estoque: "",
      selected: ""
    }

    if (nome.length === 0) _errors.nome = "Por favor, insira um nome"
    else if (nome.length < 3) _errors.nome = "Nome muito curto"
    else if (nome.length > 50) _errors.nome = "Nome muito grande"
    else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(nome)) _errors.nome = "Nome não pode conter caracteres especiais"

    if (precoCusto == 0) _errors.precoCusto = "Por favor, insira um preço"
    else if (valorTabela < precoCusto) _errors.valorTabela = "Valor de venda não pode ser menor que o preço de custo"
    else if (!isNumber(precoCusto)) _errors.precoCusto = "Preço não é um número"
    else if (precoCusto < 0) _errors.precoCusto = "Preço não pode ser negativo"

    if (valorTabela == 0) _errors.valorTabela = "Por favor, insira um valor de tabela"
    else if (!isNumber(valorTabela)) _errors.valorTabela = "Valor de tabela não é um número"
    else if (valorTabela < 0) _errors.valorTabela = "Valor de tabela não pode ser negativo"

    if (estoque == 0) _errors.estoque = "Por favor, insira um estoque"
    else if (!isNumber(estoque)) _errors.estoque = "Estoque não é um número"
    else if (estoque < 0) _errors.estoque = "Estoque não pode ser negativo"

    if (selected === undefined) _errors.selected = "Selecione uma categoria"

    let hasError = false;

    Object.keys(_errors).forEach(function (key, index) {
      if (_errors[key as keyof typeof _errors] != "")
        hasError = true;
    })

    setErrors(_errors)

    if (!hasError) {
      if (!selected) return

      console.log(selected)

      let validatedData = {
        id: product.id,
        nome: nome.trim(),
        preco_custo: precoCusto,
        quantidade_estoque: estoque,
        valor_tabela: valorTabela,
        status: product.status,
        categoria_nome: selected.nome || product.categoria_nome,
        cID: selected.id
      }

      Alert.alert(
        "Editar produto",
        `Tem certeza que deseja editar o produto ${product.nome} ?`,
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`produtos/${product.id}`, {
                data: validatedData
              })
                .then(response => {
                  let newArr = [...products];
                  newArr[products.indexOf(product)] = validatedData;
                  setProducts(newArr);
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
  }

  const handleDelete = async () => {
    Alert.alert(
      "Deletar produto",
      `Tem certeza que deseja excluir o produto ${product.nome}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`produtos/${product.id}`)
              .then(response => {
                toogleForm();
                setProducts(arr => arr.filter(item => item.id !== product.id))
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

  return (
    <Container>
      <Header title="Criar produto" onPress={toogleForm} />
      <Content>
        <Input
          onChangeText={setNome}
          value={nome}
          placeholder="Insira o nome"
        />
        {errors.nome ? <ErrorMessage>{errors.nome}</ErrorMessage> : null}
        <Row>
          <Column>
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
            {errors.precoCusto ? <ErrorMessage>{errors.precoCusto}</ErrorMessage> : null}
          </Column>
          <Column >
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
            {errors.valorTabela ? <ErrorMessage>{errors.valorTabela}</ErrorMessage> : null}
          </Column>
        </Row>
        <Row>
          <Column>
            <MoneyInput
              value={estoque}
              onChangeValue={(text: number) => setEstoque(text)}
              delimiter="."
              separator=","
              precision={2}
              placeholder="Em estoque"
              label="Estoque"
            />
            {errors.estoque ? <ErrorMessage>{errors.estoque}</ErrorMessage> : null}
          </Column>
          <Column>
            <DropDown
              placeholder={selected?.nome || product.categoria_nome || "Categoria"}
              items={categories}
              onChange={setSelected}
              itemSelected={selected}  
            />
            {errors.selected ? <ErrorMessage>{errors.selected}</ErrorMessage> : null}
          </Column>
        </Row>
      </Content>
      <Button title="Excluir produto" reverse={true} onPress={handleDelete} />
      <Button title="Salvar" onPress={handleSubmit} />
    </Container>
  )
}