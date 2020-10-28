import React from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import MarketData from './components/MarketData'
import DpiHoldings from './components/DpiHoldings'
import DpiPriceChanges from './components/DpiPriceChanges'
import DpiTokenStats from './components/DpiTokenStats'

const Home: React.FC = () => {
  return (
    <Page>
      <Container>
        <MarketData />
        <DpiHoldings />
        <DpiPriceChanges />
        <DpiTokenStats />
      </Container>
    </Page>
  )
}

export default Home
