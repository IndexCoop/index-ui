import React from 'react'

import dateformat from 'dateformat'
import styled from 'styled-components'

import { FarmData } from 'constants/v3Farms'
import { makeEtherscanAddressLink } from 'utils/index'

interface NftFarmPlotProps {
  farmName: string
  farmPlot: FarmData | undefined
}
/**
 * NftFarmPlot - Displays farm information for Uniswap V3 Staking.
 */
const NftFarmPlot: React.FC<NftFarmPlotProps> = ({ farmName, farmPlot }) => {
  const { pool, startTime, endTime } = farmPlot || {}

  const farmStartTime = new Date((startTime || 0) * 1000).toString()
  const formattedStartTime = dateformat(farmStartTime, 'mmm dd h:MM TT')

  const farmEndTime = new Date((endTime || 0) * 1000).toString()
  const formattedEndTime = dateformat(farmEndTime, 'mmm dd h:MM TT')

  const lpTokenIcon = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage alt={farmPlot?.img.alt} src={farmPlot?.img.src} />
    </StyledLpTokenWrapper>
  )

  return (
    <StyledCard href={makeEtherscanAddressLink(pool || '')} target='_blank'>
      {lpTokenIcon}
      <StyledCardBody>
        <StyledFarmTitle>{farmName}</StyledFarmTitle>
        <StyledFarmText>
          Active: {formattedStartTime} - {formattedEndTime}
        </StyledFarmText>
      </StyledCardBody>
    </StyledCard>
  )
}

const StyledCard = styled.a`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #1a1a26;
  text-decoration: none;
  padding: 20px;
`

const StyledCardBody = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledFarmTitle = styled.h3`
  display: flex;
  align-items: center;
  margin: 0px;
  color: ${(props) => props.theme.colors.primary.light};
`

const StyledFarmText = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.textColor};
`

const StyledLpTokenWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`

const StyledLpTokenImage = styled.img`
  height: 40px;
  margin-left: -10px;
`

export default NftFarmPlot
