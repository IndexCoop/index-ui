import React, { useCallback } from 'react'
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
    status,
    connect,
  } = useWallet()

  const onClick = useCallback(() => {
    // If the user comes from the onto app it should directly connect without opening the web3 modal
    if (status != 'connected' && (window as any).ethereum?.isONTO) {
      connect('injected')
    } else {
      onOpenWalletModal()
    }
  }, [status, connect])

  const openWalletText = !!account ? 'View Balances' : 'Unlock Wallet'
  const variant = !!account ? 'tertiary' : 'default'

  return (
    <>
      <StyledWalletButton>
        <Button
          onClick={onClick}
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
