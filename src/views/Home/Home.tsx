import React from 'react'
import { Button, Container, Spacer } from 'react-neu'
import styled from 'styled-components'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Manifesto from 'components/Manifesto'

import useBalances from 'hooks/useBalances'

import MigrationNotice from './components/MigrationNotice'
import Treasury from './components/Treasury'

const Home: React.FC = () => {
  const { yamV2Balance } = useBalances()

  return (
    <Page>
      <PageHeader
        icon='🦉'
        title='The Index DAO'
        subtitle='The community curated crypto index'
      />
      <Button text='View Farms' to='/farm' />
      <Spacer />
      <Container>
        <StyledIndexImage src='https://index-dao.s3.amazonaws.com/index_allocations_1.png' />
      </Container>
      <Spacer />
      <Treasury />
      <Spacer />
      <Manifesto />
      <Container>
        {yamV2Balance && yamV2Balance.toNumber() >= 0 && (
          <>
            <MigrationNotice />
            <Spacer />
          </>
        )}
      </Container>
    </Page>
  )
}

const StyledIndexImage = styled.img`
  width: 100%
`

export default Home
