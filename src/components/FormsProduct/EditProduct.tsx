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
import { formatString } from '../../utils/main';

interface Props {
  toogleForm: () => void,
  setProducts: Dispatch<SetStateAction<IProducts[]>>,
  products: IProducts[],
  pID: number
  status: string
}

export default function EditProduct({ status, toogleForm, setProducts, products, pID }: Props) {
  const product = products.filter(p => p.id === pID)[0];
  const [nome, setNome] = useState(product.nome);
  const [valorTabela, setValorTabela] = useState<number>(product.valor_tabela);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selected, setSelected] = useState<ICategories>();
  const [errors, setErrors] = useState({
    nome: "",
    valorTabela: "",
    selected: ""
  });

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
    let _errors = {
      nome: "",      
      valorTabela: "",
      selected: ""
    }

    if (nome.length === 0) _errors.nome = "Por favor, insira um nome"
    else if (nome.length < 3) _errors.nome = "Nome muito curto"
    else if (nome.length > 50) _errors.nome = "Nome muito grande"
    else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(nome)) _errors.nome = "Nome não pode conter caracteres especiais"    
    else if (products.some(p => formatString(p.nome) === formatString(nome) && formatString(nome) !== formatString(product.nome))) _errors.nome = "Já existe um produto cadastrado com o mesmo nome"

    if (valorTabela == 0) _errors.valorTabela = "Por favor, insira um valor de tabela"
    else if (!isNumber(valorTabela)) _errors.valorTabela = "Valor de tabela não é um número"
    else if (valorTabela < 0) _errors.valorTabela = "Valor de tabela não pode ser negativo"
    else if (valorTabela > 10000) _errors.valorTabela = "Valor de tabela não pode ser maior que 10 mil"    
    else if (valorTabela <= (product.preco_minimo || 0)) _errors.valorTabela = `Valor inferior ou igual ao preço de custo (R$${product.preco_minimo?.toFixed(2)})`

    if (selected === undefined) _errors.selected = "Selecione uma categoria"

    let hasError = false;

    Object.keys(_errors).forEach(function (key, index) {
      if (_errors[key as keyof typeof _errors] != "")
        hasError = true;
    })

    setErrors(_errors)


    if ((formatString(nome) === formatString(product.nome)) && (selected?.nome === product.categoria_nome) && (product.valor_tabela === valorTabela)){
      Alert.alert("Atenção", "Nenhum campo foi alterado para que o produto seja editado");
      return;
    }

    if (!hasError) {
      if (!selected) return

      console.log(selected)

      let validatedData = {
        ...product,
        nome: nome.trim(),        
        valor_tabela: valorTabela,
        categoria_nome: selected.nome || product.categoria_nome,        
        cID: selected.id,        
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
                if (status !== "T") 
                  setProducts(arr => arr.filter(item => item.id !== product.id))
                else {                  
                    let newArr = [...products];
                    newArr[products.indexOf(product)] = {...product, status: "I"};
                    setProducts(newArr);
                    toogleForm();                  
                }
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
      <Header title="Editar produto" onPress={toogleForm} />
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
              value={valorTabela}
              onChangeValue={(text: number) => setValorTabela(text)}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}
              placeholder="Valor de tabela"
              label="Valor de tabela"
            />
            
          </Column>
          <Column >
          <DropDown
              placeholder={selected?.nome || product.categoria_nome || "Categoria"}
              items={categories}
              onChange={setSelected}
              itemSelected={selected}
              tipo="Categoria"  
            />
          </Column>
        </Row>
        {errors.valorTabela ? <ErrorMessage>{errors.valorTabela}</ErrorMessage> : null}
        {errors.selected ? <ErrorMessage>{errors.selected}</ErrorMessage> : null}        
      </Content>
      <Button title="Excluir produto" reverse={true} onPress={handleDelete} />
      <Button title="Salvar" onPress={handleSubmit} />
    </Container>
  )
}