import React, { useCallback, useMemo, useState } from 'react'
import numeral from 'numeral'
import { Button, Card, CardActions, CardContent, Spacer } from 'react-neu'
import styled from 'styled-components'

import useBalances from 'hooks/useBalances'
import useFarming from 'hooks/useFarming'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'

import DpiStakeModal from './components/DpiStakeModal'
import Split from 'components/Split'

const Stake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)

  const {
    stakedUniswapEthDpiLpBalance: stakedBalance,
    unharvestedIndexBalance,
  } = useBalances()
  const { status } = useWallet()
  const { isApproved, isApproving, onApprove, onStake, onUnstakeAndHarvest } =
    useFarming()
  const { apy } = usePrices()

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
    const hasStaked = stakedBalance && stakedBalance.toNumber() > 0
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
      return numeral(stakedBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [stakedBalance])

  const formattedEarnedBalance = useMemo(() => {
    if (unharvestedIndexBalance) {
      return numeral(unharvestedIndexBalance.toString()).format('0.00000a')
    } else {
      return '--'
    }
  }, [unharvestedIndexBalance])

  return (
    <>
      <Card>
        <CardContent>
          <StyledCardTitleWrapper>
            <StyledHeaderIcon
              alt='expiring icon'
              src='https://index-dao.s3.amazonaws.com/down-arrow.svg'
            />
            <Spacer size='md' />
            <StyledLmTitle>
              <StyledCardTitle>Expired Liquidity Program</StyledCardTitle>
              <Spacer size='sm' />
              <StyledCardSubtitle>
                Active Oct. 7th - Dec. 6th
              </StyledCardSubtitle>
            </StyledLmTitle>
          </StyledCardTitleWrapper>
          <Spacer />

          <StyledFarmTokensAndApyWrapper>
            <Split>
              <div>
                <StyledFarmText>
                  {formattedStakedBalance}
                  <StyledTokenIcon
                    alt='eth dpi icon'
                    src='https://index-dao.s3.amazonaws.com/eth-dpi.svg'
                  />
                </StyledFarmText>
                <StyledSectionLabel>
                  Staked ETH/DPI Uniswap LP Tokens
                </StyledSectionLabel>
              </div>

              <div>
                <StyledFarmText>0.00% APR</StyledFarmText>
                <StyledSectionLabel>(Volatile)</StyledSectionLabel>
              </div>

              <div>
                <StyledFarmText>
                  {formattedEarnedBalance}
                  <StyledTokenIcon
                    alt='owl icon'
                    src='https://index-dao.s3.amazonaws.com/owl.png'
                  />
                </StyledFarmText>
                <StyledSectionLabel>Unclaimed INDEX in pool</StyledSectionLabel>
              </div>
            </Split>
          </StyledFarmTokensAndApyWrapper>
        </CardContent>
        <CardActions>{UnstakeButton}</CardActions>
      </Card>
      <DpiStakeModal
        isOpen={stakeModalIsOpen}
        nftIds={[]}
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
