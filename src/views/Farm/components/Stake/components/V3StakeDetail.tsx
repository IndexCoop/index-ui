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
  onStake: (nftId: number, farm: V3Farm) => void
  onClose: (() => void) | undefined
}

const StakeModal: React.FC<StakeModalProps> = ({
  farm,
  selectedNftId,
  onStake,
  onClose,
}) => {
  const [activeFarmPlot, setActiveFarmPlot] = useState<FarmData>()

  const handleStakeClick = useCallback(() => {
    if (!selectedNftId) return

    onStake(selectedNftId, farm)
    onClose && onClose()
  }, [onStake, selectedNftId, farm])

  useEffect(() => {
    setActiveFarmPlot(farm.farms[getMostRecentFarmNumber(farm)])
  }, [farm])

  const hasUpcomingFarm = getUpcomingFarms().length > 0
  const hasActiveFarm = getActiveFarms().length > 0

  if (!hasUpcomingFarm && !hasActiveFarm) {
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
              This token is not eligible for any active or upcoming Index Coop
              farms.
            </p>
          </div>
        </ModalContent>
        <ModalActions>
          <Button onClick={onClose} variant='secondary' text='Cancel' />
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
              This token is currently unstaked and undeposited in any active LM
              farms. In order to earn Uniswap V3 LM rewards you must deposit
              this NFT to the Uniswap V3 Staking contract, and stake it in the
              following upcoming farm:
            </p>

            <h3>Upcoming Farm</h3>
            <NftFarmPlot
              farmName={'Uniswap V3 DPI-ETH LM #1'}
              farmPlot={activeFarmPlot}
            />
          </div>
        </ModalContent>
        <ModalActions>
          <Button onClick={onClose} variant='secondary' text='Cancel' />
          <Button onClick={handleStakeClick} text='Deposit & Stake' />
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
            This token is currently unstaked and undeposited in any active LM
            farms. In order to earn Uniswap V3 LM rewards you must deposit this
            NFT to the Uniswap V3 Staking contract, and stake it in the
            following farm:
          </p>

          <h3>Active Farm</h3>
          <NftFarmPlot
            farmName={'Uniswap V3 DPI-ETH LM #1'}
            farmPlot={activeFarmPlot}
          />
        </div>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} variant='secondary' text='Cancel' />
        <Button onClick={handleStakeClick} text='Deposit & Stake' />
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
