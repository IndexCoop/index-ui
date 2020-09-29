import React, { useMemo } from 'react'

import {
  Card,
  CardContent,
  Container,
  Spacer,
} from 'react-neu'
import { useLocation } from 'react-router-dom'

import ExternalLink from 'components/ExternalLink'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'

import Question from './components/Question'

const FAQ: React.FC = () => {
  const { pathname } = useLocation()
  const pathArr = pathname.split('/')

  const activeSlug = useMemo(() => {
    if (pathArr.length > 2) {
      return pathArr[2]
    }
  }, [pathArr])

  return (
    <Page>
      <PageHeader
        icon="📖"
        subtitle="Learn about Index"
        title="FAQ"
      />
      <Container>
        <Card>
          <CardContent>
            <Question
              active={activeSlug === "the-index-dao"}
              question="What is the The Index DAO?"
              slug="the-index-dao"
            >
              <span>The Index DAO is a community run index that aims to curate the highest quality projects in the index. Members of the Index DAO are able to vote in different projects they believe should be included into using their INDEX tokens through proposals.</span>
            </Question>
            <Question
              active={activeSlug === "index-token"}
              question="What is YAM?"
              slug="index-token"
            >
              <span>INDEX is a governance token used to determine the components of the Index DAO. Members who hold INDEX are able to make proposals to the <ExternalLink href="https://forum.theindexdao.com/">Index Governance Forum</ExternalLink> to propose new index weightings. The DeFi Pulse Index Set follows the Index DAO's allocations, and rebalances to the new allocations over time.</span>
            </Question>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}


export default FAQ