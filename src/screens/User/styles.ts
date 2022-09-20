import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`
export const Content = styled.ScrollView`
    
`

export const Label = styled.Text`
    padding-left: 20px;
    color: #777;
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 10px;
`

export const Section = styled.View`
    padding: 20px;
    background-color: #fff;
    border-bottom-width: 1px;
    border-color: #dadada;
`

export const AddButtonContainer = styled.TouchableOpacity`
    background-color: #fff;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
`

export const AddButton = styled.View`
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.primary_color};
`

export const AddButtonLabel = styled.Text`
    font-size: 13px;
    margin-left: 3%;
    color: ${({ theme }) => theme.colors.primary_color};
`

export const Emoji = styled.Text`
    text-align: center;
    font-size: 18px;
    bottom: -6px;
`

export const EmptyNotification = styled.Text`
    top: -6px;
    font-size: 15px;
    color: #333;
    text-align: center;
    font-weight: 300;
    letter-spacing: 1.5px;
`

export const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #fff;
    padding: 14px 20px;
    padding-right: 30px;
    border-bottom-width: 0.5px;
    border-color: #999;
    justify-content: space-between;
    align-items: center;
`

export const ItemText = styled.Text`
    color: #777;
    font-size: 13.5px;
`

export const IconContainer = styled.View`
    position: absolute;
    right: 4.5px;
`

export const Row = styled.View`
    flex-direction: row;
`

export const DataContainer = styled.View`
`

export const DataLabel = styled.Text`
    font-size: 13px;
    color: #777;
`
