import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
} from 'react-neu'
import styled from 'styled-components'

interface WalletProviderCardProps {
  icon: React.ReactNode,
  name: string,
  onSelect: () => void
}
const WalletProviderCard: React.FC<WalletProviderCardProps> = ({
  icon,
  name,
  onSelect,
}) => (
  <ProviderContainer onClick={onSelect}>
    <Card>
      <CardIcon>{icon}</CardIcon>
      <CardContent>
        <StyledName>{name}</StyledName>
      </CardContent>
      <CardActions>
        <Button
          full
          text="Select"
          variant="secondary"
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

export default WalletProviderCard