import React from 'react';

import { Container, Title, Subtitle } from './styles';

interface Props {
  title: string
  subtitle?: string
}

export default function Empty ({ title, subtitle }: Props) {
  return (
    <Container>
      <Title>{ title }</Title>
      <Subtitle>{ subtitle }</Subtitle>
    </Container>
  )
}