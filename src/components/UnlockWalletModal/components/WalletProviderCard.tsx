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
  <Card>
    <CardIcon>{icon}</CardIcon>
    <CardContent>
      <StyledName>{name}</StyledName>
    </CardContent>
    <CardActions>
      <Button
        full
        onClick={onSelect}
        text="Select"
        variant="secondary"
      />
    </CardActions>
  </Card>
)

const StyledName = styled.div`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`

export default WalletProviderCard