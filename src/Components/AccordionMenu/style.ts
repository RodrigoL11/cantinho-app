import styled from 'styled-components/native';
import { FontAwesome  } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export const Container = styled.View`
    width: 80%;
    margin-bottom: 10px;
`

export const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: lightgray;
    height: 56px;
    padding-left: 25px;
    padding-right: 18px;
`

export const Title = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: gray;
`

export const Icon = styled(FontAwesome)`
    
`

export const Menu = styled.View`
    background-color: #ddd;
    padding: 20px 14px 0 14px;
`

export const Item = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`
export const Name = styled.Text`
    font-size: 16px;
    font-weight: normal;
`

export const Value = styled.Text`
    font-size: 12px;
    margin-left: 15px;
    padding: 1px 8px;
    font-weight: bold;
    border-radius: 15px;
    background-color: #0c2;
    color: #FFF;
`

export const QuantityContainer = styled.View`
    flex-direction: row;
    position: absolute;
    right: 0;
    align-items: center;
`

export const RemoveButton = styled(Ionicons)`

`

export const AddButton = styled(Ionicons)`
    
`

export const Quantity = styled.TextInput`
    background-color: #fff;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
    margin: 0 10px;
`