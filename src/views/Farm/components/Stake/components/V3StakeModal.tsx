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

interface StakeModalProps extends ModalProps {
  onStake: (nftId: number, farm: V3Farm) => void
  onUnstake: (nftId: number) => void
  availableNftIds: number[]
  depositedNftIds: number[]
  farm: V3Farm
  provider: any
}

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  availableNftIds,
  depositedNftIds,
  farm,
  provider,
  onDismiss,
  onStake,
  onUnstake,
}) => {
  const [currentId, setCurrentId] = useState<number | undefined>(undefined)
  const [activeFarmPlot, setActiveFarmPlot] = useState<FarmPlot>()
  const [expiredFarmPlots, setExpiredFarmPlots] = useState<FarmPlot[]>()

  const [isShowingStakingDetailScreen, setIsShowingStakingDetailScreen] =
    useState(false)
  const [isShowingUnstakingDetailScreen, setIsShowingUnstakingDetailScreen] =
    useState(false)

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

  const openStakingDetail = async (nftId: number) => {
    setCurrentId(nftId)
    setIsShowingStakingDetailScreen(true)
    // TODO: is this the best way to do this?
    /* TODO: this is broken -> setExpiredFarmPlots(
      await getExpiredFarmsInUse(farm, currentId || -1, provider)
    )*/
  }
  const closeStakingDetail = () => {
    setCurrentId(undefined)
    setIsShowingStakingDetailScreen(false)
  }

  const openUnstakingDetail = async (nftId: number) => {
    setCurrentId(nftId)
    setIsShowingUnstakingDetailScreen(true)
    /* TODO: this is broken -> setExpiredFarmPlots(
      await getExpiredFarmsInUse(farm, currentId || -1, provider)
    )*/
  }
  const closeUnstakingDetail = () => {
    setCurrentId(undefined)
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
            {currentId}
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
            {currentId}
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
          </div>
        </ModalContent>
        <ModalActions>
          <Button
            onClick={closeUnstakingDetail}
            variant='secondary'
            text='Cancel'
          />
          <Button onClick={handleUnstakeClick} text='Unstake & Withdraw' />
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
              <h3>Staked {farm.farmName} LP NFTs</h3>
              <StyledList>
                {depositedNftIds.map((nft) => (
                  <StyledNftItem
                    key={nft.toString()}
                    onClick={() => openUnstakingDetail(nft)}
                  >
                    {nft?.toString()}
                  </StyledNftItem>
                ))}
              </StyledList>
            </div>
          )}
          <h3>Claimable Rewards</h3>
          <div>{/** TODO add claimable rewards amt here */} INDEX</div>
        </div>
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} variant='secondary' text='Cancel' />
        <Button onClick={handleClaimRewards} text='Claim Rewards' />
      </ModalActions>
    </Modal>
  )
}

const DropdownOption = styled.div`
  margin: 10px;
`

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 5px;
  background-color: #1a1a26;
  padding: 15px;
`

const StyledNftItem = styled.div`
  padding: 2px 0 2px 0;
`

export default StakeModal
