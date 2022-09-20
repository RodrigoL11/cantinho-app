import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    padding: 0 10px;
    position: absolute;
    justify-content: flex-end;
`

export const Content = styled.View`
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 15px 20px;
    height: 250px;
    width: 100%;
    background-color: #fbfbfbfb;
    justify-content: space-between;
`

export const Title = styled.Text`
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
`