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
      {name}
    </CardContent>
    <CardActions>
      <Button
        onClick={onSelect}
        text="Select"
        variant="secondary"
      />
    </CardActions>
  </Card>
)

export default WalletProviderCard