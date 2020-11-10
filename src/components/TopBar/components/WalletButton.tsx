import React from 'react'
import styled from 'styled-components'

import { Button } from 'react-neu'
import useWallet from 'hooks/useWallet'

import UnlockWalletModal from 'components/UnlockWalletModal'
import WalletModal from 'components/WalletModal'

const WalletButton: React.FC = () => {
  const {
    account,
    isShowingWalletModal,
    onCloseWalletModal,
    onOpenWalletModal,
  } = useWallet()

  const openWalletText = !!account ? 'View Balances' : 'Unlock Wallet'
  const variant = !!account ? 'tertiary' : 'default'

  return (
    <>
      <StyledWalletButton>
        <Button
          onClick={onOpenWalletModal}
          size='sm'
          text={openWalletText}
          variant={variant}
        />
      </StyledWalletButton>
      <WalletModal
        isOpen={!!account && isShowingWalletModal}
        onDismiss={onCloseWalletModal}
      />
      <UnlockWalletModal
        isOpen={!account && isShowingWalletModal}
        onDismiss={onCloseWalletModal}
      />
    </>
  )
}

const StyledWalletButton = styled.div``

export default WalletButton
