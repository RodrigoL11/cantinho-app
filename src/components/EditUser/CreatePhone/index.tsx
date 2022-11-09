import React, { Dispatch, SetStateAction, useState } from "react";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

import Header from "@components/Header";
import Button from "@components/Button";
import { IPhone } from "@interfaces/main";
import api from "@services/api";

import {
  Container,
  Content,
  Row,
  Column,
  Input,
  Label,
  ErrorMessage
} from "./styles";
import { View } from "react-native";

interface Props {
  uID: number;
  toogleForm: () => void;
  setPhones: Dispatch<SetStateAction<IPhone[]>>;
  phones: IPhone[] | undefined;
}

const phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

export default function CreatePhone({ uID, toogleForm, setPhones }: Props) {
  const [countryCode, setCountryCode] = useState<CountryCode>("BR");
  const [DDD, setDDD] = useState("16");
  const [DDI, setDDI] = useState("55");
  const [numero, setNumero] = useState("");
  const [errors, setErrors] = useState({
    DDI: "",
    DDD: "",
    numero: ""
  });

  const DDDs = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'];

  const handleSubmit = async () => {
    let newErrors = {
      DDI: "",
      DDD: "",
      numero: ""
    };

    if (DDI.trim().length === 0)
      newErrors.DDI = "Por favor, insira DDI válido"

    if (DDD.trim().length == 0)
      newErrors.DDD = "Por favor insira um DDD"
    else if (!DDDs.includes(DDD.trim()) && DDI == "55")
      newErrors.DDD = "Insira um DDD válido"

    if (numero.trim().length === 0)
      newErrors.numero = "Por favor, insira um número de telefone"
    else if ((numero.trim().length != 9 || numero.trim()[0] !== "9") && DDI === "55")
      newErrors.numero = "Insira um número de telefone válido"
    else if (numero.trim().length < 5)
      newErrors.numero = "Número muito curto"

    let hasError = false;

    Object.keys(newErrors).forEach(function (key, index) {
      if (newErrors[key as keyof typeof newErrors] != "")
        hasError = true;
    })

    if (!hasError) {
      const validatedData = {
        id: undefined,
        DDI: DDI,
        DDD: DDD,
        num_telefone: numero,
        uID: uID,
        status: 'A',
      }

      await api.post('phones', {
        data: validatedData
      }).then(response => {
        let newID = response.data.result.insertId;
        validatedData.id = newID;
        setPhones(arr => [...arr, validatedData])
        toogleForm();
      })
    } else
      setErrors(newErrors)
  }

  return (
    <Container>
      <Header title="Criar telefone" onPress={toogleForm} />
      <Content>
        <Label>Preencha todos campos</Label>
        <Row>
          <Column style={{ alignItems: "center" }} width={23}>
            <CountryPicker
              theme={{ flagSizeButton: 27, fontSize: 14.5 }}
              countryCode={countryCode}
              withCallingCodeButton
              withFilter
              withFlag
              withAlphaFilter
              withCallingCode
              withEmoji
              onSelect={(obj) => {
                setDDI(obj.callingCode[0]);
                setCountryCode(obj.cca2);
              }}
            />
          </Column>
          <Column style={{ alignItems: "center" }} width={10}>
            <Input
              style={{ textAlign: "center" }}
              value={DDD}
              onChangeText={setDDD}
              maxLength={2}
              placeholder={"DDD"}
              keyboardType="numeric"
            />
          </Column>
          <Column style={{ paddingLeft: 5 }} width={67}>
            <Input
              value={numero}
              onChangeText={(masked, unmasked) => setNumero(unmasked)}
              mask={DDI === "55" ? phoneMask : undefined}
              maxLength={15}
              placeholder={"Insira seu número"}
              keyboardType="numeric"
            />
          </Column>
        </Row>
        {errors.DDI ? (
          <ErrorMessage>{errors.DDI}</ErrorMessage>
        ) : null
        }
        {errors.DDD ? (
          <ErrorMessage>{errors.DDD}</ErrorMessage>
        ) : null
        }
        {errors.numero ? (
          <ErrorMessage>{errors.numero}</ErrorMessage>
        ) : null
        }
        <View style={{ marginTop: 20 }} />
        <Button onPress={handleSubmit} title="Salvar" />
      </Content>
    </Container>
  );
}
