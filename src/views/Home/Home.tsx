import React, { useEffect } from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import Explanation from 'components/Explanation'
import HomeHeader from './components/HomeHeader'
import MarketData from './components/MarketData'
import Integrations from './components/Integrations'

const Home = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [])

  return (
    <Page>
      <Container size='lg'>
        <HomeHeader />
        <Spacer size='lg' />
        <Explanation />
        <Spacer size='lg' />
        <MarketData />
        <Integrations />
      </Container>
    </Page>
  )
}

export default Home
