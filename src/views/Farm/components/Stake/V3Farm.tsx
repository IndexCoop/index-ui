import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Button, Card, CardContent, Spacer } from 'react-neu'

import styled from 'styled-components'
import Web3 from 'web3'

import indexToken from 'assets/index-token.png'
import Split from 'components/Split'
import { indexTokenAddress } from 'constants/ethContractAddresses'
import { V3Farm } from 'constants/v3Farms'
import useMediaQuery from 'hooks/useMediaQuery'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useV3Farming from 'hooks/useV3Farming'
import useWallet from 'hooks/useWallet'

import V3StakeModal from './components/V3StakeModal'

const Stake = (props: { farm: V3Farm }) => {
  const { isMobile } = useMediaQuery()
  const { status, account, ethereum } = useWallet()
  const {
    onDeposit,
    onWithdraw,
    onClaimAccrued,
    getAllDepositedTokens,
    getAccruedRewardsAmount,
    getAllPendingRewardsAmount,
    getValidIds,
  } = useV3Farming()

  const { transactionStatus } = useTransactionWatcher()

  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [accruedRewards, setAccruedRewards] = useState('0')
  const [allPendingRewards, setAllPendingRewards] = useState('0')
  const [validNfts, setValidNfts] = useState<number[]>([])
  const [depositedNfts, setDepositedNfts] = useState<number[]>([])

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleOnStake = useCallback(
    (nftId: number, farm: V3Farm) => {
      onDeposit(nftId, farm)
      handleDismissStakeModal()
    },
    [handleDismissStakeModal, onDeposit]
  )

  const handleOnUnstake = useCallback(
    (nftId: number) => {
      onWithdraw(nftId, props.farm)
    },
    [onWithdraw, props.farm]
  )

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleClaimAccruedClick = useCallback(() => {
    if (!indexTokenAddress) return

    onClaimAccrued(indexTokenAddress)
  }, [onClaimAccrued])

  useEffect(() => {
    if (!indexTokenAddress) return

    getAccruedRewardsAmount(indexTokenAddress).then((amount) => {
      setAccruedRewards(
        parseFloat(Web3.utils.fromWei(amount?.toString() || '0')).toFixed(5)
      )
    })
  }, [account, status, transactionStatus, getAccruedRewardsAmount])

  useEffect(() => {
    getAllPendingRewardsAmount(props.farm).then((amount) => {
      setAllPendingRewards(
        parseFloat(Web3.utils.fromWei(amount?.toString() || '0')).toFixed(5)
      )
    })
  }, [
    account,
    status,
    transactionStatus,
    getAllPendingRewardsAmount,
    props.farm,
  ])

  useEffect(() => {
    getValidIds(props.farm).then((idList) => {
      setValidNfts(idList || [])
    })
  }, [account, status, transactionStatus, getValidIds, props.farm])

  useEffect(() => {
    getAllDepositedTokens(props.farm).then((idList) => {
      setDepositedNfts(idList || [])
    })
  }, [account, status, transactionStatus, getAllDepositedTokens, props.farm])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text='Stake & Unstake LP Tokens'
          variant='secondary'
        />
      )
    }
    return (
      <Button
        full
        onClick={handleStakeClick}
        text='Stake & Unstake LP Tokens'
      />
    )
  }, [status, handleStakeClick])

  const ClaimAccruedButton = useMemo(() => {
    if (status !== 'connected' || accruedRewards === '0.00000') {
      return (
        <Button
          disabled
          full
          text='Claim Accrued Rewards'
          variant='secondary'
        />
      )
    }

    return (
      <Button
        full
        onClick={handleClaimAccruedClick}
        text='Claim Accrued Rewards'
        variant='secondary'
      />
    )
  }, [status, handleClaimAccruedClick, accruedRewards])

  const lpTokenIcons = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage alt={props.farm.img.alt} src={props.farm.img.src} />
    </StyledLpTokenWrapper>
  )

  const activeFarmDates = () => {
    const latestFarmIndex = props.farm.farms.length - 1
    return 'Active ' + props.farm.farms[latestFarmIndex].dateText
  }

  return (
    <>
      <Card>
        <CardContent>
          <StyledCardTitleWrapper>
            {lpTokenIcons}
            <Spacer size='md' />
            <StyledLmTitle>
              <StyledCardTitle>
                Uniswap V3 {props.farm.poolLabel} Liquidity Program
              </StyledCardTitle>
              <Spacer size='sm' />
              <StyledCardSubtitle>{activeFarmDates()}</StyledCardSubtitle>
            </StyledLmTitle>
          </StyledCardTitleWrapper>
          <Spacer />

          <StyledFarmTokensAndApyWrapper>
            <Split>
              <div>
                <StyledFarmText>{depositedNfts.length}</StyledFarmText>
                <StyledSectionLabel>Staked Uniswap V3 NFTs</StyledSectionLabel>
              </div>
              <div>
                <StyledFarmText>
                  {allPendingRewards}
                  <StyledTokenIcon src={indexToken} alt='Index token' />
                </StyledFarmText>
                <StyledSectionLabel>Pending Rewards</StyledSectionLabel>
              </div>

              <div>
                <StyledFarmText>
                  {accruedRewards}
                  <StyledTokenIcon src={indexToken} alt='Index token' />
                </StyledFarmText>
                <StyledSectionLabel>Accrued Rewards</StyledSectionLabel>
              </div>
            </Split>
          </StyledFarmTokensAndApyWrapper>
        </CardContent>
        <StyledCardActions isMobile={isMobile}>
          {StakeButton}
          <Spacer />
          {ClaimAccruedButton}
        </StyledCardActions>
      </Card>
      <V3StakeModal
        isOpen={stakeModalIsOpen}
        availableNftIds={validNfts}
        depositedNftIds={depositedNfts}
        farm={props.farm}
        provider={ethereum}
        accruedRewards={accruedRewards}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
        onUnstake={handleOnUnstake}
      />
    </>
  )
}

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

interface StyledCardActionProps {
  isMobile: boolean
}

const StyledCardActions = styled.div<StyledCardActionProps>`
  display: flex;
  flex-wrap: ${(props) => (props.isMobile ? 'wrap' : 'no-wrap')};
  padding: 30px;
  padding-top: 0px;
`

const StyledLpTokenWrapper = styled.div`
  margin-left: 10px;
`

const StyledLpTokenImage = styled.img`
  height: 50px;
  margin-left: -10px;
`

export default Stake
