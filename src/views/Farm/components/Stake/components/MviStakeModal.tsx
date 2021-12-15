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
import useBalances from 'hooks/useBalances'
import { fromWei, getFullDisplayBalance } from 'utils'
import BigNumber from 'utils/bignumber'

interface MviStakeModalProps extends ModalProps {
  onStake: (amount: string) => void
}

const MviStakeModal: React.FC<MviStakeModalProps> = ({
  isOpen,
  onDismiss,
  onStake,
}) => {
  const [val, setVal] = useState('')
  const { uniswapEthMviLpBalance } = useBalances()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(fromWei(uniswapEthMviLpBalance), 0)
  }, [uniswapEthMviLpBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal]
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const handleStakeClick = useCallback(() => {
    onStake(val)
  }, [onStake, val])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text='Stake' />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol='Uniswap ETH/MVI LP Tokens'
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

export default MviStakeModal
