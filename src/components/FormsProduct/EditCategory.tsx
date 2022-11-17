import React, { Dispatch, SetStateAction, useState } from 'react'

import { ICategories } from '@interfaces/main'
import api from '@services/api';

import Header from '@components/Header'
import Input from '@components/Input'
import Button from '@components/Button'
import DropDown from '@components/DropDown';

import {
  Container,
  Content,  
  ErrorMessage
} from './styles'
import { Alert } from 'react-native';

interface Props {
  toogleForm: () => void,
  setCategories: Dispatch<SetStateAction<ICategories[]>>,
  categories: ICategories[],
  cID: number
  status: string
}

const tipos = [
  {
    id: 0,
    nome: "Cozinha"
  },
  {
    id: 1,
    nome: "Balcão"
  },
  {
    id: 2,
    nome: "Churrasqueira"
  }
]

export default function EditCategory({ status, toogleForm, setCategories, categories, cID }: Props) {  
  const category = categories.filter(c => c.id === cID)[0];  
  const [nome, setNome] = useState(category.nome);
  const [selected, setSelected] = useState<{ id: number, nome: string }>(tipos.filter(t => t.nome === category.tipo)[0]);
  const [errors, setErrors] = useState({
    nome: "",
    selected: ""
  });

  const formatString = (text: string) => { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() }

  const handleSubmit = async () => {
    let _errors = {
      nome: "",
      selected: ""
    }            

    if (nome.length === 0) _errors.nome = "Por favor, insira um nome"
    else if (nome.length < 3) _errors.nome = "Nome muito curto"
    else if (nome.length > 50) _errors.nome = "Nome muito grande"
    else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(nome)) _errors.nome = "Nome não pode conter caracteres especiais"
    else if (formatString(nome) === formatString(category.nome)) _errors.nome = "Nome idêntico ao antigo, insira um diferente"
    else if (categories.some(c => formatString(c.nome) === formatString(nome))) _errors.nome = "Já existe uma categoria cadastrada com o mesmo nome"

    if (selected === undefined) _errors.selected = "Selecione um tipo"

    let hasError = false;

    Object.keys(_errors).forEach(function (key, index) {
      if (_errors[key as keyof typeof _errors] != "")
        hasError = true;
    })

    setErrors(_errors)

    if (!hasError) {
      if (!selected) return
      
      let validatedData: ICategories = {
        id: category.id,        
        tipo: selected.nome,
        nome: nome.trim(),
        status: 'A',
        NumberOfProducts: category.NumberOfProducts
      }

      Alert.alert(
        "Editar categoria",
        `Tem certeza que deseja editar a categoria ${category.nome} ?`,
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`categorias/${category.id}`, {
                data: validatedData
              })
                .then(response => {
                  let newArr = [...categories];
                  newArr[categories.indexOf(category)] = validatedData;
                  toogleForm();
                  setCategories(newArr);
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
      `Tem certeza que deseja excluir a categoria ${category.nome}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`categorias/${category.id}`)
              .then(response => {
                toogleForm();
                if (status !== "T") 
                  setCategories(arr => arr.filter(item => item.id !== category.id))
                else {                  
                    let newArr = [...categories];
                    newArr[categories.indexOf(category)] = {...category, status: "I"};
                    setCategories(newArr);
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
      <Header title="Editar categoria" onPress={toogleForm} />
      <Content>
        <Input
          onChangeText={setNome}
          value={nome}
          placeholder="Insira o nome"
        />
        {errors.nome ? <ErrorMessage>{errors.nome}</ErrorMessage> : null}

        <DropDown
          placeholder={selected?.nome || "Tipo"}
          items={tipos}
          onChange={setSelected}
          itemSelected={selected}
          tipo="Departamento"
        />
        {errors.selected ? <ErrorMessage>{errors.selected}</ErrorMessage> : null}
      </Content>
      <Button reverse={true} title="Excluir categoria" onPress={handleDelete} />
      <Button title="Salvar" onPress={handleSubmit} />
    </Container>
  )
}