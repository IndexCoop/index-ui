import React from 'react'
import { Container, Spacer } from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import Explanation from 'components/Explanation'
import Split from 'components/Split'

import DeFiPulseIndex from './components/DeFiPulseIndex'
import FarmingTimer from './components/FarmingTimer'
import MarketData from './components/MarketData'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'

const Home: React.FC = () => {
  const { latestMarketCap } = useDpiTokenMarketData()

  return (
    <Page>
      <Container size='lg'>
        <HomeTitle>
          The Index Coop currently has{' '}
          <AuvText>
            {latestMarketCap?.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}{' '}
          </AuvText>
          in index products.
        </HomeTitle>
        <Explanation />
        <Spacer />
      </Container>
      <MarketData />
      <Spacer />
    </Page>
  )
}

const HomeTitle = styled.p`
  font-size: 60px;
  line-height: 1.2;
`

const AuvText = styled.span`
  font-size: 54px;
  line-height: 1;
  color: #03c75e;
  font-weight: 600;
`

export default Home
