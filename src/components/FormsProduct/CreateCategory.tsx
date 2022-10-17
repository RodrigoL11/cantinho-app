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

interface Props {
  toogleForm: () => void,
  setCategories: Dispatch<SetStateAction<ICategories[]>>,
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

export default function CreateCategory({ toogleForm, setCategories }: Props) {
  const [nome, setNome] = useState("");
  const [selected, setSelected] = useState<{ id: number, nome: string }>();
  const [errors, setErrors] = useState({
    nome: "",
    precoCusto: "",
    valorTabela: "",
    estoque: "",
    selectedCategory: ""
  });

  const handleSubmit = async () => {
    let _errors = {
      nome: "",
      precoCusto: "",
      valorTabela: "",
      estoque: "",
      selectedCategory: ""
    }

    if (nome.length === 0) _errors.nome = "Por favor, insira um nome"
    else if (nome.length < 3) _errors.nome = "Nome muito curto"
    else if (nome.length > 50) _errors.nome = "Nome muito grande"
    else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(nome)) _errors.nome = "Nome não pode conter caracteres especiais"

    if (selected === undefined) _errors.selectedCategory = "Selecione um tipo"

    let hasError = false;

    Object.keys(_errors).forEach(function (key, index) {
      if (_errors[key as keyof typeof _errors] != "")
        hasError = true;
    })

    setErrors(_errors)

    if (!hasError) {
      if (!selected) return

      let validatedData: ICategories = {
        id: -1,
        tipo: selected.nome,
        nome: nome.trim(),
        status: 'ativo',
      }

      await api.post('categorias', {
        data: validatedData
      }).then(response => {
        let newID = response.data.result.insertId;
        validatedData.id = newID;
        setCategories(arr => [...arr, validatedData])
        toogleForm();
      })
    }
  }

  return (
    <Container>
      <Header title="Criar categoria" onPress={toogleForm} />
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
        />
        {errors.selectedCategory ? <ErrorMessage>{errors.selectedCategory}</ErrorMessage> : null}
      </Content>
      <Button title="Salvar" onPress={handleSubmit} />
    </Container>
  )
}