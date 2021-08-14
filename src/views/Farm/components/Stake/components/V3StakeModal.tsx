import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'
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
  const [currentId, setCurrentId] = useState<string | undefined>(undefined)
  const [activeFarmPlot, setActiveFarmPlot] = useState<FarmPlot>()

  const [isShowingStakingDetailScreen, setIsShowingStakingDetailScreen] =
    useState(false)
  const [isShowingUnstakingDetailScreen, setIsShowingUnstakingDetailScreen] =
    useState(false)
  const [selectedNft, setSelectedNft] = useState<number>(-1)

  const handleStakeClick = useCallback(() => {
    if (!currentId) return

    onStake(currentId, farm)
    closeStakingDetail()
  }, [onStake, currentId, farm])

  const handleUnstakeClick = useCallback(() => {
    if (!currentId) return

    onUnstake(currentId)
    closeUnstakingDetail()
  }, [onUnstake, currentId])

  const handleClaimRewards = useCallback(() => {
    // TODO perform rewards claim here
  }, [])

  const openStakingDetail = (nftId: number) => {
    setSelectedNft(nftId)
    setIsShowingStakingDetailScreen(true)
  }
  const closeStakingDetail = () => {
    setSelectedNft(-1)
    setIsShowingUnstakingDetailScreen(false)
  }

  const openUnstakingDetail = (nftId: number) => {
    setSelectedNft(nftId)
    setIsShowingUnstakingDetailScreen(true)
  }
  const closeUnstakingDetail = () => {
    setSelectedNft(-1)
    setIsShowingUnstakingDetailScreen(false)
  }

  useEffect(() => {
    setActiveFarmPlot(farm.farms[getMostRecentFarmNumber(farm)])
  }, [farm])

  if (isShowingStakingDetailScreen) {
    return (
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        <ModalTitle text='Uniswap V3 DPI-ETH Staking' />
        <ModalContent>
          <div>
            {/* TODO: add DPI/ETH Icon */}
            {selectedNft}
            <p>
              This token is currently unstaked and undeposited in any active LM
              farms. In order to earn Uniswap V3 LM rewards you must deposit
              this NFT to the Uniswap V3 Staking contract, and stake it in the
              following farms:
            </p>
            <h3>Available Farm</h3>
            <NftFarmPlot farmName={farm.farmName} farmPlot={activeFarmPlot} />
          </div>
        </ModalContent>
        <ModalActions>
          <Button onClick={handleStakeClick} text='Deposit & Stake' />
        </ModalActions>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalTitle text='Uniswap V3 DPI-ETH Staking' />
      <ModalContent>
        <div>
          {availableNftIds.length > 0 && (
            <div>
              <h3>Unstaked {farm.farmName} LP NFTs</h3>
              {availableNftIds.map((nft) => (
                <div onClick={() => openStakingDetail(nft)}>
                  {nft?.toString()}
                </div>
              ))}
            </div>
          )}
          {depositedNftIds.length > 0 && (
            <div>
              <h3>Staked {farm.farmName} LP NFTs</h3>
              {depositedNftIds.map((nft) => (
                <div onClick={() => openUnstakingDetail(nft)}>
                  {nft?.toString()}
                </div>
              ))}
            </div>
          )}
          <div>Claimable Rewards</div>
          <div>{/** TODO add claimable rewards amt here */} INDEX</div>
        </div>
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

export default StakeModal
