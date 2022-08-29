import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: 50%;
    height: 40px;
    background-color: ${({theme}) => theme.colors.bg_button};
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 20px;
    border-width: 1px;
    border-color: ${({theme}) => theme.colors.border_button};
    padding: 5px 16px;
    white-space: nowrap;
    border-radius: 6px;
`

export const Title = styled.Text`
    font-weight: 500;
    color: ${({theme}) => theme.colors.color_button};
    font-size: 14px;
    line-height: 20px;
`