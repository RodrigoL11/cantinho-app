import React, { Dispatch, SetStateAction, useState } from "react";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

import Header from "@components/Header";
import Button from "@components/Button";
import { IPhone } from "@interfaces/main";

import { Container, Content, Row, Column, Input, Label } from "./styles";

interface Props {
  id: number;
  toogleForm: () => void;
  setPhones: Dispatch<SetStateAction<IPhone[]>>;
  phones: IPhone[] | undefined;
}

const phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

export default function CreatePhone({
  id,
  toogleForm,
  setPhones,
  phones,
}: Props) {
  const [countryCode, setCountryCode] = useState<CountryCode>("BR");
  const [DDD, setDDD] = useState("55");
  const [numero, setNumero] = useState("");
  const [errors, setErrors] = useState({
    DDD: "",
    numero: ""
  });

  let DDI = "55";

  let DDDs = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "21",
    "22",
    "24",
    "27",
    "28",
    "31",
    "32",
    "33",
    "34",
    "35",
    "37",
    "38",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "51",
    "53",
    "54",
    "55",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "71",
    "73",
    "74",
    "75",
    "77",
    "79",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
  ];

  const handleSubmit = () => {

  }
  return (
    <Container>
      <Header title="Criar telefone" onPress={toogleForm} />
      <Content>
        <Label>Preencha todos campos</Label>
        <Row>
          <Column style={{ alignItems: "center" }} width={20}>
            <CountryPicker
              theme={{ flagSizeButton: 29, fontSize: 17 }}
              countryCode={countryCode}
              withCallingCodeButton
              withFilter
              withFlag
              withAlphaFilter
              withCallingCode
              withEmoji
              onSelect={(obj) => {
                DDI = obj.callingCode[0];
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
            />
          </Column>
          <Column style={{ paddingLeft: 5 }} width={70}>
            <Input
              value={numero}
              onChangeText={setNumero}
              mask={phoneMask}
              placeholder={"Insira seu número"}
            />
          </Column>
        </Row>

        <Button title="Salvar" />
      </Content>
    </Container>
  );
}
