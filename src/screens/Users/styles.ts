import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`

export const Content = styled.ScrollView`
    padding: 15px;
`

export const Card = styled.View`
    padding: 10px 14px;
    background-color: #fff;
    margin-bottom: 14px;
`

export const Nome = styled.Text`
    font-size: 14px;
    margin-bottom: 2px;
`

export const Label = styled.Text`
    line-height: 20px;
    font-size: 13px;
    color: #888;
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
    font-weight: bold;
    color: #fff;
`

export const Options = styled.View`
    width: 45px;
    justify-content: space-between;
    position: absolute;
    flex-direction: row;
    right: 0;
`