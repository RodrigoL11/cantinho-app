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
import { Alert, View } from "react-native";

interface Props {
  id: number;
  toogleForm: () => void;
  setPhones: Dispatch<SetStateAction<IPhone[]>>;
  phones: IPhone[] | undefined;
}

const phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

const countryCodes = { "BD": "880", "BE": "32", "BF": "226", "BG": "359", "BA": "387", "BB": "+1-246", "WF": "681", "BL": "590", "BM": "+1-441", "BN": "673", "BO": "591", "BH": "973", "BI": "257", "BJ": "229", "BT": "975", "JM": "+1-876", "BV": "", "BW": "267", "WS": "685", "BQ": "599", "BR": "55", "BS": "+1-242", "JE": "+44-1534", "BY": "375", "BZ": "501", "RU": "7", "RW": "250", "RS": "381", "TL": "670", "RE": "262", "TM": "993", "TJ": "992", "RO": "40", "TK": "690", "GW": "245", "GU": "+1-671", "GT": "502", "GS": "", "GR": "30", "GQ": "240", "GP": "590", "JP": "81", "GY": "592", "GG": "+44-1481", "GF": "594", "GE": "995", "GD": "+1-473", "GB": "44", "GA": "241", "SV": "503", "GN": "224", "GM": "220", "GL": "299", "GI": "350", "GH": "233", "OM": "968", "TN": "216", "JO": "962", "HR": "385", "HT": "509", "HU": "36", "HK": "852", "HN": "504", "HM": " ", "VE": "58", "PR": "+1-787 and 1-939", "PS": "970", "PW": "680", "PT": "351", "SJ": "47", "PY": "595", "IQ": "964", "PA": "507", "PF": "689", "PG": "675", "PE": "51", "PK": "92", "PH": "63", "PN": "870", "PL": "48", "PM": "508", "ZM": "260", "EH": "212", "EE": "372", "EG": "20", "ZA": "27", "EC": "593", "IT": "39", "VN": "84", "SB": "677", "ET": "251", "SO": "252", "ZW": "263", "SA": "966", "ES": "34", "ER": "291", "ME": "382", "MD": "373", "MG": "261", "MF": "590", "MA": "212", "MC": "377", "UZ": "998", "MM": "95", "ML": "223", "MO": "853", "MN": "976", "MH": "692", "MK": "389", "MU": "230", "MT": "356", "MW": "265", "MV": "960", "MQ": "596", "MP": "+1-670", "MS": "+1-664", "MR": "222", "IM": "+44-1624", "UG": "256", "TZ": "255", "MY": "60", "MX": "52", "IL": "972", "FR": "33", "IO": "246", "SH": "290", "FI": "358", "FJ": "679", "FK": "500", "FM": "691", "FO": "298", "NI": "505", "NL": "31", "NO": "47", "NA": "264", "VU": "678", "NC": "687", "NE": "227", "NF": "672", "NG": "234", "NZ": "64", "NP": "977", "NR": "674", "NU": "683", "CK": "682", "XK": "", "CI": "225", "CH": "41", "CO": "57", "CN": "86", "CM": "237", "CL": "56", "CC": "61", "CA": "1", "CG": "242", "CF": "236", "CD": "243", "CZ": "420", "CY": "357", "CX": "61", "CR": "506", "CW": "599", "CV": "238", "CU": "53", "SZ": "268", "SY": "963", "SX": "599", "KG": "996", "KE": "254", "SS": "211", "SR": "597", "KI": "686", "KH": "855", "KN": "+1-869", "KM": "269", "ST": "239", "SK": "421", "KR": "82", "SI": "386", "KP": "850", "KW": "965", "SN": "221", "SM": "378", "SL": "232", "SC": "248", "KZ": "7", "KY": "+1-345", "SG": "65", "SE": "46", "SD": "249", "DO": "+1-809 and 1-829", "DM": "+1-767", "DJ": "253", "DK": "45", "VG": "+1-284", "DE": "49", "YE": "967", "DZ": "213", "US": "1", "UY": "598", "YT": "262", "UM": "1", "LB": "961", "LC": "+1-758", "LA": "856", "TV": "688", "TW": "886", "TT": "+1-868", "TR": "90", "LK": "94", "LI": "423", "LV": "371", "TO": "676", "LT": "370", "LU": "352", "LR": "231", "LS": "266", "TH": "66", "TF": "", "TG": "228", "TD": "235", "TC": "+1-649", "LY": "218", "VA": "379", "VC": "+1-784", "AE": "971", "AD": "376", "AG": "+1-268", "AF": "93", "AI": "+1-264", "VI": "+1-340", "IS": "354", "IR": "98", "AM": "374", "AL": "355", "AO": "244", "AQ": "", "AS": "+1-684", "AR": "54", "AU": "61", "AT": "43", "AW": "297", "IN": "91", "AX": "+358-18", "AZ": "994", "IE": "353", "ID": "62", "UA": "380", "QA": "974", "MZ": "258" }

const DDDs = ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99'];

export default function CreatePhone({ id, toogleForm, setPhones, phones }: Props) {
  const selectedPhone = phones?.find(item => item.id === id);
  const [DDI, setDDI] = useState(selectedPhone?.DDI || "")

  let selectedCountryCode: CountryCode = "BR"

  Object.keys(countryCodes).forEach(function (key, index) {
    if (countryCodes[key as keyof typeof countryCodes] === DDI)
      selectedCountryCode = key as CountryCode;
  })

  const [countryCode, setCountryCode] = useState<CountryCode>(selectedCountryCode || "BR");
  const [DDD, setDDD] = useState(selectedPhone?.DDD || "16");
  const [numero, setNumero] = useState(selectedPhone?.num_telefone || "");
  const [errors, setErrors] = useState({
    DDI: "",
    DDD: "",
    numero: ""
  });

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
    else if (numero.trim().length != 9 || numero.trim()[0] !== "9" && DDI === "55")
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
        id: id,
        DDI: DDI,
        DDD: DDD,
        num_telefone: numero,
        status: "A"
      }

      if (phones && selectedPhone) {
        Alert.alert(
          "Editar telefone",
          "Tem certeza que deseja editar o número de telefone ?",
          [
            {
              text: "Sim",
              onPress: async () => {
                await api.put(`phones/update/${id}`, {
                  data: validatedData
                }).then(response => {
                  let newArr = [...phones]
                  newArr[phones.indexOf(selectedPhone)] = validatedData;
                  setPhones(newArr);
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
    } else {
      setErrors(newErrors)
    }
  }

  const deletePhone = () => {
    Alert.alert(
      "Deletar telefone",
      `Tem certeza que deseja excluir o número de telefone ?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`phones/delete/${id}`)
              .then(response => {
                console.log(response);
                if (phones) setPhones(phones.filter(item => item !== selectedPhone))
                toogleForm();
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
      <Header title="Editar telefone" onPress={toogleForm} />
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
        <Button reverse={true} onPress={deletePhone} title="Excluir telefone" />
        <Button onPress={handleSubmit} title="Salvar" />
      </Content>
    </Container>
  );
}
