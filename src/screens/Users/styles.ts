import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Content = styled.ScrollView`
    flex: 1;
    padding: 7px 0;
`

export const Card = styled.View`
    padding: 10px 14px;
    background-color: ${({theme}) => theme.colors.bgCard};
    margin: 7px 15px;
`

export const Nome = styled.Text`
    font-size: 14px;
    margin-bottom: 2px;
    color: ${({theme}) => theme.colors.text_color};
    font-family: ${({theme}) => theme.fonts.bold};
    
`

export const Label = styled.Text`
    line-height: 20px;
    font-size: 13px;
    color: ${({theme}) => theme.colors.text_color};
    font-family: ${({theme}) => theme.fonts.regular};
`

export const Row = styled.View`
    flex-direction: row;
    width: 100%;
`

export const Admin = styled.View`
    padding: 4px 8px;
    background-color: #DC1637;
    position: absolute;
    right: 4px;
    bottom: 4px;
    align-items: center;
    justify-content: center;
    border-radius: 99px;
`

export const AdminLabel = styled.Text`
    font-size: 8px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: #fff;
`

export const Options = styled.View`
    width: 45px;
    justify-content: space-between;
    position: absolute;
    flex-direction: row;
    right: 0;
`

export const ContentFooter = styled.View`
    height: 53px;
`