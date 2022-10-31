import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    height: 80px;
    padding-top: 25px;
    background-color: #fff;
    flex-direction: row;
    align-items: center;
    box-shadow: 10px 5px 5px black;
    justify-content: space-between;
`

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Icon = styled.TouchableOpacity`
    margin-left: 3%;
`

export const Title = styled.Text`
    margin-left: 5%;
    font-weight: 400;
    font-size: 18px;
`

export const ExtraIcon = styled.TouchableOpacity`
    margin-right: 3%;
`