import styled from "styled-components/native";

interface InputProps{
  size?: number;
}

export const Container = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.background };
  padding: 0px 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Column = styled.View<InputProps>`
  width: ${(props) => props.size || 100}%;
`

export const Title = styled.Text`
  font-size: 40px;
  color: ${({theme}) => theme.colors.text_color[800]};
  font-family: ${({theme}) => theme.fonts.bold};
  margin-top: 44px;
  margin-bottom: 34px;
`;

export const Section = styled.Text`
  font-size: 14px;
  height: 32px;
  border-bottom-width: 1.5px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.regular};
  border-color: #adadaa;
  line-height: 25px;
  margin-bottom: 14px;
  margin-top: 8px;
`

export const ErrorMessage = styled.Text`
  width: 100%;
  padding: 4.5px 8px;
  background-color: #fce6e5;
  color: #ee6d66;
  font-family: ${({theme}) => theme.fonts.semiBold};
  top: -8px;
  font-size: 11.5px;
`