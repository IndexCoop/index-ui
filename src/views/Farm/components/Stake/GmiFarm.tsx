import React, { useCallback, useMemo, useState } from 'react'

import { Button, Card, CardActions, CardContent, Spacer } from 'react-neu'

import numeral from 'numeral'
import styled from 'styled-components'

import indexToken from 'assets/index-token.png'
import Split from 'components/Split'
import { GmiIndex } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useGmiFarming from 'hooks/useGmiFarming'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'
import { displayFromWei, fromWei } from 'utils'

import GmiStakeModal from './components/GmiStakeModal'

const Stake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)

  const { stakedGmiBalance: stakedBalance, unharvestedIndexFromGmiBalance } =
    useBalances()
  const { status } = useWallet()
  const { isApproved, isApproving, onApprove, onStake, onUnstakeAndHarvest } =
    useGmiFarming()
  const { gmiRewardsApy } = usePrices()

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleOnStake = useCallback(
    (amount: string) => {
      onStake(amount)
      handleDismissStakeModal()
    },
    [handleDismissStakeModal, onStake]
  )

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Stake' variant='secondary' />
    }

    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={onApprove}
          text={!isApproving ? 'Approve staking' : 'Approving staking...'}
          variant={
            isApproving || status !== 'connected' ? 'secondary' : 'default'
          }
        />
      )
    }

    if (isApproved) {
      return <Button full onClick={handleStakeClick} text='Stake' />
    }
  }, [isApproved, isApproving, status, handleStakeClick, onApprove])

  const UnstakeButton = useMemo(() => {
    const hasStaked = stakedBalance && fromWei(stakedBalance).gt(0)
    if (status !== 'connected' || !hasStaked) {
      return <Button disabled full text='Unstake & Claim' variant='secondary' />
    }
    return (
      <Button
        full
        onClick={onUnstakeAndHarvest}
        text='Unstake & Claim'
        variant='secondary'
      />
    )
  }, [stakedBalance, status, onUnstakeAndHarvest])

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance) {
      return displayFromWei(stakedBalance, 5)
    } else {
      return '--'
    }
  }, [stakedBalance])

  const formattedEarnedBalance = useMemo(() => {
    if (unharvestedIndexFromGmiBalance) {
      return displayFromWei(unharvestedIndexFromGmiBalance, 5)
    } else {
      return '--'
    }
  }, [unharvestedIndexFromGmiBalance])

  return (
    <>
      <Card>
        <div data-cy='expired-farm-widget'>
          <CardContent>
            <StyledCardTitleWrapper>
              <StyledHeaderIcon alt='GMI icon' src={GmiIndex.image} />
              <Spacer size='md' />
              <StyledLmTitle>
                <StyledCardTitle>GMI Staking</StyledCardTitle>
                <Spacer size='sm' />
                <StyledCardSubtitle>
                  Active Jan. 10th, 2022 - Mar. 10th, 2022
                </StyledCardSubtitle>
              </StyledLmTitle>
            </StyledCardTitleWrapper>
            <Spacer />

            <StyledFarmTokensAndApyWrapper>
              <Split>
                <div>
                  <StyledFarmText>
                    {formattedStakedBalance}
                    <StyledTokenIcon alt='gmi icon' src={GmiIndex.image} />
                  </StyledFarmText>
                  <StyledSectionLabel>Staked GMI Tokens</StyledSectionLabel>
                </div>

                <div>
                  <StyledFarmText>{gmiRewardsApy}% APR</StyledFarmText>
                  <StyledSectionLabel>(Volatile)</StyledSectionLabel>
                </div>

                <div>
                  <StyledFarmText>
                    {formattedEarnedBalance}
                    <StyledTokenIcon src={indexToken} alt='Index token' />
                  </StyledFarmText>
                  <StyledSectionLabel>
                    Unclaimed INDEX in pool
                  </StyledSectionLabel>
                </div>
              </Split>
            </StyledFarmTokensAndApyWrapper>
          </CardContent>
          <CardActions>
            {StakeButton}
            {UnstakeButton}
          </CardActions>
        </div>
      </Card>
      <GmiStakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
      />
    </>
  )
}

const StyledHeaderIcon = styled.img`
  height: 58px;
  width: 58px;
  margin-bottom: 10px;
`

const StyledTokenIcon = styled.img`
  height: 20px;
  margin-left: 10px;
`

const StyledCardTitle = styled.span`
  font-weight: 600;
  font-size: 28px;
`

const StyledCardSubtitle = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 600;
  font-size: 18px;
`

const StyledCardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-weight: 600;
  font-size: 24px;
`

const StyledLmTitle = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 24px;
`

const StyledFarmTokensAndApyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledFarmText = styled.span`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 24px;
`

const StyledSectionLabel = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 16px;
`

export default Stake
