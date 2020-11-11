import React from 'react'
import styled from 'styled-components'

import { Card } from 'react-neu'

const BuyTokenPlaceholder: React.FC = () => {
  return (
    <StyledBuyCard>
      <Card>
        <CenteredContent>
          <BuyIcon
            src='https://index-dao.s3.amazonaws.com/buy-sell.svg'
            alt='Buy Index Coop Product'
          />
          <div>
            <LargeText> Buy & Sell </LargeText>
            <SmallText> Coming Soon </SmallText>
          </div>
        </CenteredContent>
      </Card>
    </StyledBuyCard>
  )
}

const StyledBuyCard = styled.div`
  max-height: 200px;
  @media (min-width: 768px) {
    max-height: 500px;
  }
`

const CenteredContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  padding: 32px 48px;
  @media (min-width: 400px) {
    flex-direction: column;
    text-align: center;
  }
`

const BuyIcon = styled.img`
  margin-right: 16px;
`

const LargeText = styled.div`
  font-size: 24px;
  font-weight: 600;
`
const SmallText = styled.div`
  font-size: 20px;
`

export default BuyTokenPlaceholder
