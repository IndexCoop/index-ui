import React, { useMemo } from 'react'
import styled from 'styled-components'

import {
  Card,
  CardContent,
  Container,
  Spacer,
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
              active={activeSlug === "the-index"}
              question="What is the vision of Index?"
              slug="the-index"
            >
              <span>Index is the first community-led decentralized organization focused on enabling the creation and adoption of crypto index products.</span>
              <span>To achieve this, Index aims to collaborate with the world's best index experts and brands to launch/maintain desirable indices, govern critical system parameters with growth in mind and embed its products into as many distribution channels as possible.</span>
              <span>It also aims to collaborate with the growing DeFi community of enthusiasts to generate widespread awareness of its mission and products.</span>
            </Question>
            <Question
              active={activeSlug === "governance-token"}
              question="What is the INDEX Governance Token?"
              slug="governance-token"
            >
              <span>The INDEX Governance Token is an ERC20 token used for maintaining and upgrading the Index protocol. Maintenance and upgrades to the protocol will initially be done via a multisig, but will eventually be moved to a complete on-chain voting scheme.</span>
            </Question>
            <Question
              active={activeSlug === "governance-duties"}
              question="What are the responsibilities of Index?"
              slug="governance-duties"
            >
              <ul>
                <li>
                  <b>Adding Supported Indices:</b>
                  <span> - </span>
                  <span>Index will source, develop and support new index strategies that have broad market appeal.</span>
                </li>
                <li>
                  <b>Distributing Community Treasury</b>
                  <span> - </span>
                  <span>Index will devise incentive programs for index methodologists, liquidity providers, marketers, community developers, and other experts to increase adoption of Index indices.</span>
                </li>
                <li>
                  <b>Updating Fee Configurations</b>
                  <span> - </span>
                  <span>The Index is permitted to institute and alter management fees for any of it’s index products.</span>
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
              question="Am I eligible for the initial INDEX token distribution?"
              slug="airdrop"
            >
              <span>Users who purchased at least $10 of the DeFi Pulse Index Set before block #10980212 (October 3rd, 2020, 7pm PST) have been granted a portion of INDEX tokens at launch.</span>
              <span>To see if you qualify, connect your wallet and check the 'Claim Your INDEX Rewards' Card at the bottom of the page.</span>
            </Question>
            <Question
              active={activeSlug === "liquidity-mining"}
              question="How will the INDEX liquidity mining program work?"
              slug="liquidity-mining"
            >
              <span>The initial INDEX Liquidity Mining program will distribute 9% of all Index tokens and run for 60 days, starting from October 7th, 12pm PDT. INDEX tokens released under this program are not subject to vesting.</span>
              <span>Instructions on how to get started mining INDEX can be found <StyledLink target="_blank" href="#">here.</StyledLink></span>
            </Question>
            <Question
              active={activeSlug === "third-parties"}
              question="What is the relationship between Set Labs, DeFi Pulse and Index?"
              slug="third-parties"
            >
              <span>Set Labs and DeFi Pulse are early contributors to Index. Set Labs and DeFi Pulse have a minority stake in INDEX tokens but do not represent Index.</span>
            </Question>
          </CardContent>
        </Card>

        <Spacer />

        <Card>
          <CardContent>
            <span>
              For more detailed information about the Index Coop, see the launch article <StyledLink target="_blank" href="#">here.</StyledLink>
            </span>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}

const StyledLink = styled.a`
  display: inline-block;
`

export default FAQ
