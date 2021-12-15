import React, { useCallback, useEffect, useState } from 'react'

import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Web3 from 'web3'

import Modal from 'components/CustomModal'
import { V3Farm } from 'constants/v3Farms'
import useV3Farming from 'hooks/useV3Farming'
import { deriveRGBColorFromString } from 'utils/colorUtils'

import V3StakeDetail from './V3StakeDetail'
import V3UnstakeDetail from './V3UnstakeDetail'

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
  const [selectedNftId, setSelectedNftId] = useState<number | undefined>(
    undefined
  )

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
  }, [selectedNftId, getIndividualPendingRewardsAmount, farm])

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
  }
  const closeUnstakingDetail = () => {
    setSelectedNftId(undefined)
    setIsShowingUnstakingDetailScreen(false)
  }

  const lpTokenIcons = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage alt={farm.img.alt} src={farm.img.src} />
    </StyledLpTokenWrapper>
  )

  if (isShowingStakingDetailScreen) {
    return (
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        <V3StakeDetail
          farm={farm}
          selectedNftId={selectedNftId}
          onStake={handleStakeClick}
          onClose={closeStakingDetail}
        />
      </Modal>
    )
  }

  if (isShowingUnstakingDetailScreen) {
    return (
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        <V3UnstakeDetail
          farm={farm}
          selectedNftId={selectedNftId}
          pendingRewardsForSelectedNft={pendingRewardsForSelectedNft}
          onUnstake={handleUnstakeClick}
          onClose={closeUnstakingDetail}
        />
      </Modal>
    )
  }

  const stakedTokens =
    availableNftIds.length === 0 && depositedNftIds.length === 0 ? (
      <StyledList>
        You do not have any Uniswap V3 tokens eligible for INDEX rewards.
      </StyledList>
    ) : (
      <>
        <h3>Your Unstaked {farm.tokenPair} LP NFTs</h3>
        {availableNftIds.length > 0 ? (
          <div>
            <StyledList>
              {availableNftIds.map((nft) => (
                <StyledNftItem
                  key={nft.toString()}
                  onClick={() => openStakingDetail(nft)}
                >
                  <StyledNftColor
                    nftColor={deriveRGBColorFromString(nft?.toString())}
                  />
                  {nft?.toString()}
                </StyledNftItem>
              ))}
            </StyledList>
          </div>
        ) : (
          <StyledList>
            You do not have any unstaked {farm.poolLabel} Uniswap V3 tokens.
          </StyledList>
        )}

        <Spacer />

        <h3>Your Staked {farm.tokenPair} LP NFTs</h3>
        {depositedNftIds.length > 0 ? (
          <div>
            <StyledList>
              {depositedNftIds.map((nft) => (
                <StyledNftItem
                  key={nft.toString()}
                  onClick={() => openUnstakingDetail(nft)}
                >
                  <StyledNftColor
                    nftColor={deriveRGBColorFromString(nft?.toString())}
                  />
                  {nft?.toString()}
                </StyledNftItem>
              ))}
            </StyledList>
          </div>
        ) : (
          <StyledList>
            You do not have any staked {farm.poolLabel} Uniswap V3 tokens.
          </StyledList>
        )}
      </>
    )

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalContent>
        <div>
          <StyledNftCardTitle>
            {lpTokenIcons}
            Uniswap V3 Staking
          </StyledNftCardTitle>
          <p>
            Uniswap V3 uses NFT tokens to represent LP positions. <br /> Your
            Uniswap V3 LP tokens eligible for Index Coop rewards are listed
            below.
          </p>

          {stakedTokens}
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
  border-radius: 20px;
  ${(props: { nftColor: string }) =>
    `
      background-color: #${props.nftColor};
    `}
`

const StyledNftCardTitle = styled.h2`
  display: flex;
  align-items: center;
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

const StyledLpTokenWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`

const StyledLpTokenImage = styled.img`
  height: 35px;
  margin-left: -10px;
`

export default StakeModal
