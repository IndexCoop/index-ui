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
import {
  getExpiredFarmsInUse,
  getMostRecentFarmNumber,
} from 'index-sdk/uniV3Farm'
import NftFarmPlot from './NftFarmPlot'
import useV3Farming from 'hooks/useV3Farming'
import Web3 from 'web3'

interface StakeModalProps extends ModalProps {
  onStake: (nftId: number, farm: V3Farm) => void
  onUnstake: (nftId: number) => void
  availableNftIds: number[]
  depositedNftIds: number[]
  farm: V3Farm
  accruedRewards: string
  provider: any
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
  const [selectedNftId, setSelectedNftId] =
    useState<number | undefined>(undefined)
  const [activeFarmPlot, setActiveFarmPlot] = useState<FarmPlot>()
  const [expiredFarmPlots, setExpiredFarmPlots] = useState<FarmPlot[]>()

  const [pendingRewardsForSelectedNft, setPendingRewardsForSelectedNft] =
    useState<number>(0)
  const [isShowingStakingDetailScreen, setIsShowingStakingDetailScreen] =
    useState(false)
  const [isShowingUnstakingDetailScreen, setIsShowingUnstakingDetailScreen] =
    useState(false)

  const { getIndividualPendingRewardsAmount } = useV3Farming()

  const fetchPendingRewardsForSelectedNft = useCallback(async () => {
    if (!selectedNftId) {
      setPendingRewardsForSelectedNft(0)
      return
    }

    const pendingRewards = await getIndividualPendingRewardsAmount(
      farm,
      selectedNftId
    )

    const normalizedRewards = Web3.utils.fromWei(pendingRewards.toString())

    setPendingRewardsForSelectedNft(Number(normalizedRewards))
  }, [selectedNftId, getIndividualPendingRewardsAmount])

  useEffect(() => {
    fetchPendingRewardsForSelectedNft()
  }, [
    selectedNftId,
    fetchPendingRewardsForSelectedNft,
    getIndividualPendingRewardsAmount,
  ])

  const handleStakeClick = useCallback(() => {
    if (!selectedNftId) return

    onStake(selectedNftId, farm)
    closeStakingDetail()
  }, [onStake, selectedNftId, farm])

  const handleUnstakeClick = useCallback(() => {
    if (!selectedNftId) return

    onUnstake(selectedNftId)
    closeUnstakingDetail()
  }, [onUnstake, selectedNftId])

  const openStakingDetail = async (nftId: number) => {
    setSelectedNftId(nftId)
    setIsShowingStakingDetailScreen(true)
  }
  const closeStakingDetail = () => {
    setSelectedNftId(undefined)
    setIsShowingStakingDetailScreen(false)
  }

  const openUnstakingDetail = async (nftId: number) => {
    setSelectedNftId(nftId)
    setIsShowingUnstakingDetailScreen(true)
    /* TODO: this is broken -> setExpiredFarmPlots(
      await getExpiredFarmsInUse(farm, selectedNftId || -1, provider)
    )*/
  }
  const closeUnstakingDetail = () => {
    setSelectedNftId(undefined)
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
            {selectedNftId}
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
          <Button
            onClick={closeStakingDetail}
            variant='secondary'
            text='Cancel'
          />
          <Button onClick={handleStakeClick} text='Deposit & Stake' />
        </ModalActions>
      </Modal>
    )
  }

  if (isShowingUnstakingDetailScreen) {
    return (
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        <ModalTitle text='Uniswap V3 DPI-ETH Staking' />
        <ModalContent>
          <div>
            {/* TODO: add DPI/ETH Icon */}
            {selectedNftId}
            <p>
              This token is currently deposited in the Uniswap V3 staking
              contract. The active farms below are farms currently accruing you
              rewards:
            </p>

            <h3>Expired Farms</h3>
            {/* TODO: this needs to be a list of expired farmplots from expiredFarmPlots */}
            {expiredFarmPlots &&
              expiredFarmPlots.length > 0 &&
              expiredFarmPlots.map((expiredPlot) => (
                <NftFarmPlot farmName={farm.farmName} farmPlot={expiredPlot} />
              ))}
            <h3>Active Farms</h3>
            <NftFarmPlot farmName={farm.farmName} farmPlot={activeFarmPlot} />

            <h3>Active Farms</h3>
            <p>Pending Rewards: {pendingRewardsForSelectedNft} INDEX</p>
          </div>
        </ModalContent>
        <ModalActions>
          <Button
            onClick={closeUnstakingDetail}
            variant='secondary'
            text='Cancel'
          />
          <Button onClick={handleUnstakeClick} text='Unstake' />
        </ModalActions>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalContent>
        <div>
          <h1>Uniswap V3 DPI-ETH Staking</h1>

          <p>
            Uniswap V3 uses NFT tokens to represent LP positions. Your Uniswap
            V3 LP tokens eligible eligible for Index Coop rewards are listed
            below.
          </p>
          {availableNftIds.length > 0 && (
            <div>
              <h3>Your Unstaked {farm.farmName} LP NFTs</h3>
              <StyledList>
                {availableNftIds.map((nft) => (
                  <StyledNftItem
                    key={nft.toString()}
                    onClick={() => openStakingDetail(nft)}
                  >
                    {nft?.toString()}
                  </StyledNftItem>
                ))}
              </StyledList>
            </div>
          )}
          {depositedNftIds.length > 0 && (
            <div>
              <h3>Your Staked {farm.farmName} LP NFTs</h3>
              <StyledList>
                {depositedNftIds.map((nft) => (
                  <StyledNftItem
                    key={nft.toString()}
                    onClick={() => openUnstakingDetail(nft)}
                  >
                    <StyledNftColor />
                    {nft?.toString()}
                  </StyledNftItem>
                ))}
              </StyledList>
            </div>
          )}
        </div>
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} variant='secondary' text='Close' />
      </ModalActions>
    </Modal>
  )
}

const StyledNftColor = styled.div`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  background-color: blue;
`

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  padding: 15px;
`

const StyledNftItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 2px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.grey[400]};
  &:hover {
    color: white;
`

export default StakeModal
