import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth'
import { AntDesign, Entypo } from '@expo/vector-icons'

import {
    Container,
    Title,
    InputContainer,
    InputPassword,
    Input,
    Footer,
    SubTitle,
    LinkText,
} from '../SignIn/styles'
import Button from '../../components/Button';

export default function SignUp() {
    const navigator = useNavigation();
    const { signUp } = useAuth();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [secureText, setSecureText] = useState<boolean>(true);

    async function handleRegistration() {
        if (password != confirmPassword) 
            Alert.alert("Senhas não coincidem", 'Tente novamente');
        else {

            const data = {
                email: email.trim(),
                id: 0,
                name: name,
                password: password,
                token: 'user',
            }

            signUp(data).catch((error) => { Alert.alert(error.message, 'Tente novamente') })
        }
    }

    return (
            <Container>
                <Title>Sign Up to App</Title>
                <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                />
                <Input
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                />
                <InputContainer>
                    <InputPassword 
                        value={password}
                        secureTextEntry={secureText}                        
                        onChangeText={value => {
                            setPassword(value.replace(/\s/g, ''))
                        }}
                        placeholder="Password"
                    />
                    <Entypo onPress={() => setSecureText(!secureText)} style={{paddingRight: 10}} name={secureText ? 'eye-with-line' : 'eye'} size={20} color="#727272" />
                </InputContainer>
                <Input
                    value={confirmPassword}
                    secureTextEntry={secureText}
                    onChangeText={value => {
                        setConfirmPassword(value.replace(/\s/g, ''))
                    }}
                    placeholder="Confirm password"
                />
                <Button 
                    onPress={handleRegistration}
                    title="Sign Up"    
                />                
                <Footer>
                    <SubTitle>Already have an account? </SubTitle>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigator.goBack()}>
                        <LinkText>Sign In</LinkText>
                        <AntDesign name="arrowright" size={20} color="#58a6ff" />
                    </TouchableOpacity>
                </Footer>
            </Container>
    );
}