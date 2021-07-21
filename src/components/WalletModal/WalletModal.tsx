import React, { useCallback } from 'react'
import styled from 'styled-components'

import BigNumber from 'utils/bignumber'
import useWallet from 'hooks/useWallet'
import { toast } from 'react-toastify'
import bedBorderLogo from 'assets/bed-border.png'

import numeral from 'numeral'
import {
  Box,
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer,
} from 'react-neu'

import Modal from 'components/CustomModal'
import FancyValue from 'components/FancyValue'
import Split from 'components/Split'

import useBalances from 'hooks/useBalances'

import * as tokenAddresses from 'constants/ethContractAddresses'

const WalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { reset } = useWallet()
  const {
    indexBalance,
    dpiBalance,
    mviBalance,
    ethfliBalance,
    btcfliBalance,
    bedBalance,
    uniswapEthDpiLpBalance,
    uniswapEthMviLpBalance,
    stakedUniswapEthDpiLpBalance,
    stakedFarmTwoBalance,
    stakedUniswapEthMviLpBalance,
  } = useBalances()

  const totalStakedEthDpiLpBalance = (
    stakedUniswapEthDpiLpBalance || new BigNumber(0)
  ).plus(stakedFarmTwoBalance || 0)

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])

  const handleSignOut = useCallback(() => {
    reset()
    toast.success("You've successfully signed out.")
    onDismiss && onDismiss()
  }, [reset, onDismiss])

  const ethMviTokenIcon = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage
        alt='MVI Icon'
        src='https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg'
      />
    </StyledLpTokenWrapper>
  )

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
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <StyledModalBody>
        <ModalTitle text='My Wallet' />
        <ModalContent>
          <Split>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'Owl',
                  src: 'https://index-dao.s3.amazonaws.com/owl.png',
                }}
                link={`https://etherscan.io/address/${tokenAddresses.indexTokenAddress}`}
                label='INDEX balance'
                value={getDisplayBalance(indexBalance)}
              />
            </Box>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'Defi Pulse Icon',
                  src: 'https://set-core.s3.amazonaws.com/img/social_trader_set_icons/defi_pulse_index_set.svg',
                }}
                label='DPI balance'
                link={`https://etherscan.io/address/${tokenAddresses.dpiTokenAddress}`}
                value={getDisplayBalance(dpiBalance)}
              />
            </Box>
          </Split>
          <Spacer />
          <Separator />
          <Spacer />
          <Split>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'MVI Icon',
                  src: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
                }}
                label='Metaverse Index Balance'
                link={`https://etherscan.io/address/${tokenAddresses.mviTokenAddress}`}
                value={getDisplayBalance(mviBalance)}
              />
            </Box>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'BED Icon',
                  src: bedBorderLogo,
                }}
                label='BED Index Balance'
                link={`https://etherscan.io/address/${tokenAddresses.bedTokenAddress}`}
                value={getDisplayBalance(bedBalance)}
              />
            </Box>
          </Split>
          <Spacer />
          <Separator />
          <Spacer />

          <Split>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'ETH2x-FLI Icon',
                  src: 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
                }}
                label='ETH 2x FLI Balance'
                link={`https://etherscan.io/address/${tokenAddresses.eth2xfliTokenAddress}`}
                value={getDisplayBalance(ethfliBalance)}
              />
            </Box>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'BTC2x-FLI Icon',
                  src: 'https://set-core.s3.amazonaws.com/img/portfolios/fli_btc.svg',
                }}
                label='BTC 2x FLI Balance'
                link={`https://etherscan.io/address/${tokenAddresses.btc2xfliTokenAddress}`}
                value={getDisplayBalance(btcfliBalance)}
              />
            </Box>
          </Split>
          <Spacer />
          <Separator />
          <Spacer />

          <Split>
            <Box row>
              <FancyValue
                iconComponent={ethDpiTokenIcon}
                label='Uniswap ETH/DPI LP balance'
                link={`https://etherscan.io/address/${tokenAddresses.uniswapEthDpiLpTokenAddress}`}
                value={getDisplayBalance(uniswapEthDpiLpBalance)}
              />
            </Box>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'Staked Uniswap ETH/DPI LP Icon',
                  src: 'https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg',
                }}
                label='Staked Uniswap ETH/DPI LP'
                link={`https://etherscan.io/address/${tokenAddresses.farmTwoAddress}`}
                value={getDisplayBalance(totalStakedEthDpiLpBalance)}
              />
            </Box>
          </Split>
          <Spacer />
          <Separator />
          <Spacer />

          <Split>
            <Box row>
              <FancyValue
                iconComponent={ethMviTokenIcon}
                label='Uniswap ETH/MVI LP balance'
                link={`https://etherscan.io/address/${tokenAddresses.uniswapEthMviLpTokenAddress}`}
                value={getDisplayBalance(uniswapEthMviLpBalance)}
              />
            </Box>
            <Box row>
              <FancyValue
                icon={{
                  alt: 'Staked Uniswap ETH/MVI LP Icon',
                  src: 'https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg',
                }}
                label='Staked Uniswap ETH/MVI LP'
                link={`https://etherscan.io/address/${tokenAddresses.mviStakingRewardsAddress}`}
                value={getDisplayBalance(stakedUniswapEthMviLpBalance)}
              />
            </Box>
          </Split>
        </ModalContent>
        <Separator />
        <ModalActions>
          <Button onClick={onDismiss} text='Close' variant='secondary' />
          <Button onClick={handleSignOut} text='Sign Out' />
        </ModalActions>
      </StyledModalBody>
    </Modal>
  )
}

const StyledLpTokenImage = styled.img`
  height: 30px;
  margin-left: -10px;
`

const StyledLpTokenWrapper = styled.div``

const StyledModalBody = styled.div`
  @media (max-width: 600px) {
    height: 100vh;
    overflow-y: scroll;
  }
`

export default WalletModal
