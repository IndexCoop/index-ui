import React from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import MarketData from './components/MarketData'

const Home: React.FC = () => {
  return (
    <Page>
      <Container size='lg'>
        <MarketData />
      </Container>
    </Page>
  )
}

export default Home
