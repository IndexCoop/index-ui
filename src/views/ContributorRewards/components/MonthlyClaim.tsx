import React, { useMemo } from 'react'
import { Button, Card, CardActions, CardContent, Spacer } from 'react-neu'
import styled from 'styled-components'
import useWallet from '../../../hooks/useWallet'
import MonthsDropdown from './MonthsDropdown'

const MonthlyClaim: React.FC = () => {
  const { status } = useWallet()

  const onHarvest = () => {}

  const ClaimButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Claim' variant='secondary' />
    }
    return <Button full onClick={onHarvest} text='Claim' />
  }, [status, onHarvest])

  return (
    <>
      <Card>
        <CardContent>
          {/*<StyledHeaderIcon*/}
          {/*  alt='active icon'*/}
          {/*  src='https://index-dao.s3.amazonaws.com/up-arrow.svg'*/}
          {/*/>*/}
          <Spacer size='sm' />
          {/*<StyledCardTitle>November</StyledCardTitle>*/}
          <MonthsDropdown />
          <Spacer />
          <StyledSectionTitle>
            {0.0}
            <StyledTokenIcon
              alt='owl icon'
              src='https://index-dao.s3.amazonaws.com/owl.png'
            />
          </StyledSectionTitle>
          <StyledSectionLabel>Unclaimed INDEX</StyledSectionLabel>
        </CardContent>
        <CardActions>{ClaimButton}</CardActions>
      </Card>
    </>
  )
}

const StyledHeaderIcon = styled.img`
  height: 58px;
  width: 58px;
`

const StyledTokenIcon = styled.img`
  height: 20px;
  margin-left: 10px;
`

const StyledCardTitle = styled.span`
  font-weight: 600;
  font-size: 28px;
`

const StyledCardText = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 600;
  font-size: 18px;
`

const StyledSectionTitle = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 24px;
  padding-left: 8px;
`
const StyledSectionLabel = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 16px;
  padding-left: 8px;
`

export default MonthlyClaim
