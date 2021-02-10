import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { RoundedButton } from 'components/RoundedButton'
import TransakModal from 'components/TransakModal'

/**
 * TransakBuySellButton - Displays a button used to open a modal displaying information about Transak order flow.
 */
const TransakBuySellButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [isModalOpen, setIsModalOpen])

  const onDismissModal = useCallback(() => {
    setIsModalOpen(false)
  }, [isModalOpen, setIsModalOpen])

  return (
    <StyledButtonWrapper>
      <p>- or -</p>
      <RoundedButton
        isDisabled={false}
        isPending={false}
        text='Buy with Cash'
        onClick={onOpenModal}
      />
      <TransakModal isOpen={isModalOpen} onDismiss={onDismissModal} />
    </StyledButtonWrapper>
  )
}

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`

export default TransakBuySellButton
