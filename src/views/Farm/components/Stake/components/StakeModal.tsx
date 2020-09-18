import React, { useCallback, useMemo, useState } from 'react'

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import TokenInput from 'components/TokenInput'
import useBalances from 'hooks/useBalances'
import { getFullDisplayBalance } from 'utils'
import BigNumber from 'bignumber.js'

const StakeModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {

  const [val, setVal] = useState('')
  const { yycrvUniLpBalance } = useBalances()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(yycrvUniLpBalance || new BigNumber(0))
  }, [yycrvUniLpBalance])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Plant" />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol="YYCRV_UNI_LP"
        />
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button
          disabled={!val}
          text="Stake"
          variant={!val ? 'secondary' : 'default'}
        />
      </ModalActions>
    </Modal>
  )
}

export default StakeModal