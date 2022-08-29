import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { TouchableWithoutFeedbackProps } from 'react-native';

export const Name = styled.Text`
    font-size: 16px;
    font-weight: normal;
`

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
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