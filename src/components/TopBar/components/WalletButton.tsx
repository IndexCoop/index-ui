import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { Button } from 'react-neu'
import useWallet from 'hooks/useWallet'

import UnlockWalletModal from 'components/UnlockWalletModal'
import WalletModal from 'components/WalletModal'

interface WalletButtonProps {}

const WalletButton: React.FC<WalletButtonProps> = (props) => {
  const {
    account,
    isShowingWalletModal,
    onCloseWalletModal,
    onOpenWalletModal,
  } = useWallet()

  return (
    <>
      <StyledWalletButton>
        {!account ? (
          <Button onClick={onOpenWalletModal} size='sm' text='Unlock Wallet' />
        ) : (
          <Button
            onClick={onOpenWalletModal}
            size='sm'
            text='View Balances'
            variant='tertiary'
          />
        )}
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
