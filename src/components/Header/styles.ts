import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    width: 100%;
    height: 80px;
    padding-top: 25px;
    background-color: #dadada;
    flex-direction: row;
    align-items: center;
`

export const Icon = styled.TouchableOpacity`
    margin-left: 1%;
`

export const Title = styled.Text`
    margin-left: 3%;
    font-weight: 600;
    font-size: 19px;
`