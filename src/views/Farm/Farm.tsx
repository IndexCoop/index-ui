import { useEffect, useState } from 'react'

import { Container, Spacer } from 'react-neu'

import styled from 'styled-components'

import Page from 'components/Page'
import { RoundedButton } from 'components/RoundedButton'
import { DpiEthRewards } from 'constants/v3Farms'
import useChainData from 'hooks/useChainData'
import { POLYGON_CHAIN_DATA } from 'utils/connectors'

import DpiFarmCard from './components/Stake/DpiFarm'
import GmiFarmCard from './components/Stake/GmiFarm'
import LegacyFarmCard from './components/Stake/LegacyFarm'
import MviFarmCard from './components/Stake/MviFarm'
import V3FarmCard from './components/Stake/V3Farm'
import Treasury from './components/Treasury'

const Farm = (props: { title: string }) => {
  const [showFarms, setShowFarms] = useState(true)
  const { chain } = useChainData()
  useEffect(() => {
    document.title = props.title
    if (chain === POLYGON_CHAIN_DATA) setShowFarms(false)
    else setShowFarms(true)
  }, [props.title, chain])

  return (
    <Page>
      <Container>
        <StyledPageHeader data-cy='liquidity-mining-title'>
          Liquidity Mining Programs
        </StyledPageHeader>
        <Spacer size='sm' />
        <StyledPageSubheader data-cy='liquidity-mining-subtitle'>
          Earn rewards for supplying liquidity for Index Coop products
        </StyledPageSubheader>
        <Spacer />
      </Container>
      <Treasury data-cy='treasury' />
      <Spacer />
      {showFarms ? <Farms /> : <FarmingDisabled />}
    </Page>
  )
}

const Farms = () => {
  return (
    <Container>
      <GmiFarmCard />
      <Spacer />
      <V3FarmCard farm={DpiEthRewards} />
      <Spacer />
      <DpiFarmCard />
      <Spacer />
      <MviFarmCard />
      <Spacer />
      <LegacyFarmCard />
      <Spacer size='lg' />
    </Container>
  )
}

const FarmingDisabled = () => {
  const { setMainnet } = useChainData()

  return (
    <StyledCard data-cy='buy-sell-selector'>
      <StyledCardContent>
        <div>Liquidity Mining is only available on Mainnet</div>
        <Spacer />
        <RoundedButton text='Switch to Mainnet' onClick={setMainnet} />
      </StyledCardContent>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  height: fit-content;
  background-color: ${(props) => props.theme.colors.transparentColors.grey};
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom: 30px;
`

const StyledPageHeader = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  width: 100%;
`

const StyledPageSubheader = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 24px;
  text-align: center;
  width: 100%;
`

export default Farm
