import React, { useCallback, useEffect, useState } from 'react'
import { Button, ModalActions, ModalContent, ModalProps } from 'react-neu'
import styled from 'styled-components'

import { FarmData, V3Farm } from 'constants/v3Farms'
import { getMostRecentFarmNumber } from 'index-sdk/uniV3Farm'
import NftFarmPlot from './NftFarmPlot'
import { deriveRGBColorFromString } from 'utils/colorUtils'
import { getUpcomingFarms, getActiveFarms } from 'index-sdk/uniV3Farm'

interface StakeModalProps extends ModalProps {
  farm: V3Farm
  selectedNftId: number | undefined
  pendingRewardsForSelectedNft: number
  onUnstake: (nftId: number, farm: V3Farm) => void
  onClose: (() => void) | undefined
}

const StakeModal: React.FC<StakeModalProps> = ({
  farm,
  selectedNftId,
  pendingRewardsForSelectedNft,
  onUnstake,
  onClose,
}) => {
  const [activeFarmPlot, setActiveFarmPlot] = useState<FarmData>()

  const handleUnstakeClick = useCallback(() => {
    if (!selectedNftId) return

    onUnstake(selectedNftId, farm)
    onClose && onClose()
  }, [onUnstake, selectedNftId, farm])

  useEffect(() => {
    setActiveFarmPlot(farm.farms[getMostRecentFarmNumber(farm)])
  }, [farm])

  const hasUpcomingFarm = getUpcomingFarms().length > 0
  const hasActiveFarm = getActiveFarms().length > 0

  if (!hasActiveFarm && !hasUpcomingFarm) {
    return (
      <>
        <ModalContent>
          <div>
            <StyledNftCardTitle>
              <StyledBigNftColor
                nftColor={deriveRGBColorFromString(
                  selectedNftId?.toString() || ''
                )}
              />
              {selectedNftId}
            </StyledNftCardTitle>
            <p>
              This token is currently deposited in the Uniswap V3 staking
              contract. <br /> You are not accruing any additional rewards for
              staking this token
            </p>

            <h3>Expired Farm</h3>
            <NftFarmPlot
              farmName={'Uniswap V3 DPI-ETH LM #1'}
              farmPlot={activeFarmPlot}
            />

            <p>Pending Rewards: {pendingRewardsForSelectedNft} INDEX</p>
          </div>
        </ModalContent>
        <ModalActions>
          <Button onClick={onClose} variant='secondary' text='Cancel' />
          <Button onClick={handleUnstakeClick} text='Unstake' />
        </ModalActions>
      </>
    )
  }

  if (hasUpcomingFarm) {
    return (
      <>
        <ModalContent>
          <div>
            <StyledNftCardTitle>
              <StyledBigNftColor
                nftColor={deriveRGBColorFromString(
                  selectedNftId?.toString() || ''
                )}
              />
              {selectedNftId}
            </StyledNftCardTitle>
            <p>
              This token is currently deposited in the Uniswap V3 staking
              contract. <br /> It will begin accruing rewards once the upcoming
              farm listed below becomes active.
            </p>

            <h3>Upcoming Farm</h3>
            <NftFarmPlot
              farmName={'Uniswap V3 DPI-ETH LM #1'}
              farmPlot={activeFarmPlot}
            />

            <p>Pending Rewards: {pendingRewardsForSelectedNft} INDEX</p>
          </div>
        </ModalContent>
        <ModalActions>
          <Button onClick={onClose} variant='secondary' text='Cancel' />
          <Button onClick={handleUnstakeClick} text='Unstake' />
        </ModalActions>
      </>
    )
  }

  return (
    <>
      <ModalContent>
        <div>
          <StyledNftCardTitle>
            <StyledBigNftColor
              nftColor={deriveRGBColorFromString(
                selectedNftId?.toString() || ''
              )}
            />
            {selectedNftId}
          </StyledNftCardTitle>
          <p>
            This token is currently deposited in the Uniswap V3 staking
            contract. <br /> The active farm below is accruing you rewards:
          </p>

          <h3>Active Farm</h3>
          <NftFarmPlot
            farmName={'Uniswap V3 DPI-ETH LM #1'}
            farmPlot={activeFarmPlot}
          />

          <p>Pending Rewards: {pendingRewardsForSelectedNft} INDEX</p>
        </div>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} variant='secondary' text='Cancel' />
        <Button onClick={handleUnstakeClick} text='Unstake' />
      </ModalActions>
    </>
  )
}

const StyledBigNftColor = styled.div`
  height: 30px;
  width: 30px;
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

export default StakeModal
