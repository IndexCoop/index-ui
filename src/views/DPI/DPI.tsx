import React from 'react'
import { Container, Spacer } from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import { BuyTokenPlaceholder } from 'components/BuyToken'
import MarketData from './components/MarketData'
import DpiHoldings from './components/DpiHoldings'
import DpiPriceChanges from './components/DpiPriceChanges'
import DpiTokenStats from './components/DpiTokenStats'

const Home: React.FC = () => {
  return (
    <Page>
      <Container size='lg'>
        <ProductPageHeader>
          <MarketData />
          <BuyTokenPlaceholder />
        </ProductPageHeader>
        <ProductPageContent>
          <DpiHoldings />
          <DpiPriceChanges />
          <DpiTokenStats />
        </ProductPageContent>
      </Container>
    </Page>
  )
}

const ProductPageHeader = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: [chart] 60% [buybox] 30%;
  }
`

const ProductPageContent = styled.div`
  @media (min-width: 768px) {
    width: 60%;
  }
`

export default Home
