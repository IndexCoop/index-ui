import React from 'react'
import { Button, Container, Spacer } from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Explanation from 'components/Explanation'

import useBalances from 'hooks/useBalances'

import Treasury from './components/Treasury'
import DeFiPulseIndex from './components/DeFiPulseIndex'

const Home: React.FC = () => {
  const { yamV2Balance } = useBalances()

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

const StyledIndexImage = styled.img`
  width: 100%
`

export default Home
