import React, { useCallback } from 'react'

import { Button } from 'react-neu'

import styled from 'styled-components'

import { shortenAddress, useLookupAddress } from '@usedapp/core'

import UnlockWalletModal from 'components/UnlockWalletModal'
import WalletModal from 'components/WalletModal'
import useWallet from 'hooks/useWallet'

const WalletButton: React.FC = () => {
  const {
    account,
    isShowingWalletModal,
    onCloseWalletModal,
    onOpenWalletModal,
    status,
    connect,
  } = useWallet()
  const ens = useLookupAddress()

  const onClick = useCallback(() => {
    // If the user comes from the onto app it should directly connect without opening the web3 modal
    if (status !== 'connected' && (window as any).ethereum?.isONTO) {
      connect('injected')
    } else {
      onOpenWalletModal()
    }
  }, [status, connect, onOpenWalletModal])

  const openWalletText = getOpenWalletText(account, ens)
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

function getOpenWalletText(
  account: string | null | undefined,
  ens: string | null | undefined
) {
  if (account && ens) {
    return ens
  } else if (account) {
    return shortenAddress(account)
  } else {
    return 'Connect Wallet'
  }
}

const StyledWalletButton = styled.div``

export default WalletButton
