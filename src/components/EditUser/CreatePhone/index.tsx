import React, { Dispatch, SetStateAction, useState } from 'react';
import CountryPicker from 'react-native-country-picker-modal'

import Header from '@components/Header'
import Button from '@components/Button'
import Input from '@components/Input'
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

const phoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

export default function CreatePhone({ id, toogleForm, setPhones, phones }: Props) {
  const [countryCode, setCountryCode] = useState('BR');
  const [country, setCountry] = useState(null)  
  const [DDD, setDDD] = useState("55");
  const [DDI, setDDI] = useState("16");
  const [numero, setNumero] = useState("");

  const onSelect = (country: any) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  return (
    <Container>
      <Header title="Criar telefone" onPress={toogleForm} />
      <Content>
        {/* <PhoneInput 
          textContainerStyle={{backgroundColor: "#fff"}}
          containerStyle={{width: "100%"}}
          codeTextStyle={{marginLeft: -17}}
          placeholder="Número de telefone"
          defaultCode='BR'
          value={'0'}
          onChangeText={text => {
            let newText = MaskPhone(text);
            setNumero('1')
            console.log(numero, text)
          }}
          onChangeFormattedText={text => setNumero('1')} 
          onChangeCountry={obj => setDDD(obj.callingCode[0])}
        /> */}
        <CountryPicker
          countryCode='BR'     
          visible
        />
        <Input
          value={numero}
          onChangeText={setNumero} 
          mask={phoneMask}
        />
        <Button title="Salvar" />
      </Content>
    </Container>
  )
}