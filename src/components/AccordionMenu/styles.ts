import styled from 'styled-components/native';

export const Container = styled.View`
    width: 90%;
    margin-bottom: 10px;
    padding-bottom: 10px;
    background-color: #00B29B;
    border-radius: 9px;
`

export const TitleContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #00B29B;
    height: 40px;
    padding: 0 18px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
`

export const Title = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #fff;
`

export const Menu = styled.View`
    background-color: #fff;
    padding: 10px 14px 0 14px;
`