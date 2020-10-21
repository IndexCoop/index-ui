import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'utils/bignumber'
import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import Modal from 'components/CustomModal'
import TokenInput from 'components/TokenInput'

import { getFullDisplayBalance } from 'utils'
import useBalances from 'hooks/useBalances'

interface UnstakeModalProps extends ModalProps {
  onUnstake: (amount: string) => void
}

const UnstakeModal: React.FC<UnstakeModalProps> = ({
  isOpen,
  onDismiss,
  onUnstake,
}) => {
  const [val, setVal] = useState('')
  const { stakedUniswapEthDpiLpBalance: stakedBalance } = useBalances()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakedBalance || new BigNumber(0), 0)
  }, [stakedBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal]
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const handleUnstakeClick = useCallback(() => {
    onUnstake(val)
  }, [onUnstake, val])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text='Unstake' />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol='Uniswap ETH/DPI LP Tokens'
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text='Cancel' variant='secondary' />
        <Button
          disabled={!val || !Number(val)}
          onClick={handleUnstakeClick}
          text='Unstake'
          variant={!val || !Number(val) ? 'secondary' : 'default'}
        />
      </ModalActions>
    </Modal>
  )
}

export default UnstakeModal
