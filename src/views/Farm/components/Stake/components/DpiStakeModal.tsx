import React, { useCallback, useMemo, useState } from 'react'

import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import Modal from 'components/CustomModal'
import TokenInput from 'components/TokenInput'

interface StakeModalProps extends ModalProps {
  onStake: (nftId: string) => void
}

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  onDismiss,
  onStake,
}) => {
  const [val, setVal] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal]
  )

  const handleStakeClick = useCallback(() => {
    onStake(val)
  }, [onStake, val])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text='Stake' />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={() => {}}
          onChange={handleChange}
          max={0}
          symbol='Uniswap ETH/DPI LP Tokens'
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text='Cancel' variant='secondary' />
        <Button
          disabled={!val || !Number(val)}
          onClick={handleStakeClick}
          text='Stake'
          variant={!val || !Number(val) ? 'secondary' : 'default'}
        />
      </ModalActions>
    </Modal>
  )
}

export default StakeModal
