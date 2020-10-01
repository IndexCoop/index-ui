import React from 'react'
import { Button, Spacer } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Explanation from 'components/Explanation'

import Treasury from './components/Treasury'
import DeFiPulseIndex from './components/DeFiPulseIndex'

const Home: React.FC = () => {

  return (
    <Page>
      <PageHeader
        icon='🦉'
        title='Index DAO'
        subtitle='A global community launching and maintaining the world’s best crypto index vehicles'
      />
      <Button text='View Farms' to='/farm' />
      <Spacer />
      <Treasury />
      <Spacer />
      <Explanation />
      <Spacer />
      <DeFiPulseIndex />
      <Spacer />
    </Page>
  )
}

export default Home
