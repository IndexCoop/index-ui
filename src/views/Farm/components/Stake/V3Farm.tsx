import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, CardContent, Spacer } from 'react-neu'
import styled from 'styled-components'
import Web3 from 'web3'

import Split from 'components/Split'
import V3StakeModal from './components/V3StakeModal'

import useMediaQuery from 'hooks/useMediaQuery'
import useV3Farming from 'hooks/useV3Farming'
import useWallet from 'hooks/useWallet'
import useTransactionWatcher from 'hooks/useTransactionWatcher'

import { DpiEthRewards, V3Farm } from 'constants/v3Farms'

const Stake: React.FC = () => {
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
      onWithdraw(nftId, DpiEthRewards)
    },
    [onWithdraw]
  )

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleClaimAccruedClick = useCallback(() => {
    onClaimAccrued('0x1720668a1826c6f30a11780783b0357269b7e1ca')
  }, [onClaimAccrued])

  useEffect(() => {
    // TODO: replace this with the reward token address (INDEX) on production deploy
    getAccruedRewardsAmount('0x1720668a1826c6f30a11780783b0357269b7e1ca').then(
      (amount) => {
        setAccruedRewards(
          parseFloat(Web3.utils.fromWei(amount?.toString() || '0')).toFixed(5)
        )
      }
    )
  }, [account, status, transactionStatus, getAccruedRewardsAmount])

  useEffect(() => {
    getAllPendingRewardsAmount(DpiEthRewards).then((amount) => {
      setAllPendingRewards(
        parseFloat(Web3.utils.fromWei(amount?.toString() || '0')).toFixed(5)
      )
    })
  }, [account, status, transactionStatus, getAllPendingRewardsAmount])

  useEffect(() => {
    getValidIds(DpiEthRewards).then((idList) => {
      setValidNfts(idList || [])
    })
  }, [account, status, transactionStatus, getValidIds])

  useEffect(() => {
    getAllDepositedTokens(DpiEthRewards).then((idList) => {
      setDepositedNfts(idList || [])
    })
  }, [account, status, transactionStatus, getAllDepositedTokens])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return <Button disabled full text='Stake' variant='secondary' />
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
    if (status !== 'connected' || accruedRewards === '0.00') {
      return <Button disabled full text='Claim Accrued' variant='secondary' />
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

  const ethDpiTokenIcon = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage
        alt='DPI Icon'
        src='https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg'
      />
    </StyledLpTokenWrapper>
  )

  return (
    <>
      <Card>
        <CardContent>
          <StyledCardTitleWrapper>
            {ethDpiTokenIcon}
            <Spacer size='md' />
            <StyledLmTitle>
              <StyledCardTitle>
                Uniswap V3 DPI-ETH Liquidity Program
              </StyledCardTitle>
              <Spacer size='sm' />
              <StyledCardSubtitle>
                Active August 20th - September 4th
              </StyledCardSubtitle>
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
        </StyledCardActions>
      </Card>
      <V3StakeModal
        isOpen={stakeModalIsOpen}
        availableNftIds={validNfts}
        depositedNftIds={depositedNfts}
        farm={DpiEthRewards}
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
