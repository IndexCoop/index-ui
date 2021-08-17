import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, CardContent, Spacer } from 'react-neu'
import styled from 'styled-components'
import Web3 from 'web3'

import useMediaQuery from 'hooks/useMediaQuery'
import useV3Farming from 'hooks/useV3Farming'
import useWallet from 'hooks/useWallet'
import useTransactionWatcher from 'hooks/useTransactionWatcher'

import DpiStakeModal from './components/DpiStakeModal'
import DpiUnstakeModal from './components/DpiUnstakeModal'
import Split from 'components/Split'

const Stake: React.FC = () => {
  const { isMobile } = useMediaQuery()
  const { status, account } = useWallet()
  const {
    onDeposit,
    onWithdraw,
    onClaimAccrued,
    getAllDepositedTokens,
    getAccruedRewardsAmount,
    getPendingRewardsAmount,
    getValidIds,
  } = useV3Farming()

  const { transactionStatus } = useTransactionWatcher()

  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)
  const [accruedRewards, setAccruedRewards] = useState('0')
  const [pendingRewards, setPendingRewards] = useState('0')
  const [validNfts, setValidNfts] = useState<number[]>([])
  const [depositedNfts, setDepositedNfts] = useState<number[]>([])

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleDismissUnstakeModal = useCallback(() => {
    setUnstakeModalIsOpen(false)
  }, [setUnstakeModalIsOpen])

  const handleOnStake = useCallback(
    (nftId: string) => {
      onDeposit(parseInt(nftId), 'DPI-ETH')
      handleDismissStakeModal()
    },
    [handleDismissStakeModal, onDeposit]
  )

  const handleOnUnstake = useCallback(
    (nftId: string) => {
      onWithdraw(parseInt(nftId), 'DPI-ETH')
      handleDismissUnstakeModal()
    },
    [handleDismissUnstakeModal, onWithdraw]
  )

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleUnstakeClick = useCallback(() => {
    setUnstakeModalIsOpen(true)
  }, [setUnstakeModalIsOpen])

  const handleClaimAccruedClick = useCallback(() => {
    onClaimAccrued('0x1720668a1826c6f30a11780783b0357269b7e1ca')
  }, [onClaimAccrued])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Stake' variant='secondary' />
    }
    return <Button full onClick={handleStakeClick} text='Stake' />
  }, [status, handleStakeClick])

  const UnstakeButton = useMemo(() => {
    const hasStaked = depositedNfts.length !== 0
    if (status !== 'connected' || !hasStaked) {
      return <Button disabled full text='Unstake' variant='secondary' />
    }

    return <Button full onClick={handleUnstakeClick} text='Unstake' />
  }, [depositedNfts, status, handleUnstakeClick])

  const ClaimAccruedButton = useMemo(() => {
    if (status !== 'connected' || accruedRewards === '0.00') {
      return <Button disabled full text='Claim Accrued' variant='secondary' />
    }
    return (
      <Button full onClick={handleClaimAccruedClick} text='Claim Accrued' />
    )
  }, [status, handleClaimAccruedClick, accruedRewards])

  useEffect(() => {
    getAccruedRewardsAmount('0x1720668a1826c6f30a11780783b0357269b7e1ca').then(
      (amount) => {
        setAccruedRewards(
          parseFloat(Web3.utils.fromWei(amount?.toString() || '0')).toFixed(2)
        )
      }
    )
  }, [account, status, transactionStatus])

  useEffect(() => {
    getPendingRewardsAmount('DPI-ETH').then((amount) => {
      setPendingRewards(
        parseFloat(Web3.utils.fromWei(amount?.toString() || '0')).toFixed(2)
      )
    })
  }, [account, status, transactionStatus])

  useEffect(() => {
    getValidIds('DPI-ETH').then((idList) => {
      setValidNfts(idList || [])
    })
  }, [account, status, transactionStatus])

  useEffect(() => {
    getAllDepositedTokens('DPI-ETH').then((idList) => {
      setDepositedNfts(idList || [])
    })
  }, [account, status, transactionStatus])

  return (
    <>
      <Card>
        <CardContent>
          <StyledCardTitleWrapper>
            <StyledHeaderIcon
              src='https://index-dao.s3.amazonaws.com/defi_pulse_index_set.svg'
              alt='DefiPulse Index Logo'
            />
            <Spacer size='md' />
            <StyledLmTitle>
              <StyledCardTitle>DPI Liquidity Program</StyledCardTitle>
              <Spacer size='sm' />
              <StyledCardSubtitle>
                Active July 13th - August 12th
              </StyledCardSubtitle>
            </StyledLmTitle>
          </StyledCardTitleWrapper>
          <Spacer />

          <StyledFarmTokensAndApyWrapper>
            <Split>
              <div>
                <StyledFarmText>
                  {depositedNfts.length}
                  <StyledTokenIcon
                    alt='eth dpi icon'
                    src='https://index-dao.s3.amazonaws.com/eth-dpi.svg'
                  />
                </StyledFarmText>
                <StyledSectionLabel>
                  Staked ETH/DPI Uniswap V3 NFTs
                </StyledSectionLabel>
              </div>
              <div>
                <StyledFarmText>
                  {pendingRewards}
                  <StyledTokenIcon
                    alt='owl icon'
                    src='https://index-dao.s3.amazonaws.com/owl.png'
                  />
                </StyledFarmText>
                <StyledSectionLabel>Pending Rewards</StyledSectionLabel>
              </div>

              <div>
                <StyledFarmText>
                  {accruedRewards}
                  <StyledTokenIcon
                    alt='owl icon'
                    src='https://index-dao.s3.amazonaws.com/owl.png'
                  />
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
          <Spacer />
          {UnstakeButton}
        </StyledCardActions>
      </Card>
      <DpiStakeModal
        isOpen={stakeModalIsOpen}
        nftIds={validNfts}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
      />
      <DpiUnstakeModal
        isOpen={unstakeModalIsOpen}
        nftIds={depositedNfts}
        onDismiss={handleDismissUnstakeModal}
        onUnstake={handleOnUnstake}
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

interface StyledCardActionProps {
  isMobile: boolean
}

const StyledCardActions = styled.div<StyledCardActionProps>`
  display: flex;
  flex-wrap: ${(props) => (props.isMobile ? 'wrap' : 'no-wrap')};
  padding: 30px;
  padding-top: 0px;
`

export default Stake
