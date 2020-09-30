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
              question="What is the vision of the Index DAO?"
              slug="the-index-dao"
            >
              <span>By bringing the collective minds of the world’s experts in finance and indexes, we can create and maintain the world’s best and most widely adopted crypto indices.</span>
              <span>These minds will collaborate to add/remove index vehicles, improve rebalance execution criteria, model out and discuss index composition, etc.</span>
              <span>This DAO has the potential to be one of the world’s largest capital allocators and the decisions made in this DAO can be potentially influence the movement of billions of dollars</span>
            </Question>
            <Question
              active={activeSlug === "stakeholders"}
              question="Who are the stakeholders of INDEX DAO?"
              slug="stakeholders"
            >
              <ul>
                <li>
                  <b>Governors</b>
                  <span> - </span>
                  <span>Governors want to see the success of INDEX DAO and make long-term oriented decisions</span>
                </li>
                <li>
                  <b>Investors</b>
                  <span> - </span>
                  <span>Whether an individual or a fund, they want to be investing in the best product possible and know that the brightest minds are generating the best methodology and rebalance execution.</span>
                </li>
                <li>
                  <b>Component Projects</b>
                  <span> - </span>
                  <span>Component projects care as indices are a large capital allocators and inclusion/exclusion can result in large buy/sell pressure on their token.</span>
                </li>
                <li>
                  <b>Index Experts</b>
                  <span> - </span>
                  <span>Whether a company such as DeFi Pulse or an individual, index experts can create indices and can get compensated by contributing analysis, their brand, insights, and methodologies.</span>
                </li>
              </ul>
            </Question>
            <Question
              active={activeSlug === "index-token"}
              question="What abilities does the INDEX DAO have?"
              slug="index-token"
            >
              <ul>
                <li>
                  <b>Ratify Rebalances</b>
                  <span> - </span>
                  <span>Voters can approve/disapprove rebalances.</span>
                </li>
                <li>
                  <b>Rebalance Composition</b>
                  <span> - </span>
                  <span>Periodically submit components, weights, and max trade sizes that are used to rebalance the SetToken.</span>
                </li>
                <li>
                  <b>Rebalance Execution</b>
                  <span> - </span>
                  <span>Voting on the best methods / ways to perform rebalances of potentially illiquid and large quantities of assets.</span>
                </li>
                <li>
                  <b>Add and Remove Indices</b>
                  <span> - </span>
                  <span>The DAO can vote in new indices for inclusion under the INDEX DAO.</span>
                </li>
                <li>
                  <b>Component Migrations</b>
                  <span> - </span>
                  <span>Upgrading constituent tokens (e.g. LEND {'->'} Aave).</span>
                </li>
                <li>
                  <b>Fee Splits</b>
                  <span> - </span>
                  <span>Changing and updating fees on SetTokens and receiving portions of fees from those SetTokens.</span>
                </li>
              </ul>
            </Question>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}


export default FAQ