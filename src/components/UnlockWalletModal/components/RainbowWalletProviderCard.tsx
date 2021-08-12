import React from 'react'
import { Button, Card, CardActions, CardContent, CardIcon } from 'react-neu'
import styled from 'styled-components'

import rainbowWalletLogo from 'assets/wallet-connect.svg'

interface RainbowWalletProviderCardProps {
  isDisabled?: boolean
  buttonText?: string
  onSelect: () => void
}

const RainbowWalletProviderCard: React.FC<RainbowWalletProviderCardProps> = ({
  isDisabled,
  buttonText,
  onSelect,
}) => (
  <ProviderContainer onClick={onSelect}>
    <Card>
      <CardIcon>
        <img
          alt='rainbowWalletLogo'
          src={rainbowWalletLogo}
          style={{ height: 32 }}
        />
      </CardIcon>
      <CardContent>
        <StyledName>{'Rainbow'}</StyledName>
      </CardContent>
      <CardActions>
        <Button
          full
          disabled={isDisabled}
          text={buttonText || 'Connect to Rainbow'}
        />
      </CardActions>
    </Card>
  </ProviderContainer>
)

const StyledName = styled.div`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`

const ProviderContainer = styled.div`
  cursor: pointer;
`

export default RainbowWalletProviderCard
