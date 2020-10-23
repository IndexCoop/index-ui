import React from 'react'
import styled from 'styled-components'

import useDpiTokenMarketData from 'hooks/useDpiTokenMarketData'

const Home: React.FC = () => {
  const { latestMarketCap } = useDpiTokenMarketData()

  return (
    <HomeTitle>
      The Index Coop currently has{' '}
      <AuvText>
        {latestMarketCap?.toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
        })}{' '}
      </AuvText>
      diversified in crypto index products.
    </HomeTitle>
  )
}

const HomeTitle = styled.p`
  font-size: 72px;
  line-height: 1.2;
`

const AuvText = styled.span`
  font-size: 72px;
  line-height: 1;
  color: #03c75e;
  font-weight: 600;
`

export default Home
