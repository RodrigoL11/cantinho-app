import React, { Dispatch, SetStateAction } from 'react';

import Header from '@components/Header'
import Button from '@components/Button';
import { IPhone } from '@interfaces/main';

import {
  Container,
  Content,
} from './styles'

interface Props {
  id: number,
  toogleForm: () => void,
  setPhones: Dispatch<SetStateAction<IPhone[]>>,
  phones: IPhone[] | undefined,
}

export default function EditPhone({id, toogleForm, setPhones, phones}: Props) {
  return (
    <Container>
      <Header title="Editar telefone" onPress={toogleForm}/>
      
      <Button reverse={true} title="Excluir telefone"/>
      <Button title="Salvar"/>
    </Container>
  )
}