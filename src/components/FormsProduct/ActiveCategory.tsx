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

  const handleSubmit = async () => {    
      if (!selected) return
      
      let validatedData: ICategories = {
        id: category.id,        
        tipo: selected.nome,
        nome: nome.trim(),
        status: 'A',
        NumberOfProducts: category.NumberOfProducts
      }

      Alert.alert(
        "Ativar categoria",
        `Tem certeza que deseja reativar a categoria ${category.nome}?`,
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`categorias/${category.id}`, {
                data: validatedData
              })
                .then(response => {
                  toogleForm();
                if (status !== "T") 
                  setCategories(arr => arr.filter(item => item.id !== category.id))
                else {
                  let newArr = [...categories];
                  newArr[categories.indexOf(category)] = validatedData;
                  setCategories(newArr);
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
      <Header title="Reativar categoria" onPress={toogleForm} />
      <Content>
        <Input
          onChangeText={setNome}
          value={nome}
          placeholder="Insira o nome"
          editable={false}
        />       

        <DropDown
          placeholder={selected?.nome || "Tipo"}
          items={tipos}
          onChange={setSelected}
          itemSelected={selected}
          tipo="Departamento"
          disabled={true}
        />       
      </Content>      
      <Button title="Reativar categoria" onPress={handleSubmit} />
    </Container>
  )
}