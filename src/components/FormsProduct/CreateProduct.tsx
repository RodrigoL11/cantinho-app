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

interface Props {
  toogleForm: () => void,
  setProducts: Dispatch<SetStateAction<IProducts[]>>,
}

export default function CreateProduct({ toogleForm, setProducts }: Props) {
  const [nome, setNome] = useState("");
  const [valorTabela, setValorTabela] = useState<number>(0);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategories>();
  const [errors, setErrors] = useState({
    nome: "",
    valorTabela: "",
    selectedCategory: ""
  });

  const loadData = async () => {
    try {
      const reponse = await api.get(`categorias`);
      const { results } = reponse.data;
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
      selectedCategory: ""
    }

    if (nome.length === 0) _errors.nome = "Por favor, insira um nome"
    else if (nome.length < 3) _errors.nome = "Nome muito curto"
    else if (nome.length > 50) _errors.nome = "Nome muito grande"
    else if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(nome)) _errors.nome = "Nome não pode conter caracteres especiais"

    if (valorTabela == 0) _errors.valorTabela = "Por favor, insira um valor de tabela"    
    else if (!isNumber(valorTabela)) _errors.valorTabela = "Valor de tabela não é um número"
    else if (valorTabela < 0) _errors.valorTabela = "Valor de tabela não pode ser negativo"    

    if (selectedCategory === undefined) _errors.selectedCategory = "Selecione uma categoria"

    let hasError = false;

    Object.keys(_errors).forEach(function (key) {
      if (_errors[key as keyof typeof _errors] != "")
        hasError = true;
    })

    setErrors(_errors)

    if (!hasError) {
      if(!selectedCategory) return

      let validatedData = {
        id: -1,
        nome: nome.trim(),
        valor_tabela: valorTabela,
        status: 'A',
        categoria_nome: selectedCategory.nome,
        cID: selectedCategory.id,
        quantidade: 0,        
      }
      
      await api.post('produtos', {
        data: validatedData
      }).then(response => {
          let newID = response.data.result.insertId;
          validatedData.id = newID;
          setProducts(arr => [...arr, validatedData])
          toogleForm();          
      })      
    }
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
            
          </Column>
          <Column>
            <DropDown
              placeholder={selectedCategory?.nome || "Categoria"}
              items={categories}
              onChange={setSelectedCategory}
            />
            {errors.selectedCategory ? <ErrorMessage>{errors.selectedCategory}</ErrorMessage> : null}
          </Column>
        </Row>
      </Content>
      <Button title="Salvar" onPress={handleSubmit} />
    </Container>
  )
}