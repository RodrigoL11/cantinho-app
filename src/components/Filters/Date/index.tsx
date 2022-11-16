import React, { Dispatch, SetStateAction, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import {
  Container,
  DateContainer,
  Label,
  SubTitle
} from './styles'

import { formatDate } from '../../../utils/main';

interface Props {
  date: Date
  setDate: Dispatch<SetStateAction<Date>>
  subTitle: string
}

export default function DateFilter({ date, setDate, subTitle }: Props) {  
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  }

  return (
    <Container>
      <SubTitle>{subTitle}</SubTitle>
      <TouchableWithoutFeedback onPress={() => setShow(!show)}>
        <DateContainer>
          <Label>{formatDate(date)}</Label>
        </DateContainer>
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Container>
  )
}