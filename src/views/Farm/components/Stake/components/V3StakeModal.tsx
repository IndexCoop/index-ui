import React, { useCallback, useEffect, useMemo, useState } from 'react'

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
import { FarmPlot, V3Farm } from 'constants/v3Farms'
import { getMostRecentFarmNumber } from 'index-sdk/uniV3Farm'
import NftFarmPlot from './NftFarmPlot'

interface StakeModalProps extends ModalProps {
  onStake: (nftId: string, farm: V3Farm) => void
  onUnstake: (nftId: string) => void
  availableNftIds: number[]
  depositedNftIds: number[]
  farm: V3Farm
}

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  availableNftIds,
  depositedNftIds,
  farm,
  onDismiss,
  onStake,
  onUnstake,
}) => {
  const [currentId, setCurrentId] = useState<string>('Select Uniswap V3 NFT ID')
  const [activeFarmPlot, setActiveFarmPlot] = useState<FarmPlot>()
  availableNftIds = [123, 321, 123123, 123123123, 12312312123123]
  depositedNftIds = [11111, 22222, 33333, 44444, 55555]

  const [
    isShowingStakingConfirmationScreen,
    setIsShowingStakingConfirmationScreen,
  ] = useState(false)
  const [
    isShowingUnstakingConfirmationScreen,
    setIsShowingUnstakingConfirmationScreen,
  ] = useState(false)
  const [selectedNft, setSelectedNft] = useState<number>(-1)

  const handleStakeClick = useCallback(() => {
    onStake(currentId, farm)
    closeStakingConfirmation()
  }, [onStake, currentId, farm])

  const handleUnstakeClick = useCallback(() => {
    onUnstake(currentId)
    closeUnstakingConfirmation()
  }, [onUnstake, currentId])

  const handleClaimRewards = useCallback(() => {
    // TODO perform rewards claim here
  }, [])

  const openStakingConfirmation = (nftId: number) => {
    setSelectedNft(nftId)
    setIsShowingStakingConfirmationScreen(true)
  }
  const closeStakingConfirmation = () => {
    setSelectedNft(-1)
    setIsShowingUnstakingConfirmationScreen(false)
  }

  const openUnstakingConfirmation = (nftId: number) => {
    setSelectedNft(nftId)
    setIsShowingUnstakingConfirmationScreen(true)
  }
  const closeUnstakingConfirmation = () => {
    setSelectedNft(-1)
    setIsShowingUnstakingConfirmationScreen(false)
  }

  useEffect(() => {
    setActiveFarmPlot(farm.farms[getMostRecentFarmNumber(farm)])
  }, [farm])

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
        {isShowingStakingConfirmationScreen && (
          <div>
            {selectedNft}
            <p>some copy here lorem ipsum idk bro whatever</p>
            <h3>Available Farm</h3>
            <NftFarmPlot farmName={farm.farmName} farmPlot={activeFarmPlot} />

            <Button onClick={handleStakeClick} text='Deposit & Stake' />
          </div>
        )}
        {isShowingUnstakingConfirmationScreen && (
          <div>
            {selectedNft}
            <p>some copy here lorem ipsum idk bro whatever</p>
            <h3>Available Farm</h3>
            <NftFarmPlot farmName={farm.farmName} farmPlot={activeFarmPlot} />

            <Button onClick={handleStakeClick} text='Deposit & Stake' />
          </div>
        )}
        {!isShowingStakingConfirmationScreen &&
          !isShowingUnstakingConfirmationScreen && (
            <div>
              {availableNftIds.length > 0 && (
                <div>
                  <h3>Unstaked {farm.farmName} LP NFTs</h3>
                  {availableNftIds.map((nft) => (
                    <div onClick={() => openStakingConfirmation(nft)}>
                      {nft?.toString()}
                    </div>
                  ))}
                </div>
              )}
              {depositedNftIds.length > 0 && (
                <div>
                  <h3>Staked {farm.farmName} LP NFTs</h3>
                  {depositedNftIds.map((nft) => (
                    <div onClick={() => openUnstakingConfirmation(nft)}>
                      {nft?.toString()}
                    </div>
                  ))}
                </div>
              )}
              <div>Claimable Rewards</div>
              <div>{/** TODO add claimable rewards amt here */} INDEX</div>
            </div>
          )}
      </ModalContent>
      <ModalActions>
        <Button onClick={handleClaimRewards} text='Claim Rewards' />
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
