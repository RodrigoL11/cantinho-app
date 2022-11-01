import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    width: 68px;
    height: 68px;
    background-color: ${({ theme }) => theme.colors.primary_color};
    border-radius: 999px;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 25px;
    bottom: 25px;
`