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

interface UnstakeModalProps extends ModalProps {
  onUnstake: (nftId: string) => void
  nftIds: number[]
}

const StakeModal: React.FC<UnstakeModalProps> = ({
  isOpen,
  nftIds,
  onDismiss,
  onUnstake,
}) => {
  const [currentId, setCurrentId] = useState<string>(
    'Select Uniswap V3 NFT ID to Withdraw'
  )

  const handleStakeClick = useCallback(() => {
    onUnstake(currentId)
  }, [onUnstake, currentId])

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
      <ModalTitle text='Unstake' />
      <ModalContent>
        <Select
          isSearchable={false}
          value={{ label: currentId } as any}
          styles={dropdownSelectStyles}
          options={nftIds.map((id) => {
            return { label: id }
          })}
          components={{
            Option: CustomOption,
          }}
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text='Cancel' variant='secondary' />
        <Button
          disabled={!currentId || !Number(currentId)}
          onClick={handleStakeClick}
          text='Unstake'
          variant={!currentId || !Number(currentId) ? 'secondary' : 'default'}
        />
      </ModalActions>
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
