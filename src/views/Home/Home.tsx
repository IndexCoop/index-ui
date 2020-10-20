import React from 'react'
import { Container, Spacer } from 'react-neu'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Explanation from 'components/Explanation'
import Split from 'components/Split'

import DeFiPulseIndex from './components/DeFiPulseIndex'
import FarmingTimer from './components/FarmingTimer'
import MarketData from './components/MarketData'

const Home: React.FC = () => {
  const icon = {
    src: 'https://index-dao.s3.amazonaws.com/owl.png',
    alt: 'Owl',
  };

  return (
    <Page>
      <PageHeader
        icon={icon}
        title='Index'
        subtitle='A global community creating and maintaining the best crypto index products'
      />
      <Spacer size="lg" />
      <Container>
        <Explanation />
        <Spacer />
        <Split>
          <FarmingTimer />
        </Split>
      </Container>
      <Spacer />
      <DeFiPulseIndex />
      <Spacer size="lg" />
      <MarketData />
      <Spacer />
    </Page>
  )
}

export default Home
