import React, { useCallback, useMemo, useState } from 'react'

import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  useTheme,
} from 'react-neu'
import Select from 'react-select'
import styled from 'styled-components'

import Modal from 'components/CustomModal'

interface StakeModalProps extends ModalProps {
  onStake: (nftId: string) => void
  availableNftIds: number[]
  depositedNftIds: number[]
}

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  availableNftIds,
  depositedNftIds,
  onDismiss,
  onStake,
}) => {
  const [currentId, setCurrentId] = useState<string>('Select Uniswap V3 NFT ID')
  availableNftIds = [123, 321, 123123, 123123123, 12312312123123]

  const [isShowingConfirmationScreen, setIsShowingConfirmationScreen] =
    useState(false)
  const [stakingNft, setStakingNft] = useState<number>(-1)

  const handleStakeClick = useCallback(() => {
    onStake(currentId)
  }, [onStake, currentId])
  const handleUnstakeClick = useCallback(() => {
    onStake(currentId)
  }, [onStake, currentId])

  const openStakingConfirmation = (nftId: number) => {
    //open the modal
    setStakingNft(nftId)
    setIsShowingConfirmationScreen(true)
  }
  const closeStakingConfirmation = () => {
    //open the modal
    setStakingNft(-1)
    setIsShowingConfirmationScreen(false)
  }

  const theme = useTheme()

  const CustomOption = (props: any) => {
    const { innerProps, label } = props
    return (
      <DropdownOption {...innerProps}>
        <StyledMonth onClick={() => setCurrentId(label)}>{label}</StyledMonth>
      </DropdownOption>
    )
  }

  const dropdownSelectStyles = useMemo(() => {
    return {
      control: (styles: any) => ({
        ...styles,
        background: 'none',
        border: 'none',
      }),
      singleValue: (styles: any) => ({
        ...styles,
        'font-weight': 600,
        'font-size': '24px',
        'color': theme.colors.white[500],
        'cursor': 'pointer',
        '&:hover': {
          color: theme.colors.grey[500],
        },
      }),
      menu: (styles: any) => ({
        ...styles,
        color: 'black',
      }),
      dropdownIndicator: (styles: any) => ({
        ...styles,
        'font-weight': 600,
        'font-size': '28px',
        'color': theme.colors.white[500],
        'cursor': 'pointer',
        '&:hover': {
          color: theme.colors.grey[500],
        },
      }),
      valueContainer: (styles: any) => ({
        ...styles,
        overflow: 'initial',
      }),
      indicatorSeparator: () => ({}),
      indicatorContainer: (styles: any) => ({
        ...styles,
        marginLeft: 0,
        padding: 0,
      }),
    }
  }, [theme])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text='Uniswap V3 Staking' />
      <ModalContent>
        {isShowingConfirmationScreen && (
          //stuff here
          <div>
            confirming stake {stakingNft}
            <Button
              onClick={closeStakingConfirmation}
              text='Cancel'
              variant='secondary'
            />
          </div>
        )}
        {!isShowingConfirmationScreen &&
          availableNftIds.map((nft) => (
            <Button
              onClick={() => openStakingConfirmation(nft)}
              text={nft?.toString()}
            />
          ))}
      </ModalContent>
      <ModalActions></ModalActions>
    </Modal>
  )
}

const DropdownOption = styled.div`
  margin: 10px;
`

const StyledMonth = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

export default StakeModal
