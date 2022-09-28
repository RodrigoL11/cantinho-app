import React, { Dispatch, SetStateAction, useState } from 'react'

import Header from '@components/Header'
import Input from '@components/Input'
import Button from '@components/Button'
import { IUser } from '@interfaces/main'

import {
    Container,
    Content,
    ErrorMessage
} from './styles'
import { Alert } from 'react-native'
import api from '@services/api'

interface Props {
    uID: number,
    user: IUser | undefined,
    toogleForm: () => void,
    setUser: Dispatch<SetStateAction<IUser | undefined>>,
}

export default function EditPassword({ uID, user, setUser, toogleForm }: Props) {
    const _oldPassword = user?.senha;

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [errors, setErrors] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = () => {
        let newErrors = {
            oldPassword: "",
            password: "",
            confirmPassword: ""
        }        

        if (oldPassword.trim() === "")
            newErrors.oldPassword = "Por favor, insira sua antiga senha"
        else if (oldPassword.trim() !== _oldPassword)
            newErrors.oldPassword = "Senha informada não confere com a antiga"

        if (password.trim() === "") newErrors.password = "Por favor, insira a nova senha"
        else if (password.trim().length < 8) newErrors.password = "Senha precisa ter 8 digítos no mínimo"
        else if (password.length < 8) newErrors.password = "Senha precisa ter 8 digítos no mínimo."
        else if (password.length > 15) newErrors.password = "Senha pode ter 15 digítos no máximo.";
        else if (!password.match(/[0-9]/)) newErrors.password = "Senha precisa de um número no mínimo.";
        else if (!password.match(/[A-Z]/)) newErrors.password = "Senha precisa de uma letra em caixa alta no mínimo.";
        else if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) newErrors.password = "Senha precisa de um caractere especial no mínimo.";

        if (confirmPassword.trim() === "")
            newErrors.confirmPassword = "Por favor, confirme sua nova senha"
        else if (confirmPassword.trim() !== password.trim())
            newErrors.confirmPassword = "Senhas não coincidem"

        let hasError = false;

        Object.keys(newErrors).forEach(function (key, index) {
            if (newErrors[key as keyof typeof newErrors] != "")
                hasError = true;
        })

        if(!hasError && user){
            Alert.alert(
                "Editar senha",
                `Tem certeza que deseja editar a senha ?`,
                [
                  {
                    text: "Sim",
                    onPress: async () => {
                      await api.put(`users/${uID}`, {
                        column: "senha",
                        value: password.trim()
                      })
                        .then(response => {
                          let newObj = user;
                          newObj.senha = password.trim();
                          setUser(newObj);                          
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
        } else{
            setErrors(newErrors);
        }
    }

    return (
        <Container>
            <Header title="Editar senha" onPress={toogleForm} />
            <Content>
                <Input
                    value={oldPassword}
                    onChangeText={text => setOldPassword(text.replace(/\s/g, ''))}
                    placeholder={"Insira sua senha antiga"}
                    secureTextEntry={true}
                />
                {errors.oldPassword ? (
                    <ErrorMessage>{errors.oldPassword}</ErrorMessage>
                ) : null}
                <Input
                    value={password}
                    onChangeText={text => setPassword(text.replace(/\s/g, ''))}
                    placeholder={"Insira sua nova senha"}
                    type="password"
                    secureTextEntry={secureText}
                    isVisible={secureText}
                    setVisible={setSecureText}
                />
                {errors.password ? (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                ) : null}
                <Input
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text.replace(/\s/g, ''))}
                    placeholder={"Confirme a nova senha"}
                    secureTextEntry={secureText}
                />
                {errors.confirmPassword ? (
                    <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                ) : null}
                <Button
                    title="Salvar"
                    onPress={handleSubmit}
                    style={{marginTop: 15}}
                />
            </Content>
        </Container>
    )
}