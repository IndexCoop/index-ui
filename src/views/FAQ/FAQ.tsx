import React, { useMemo } from 'react'

import {
  Card,
  CardContent,
  Container,
} from 'react-neu'
import { useLocation } from 'react-router-dom'

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
  const icon = {
    src: 'https://index-dao.s3.amazonaws.com/book.png',
    alt: 'Book',
  };

  return (
    <Page>
      <PageHeader
        icon={icon}
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
              <span>Index DAO is the first community-led decentralized organization focused on enabling the creation and adoption of crypto index products.</span>
              <span>To achieve this, Index DAO aims to collaborate with the world's best index experts and brands to launch/maintain desirable indices, govern critical system parameters with growth in mind and embed its products into as many distribution channels as possible.</span>
              <span>It also aims to collaborate with the growing DeFi community of enthusiasts to generate widespread awareness of its mission and products.</span>
            </Question>
            <Question
              active={activeSlug === "governance-token"}
              question="What is the INDEX Governance Token?"
              slug="governance-token"
            >
              <span>The INDEX Governance Token is an ERC20 token used for maintaining and upgrading the Index DAO. Maintenance and upgrades to the DAO will initially be done via a multisig, but will eventually be moved to a complete on-chain voting scheme.</span>
            </Question>
            <Question
              active={activeSlug === "governance-duties"}
              question="What are the responsibilities of the Index DAO?"
              slug="governance-duties"
            >
              <ul>
                <li>
                  <b>Adding Supported Indices:</b>
                  <span> - </span>
                  <span>Index DAO will source, develop and support new index strategies that have broad market appeal.</span>
                </li>
                <li>
                  <b>Distributing Community Treasury</b>
                  <span> - </span>
                  <span>Index DAO will devise incentive programs for index methodologists, liquidity providers, marketers, community developers, and other experts to increase adoption of Index DAO indices.</span>
                </li>
                <li>
                  <b>Updating Fee Configurations</b>
                  <span> - </span>
                  <span>The Index DAO is permitted to institute and alter management fees for any of it’s index products.</span>
                </li>
                <li>
                  <b>Ratify Rebalances</b>
                  <span> - </span>
                  <span>Voters will approve or reject proposed index product rebalances on a per product basis.</span>
                </li>
              </ul>
            </Question>
            <Question
              active={activeSlug === "airdrop"}
              question="Am I eligible for the INDEX token airdrop?"
              slug="airdrop"
            >
              <span>Users who purchased at least $10 of the DeFi Pulse Index Set before block #10980212 (October 3rd, 2020, 7pm PST) are eligible for airdrop rewards. Visit the `Farm` tab to check if you qualify.</span>
              <span>Air drop rewards are weighted on tiers based on capital contributed. View the tiering list here.</span>
            </Question>
            <Question
              active={activeSlug === "liquidity-mining"}
              question="How will the INDEX liquidity mining program work?"
              slug="liquidity-mining"
            >
              <span>The initial INDEX Liquidity Mining program will distribute 9% of all Index tokens and run for 60 days, starting from October 7th, 12pm PDT. Users can earn INDEX tokens by buying the DeFi Pulse Set and providing liquidity to the ETH/DPI Pool on Uniswap.</span>
            </Question>
            <Question
              active={activeSlug === "third-parties"}
              question="What is the relationship between Set Labs, DeFi Pulse and the Index DAO?"
              slug="third-parties"
            >
              <span>Set Labs and DeFi Pulse are early contributors to the Index DAO. Set Labs and DeFi Pulse have a minority stake in INDEX tokens but do not represent the Index DAO.</span>
            </Question>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}

export default FAQ