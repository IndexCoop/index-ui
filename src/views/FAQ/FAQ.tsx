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
        subtitle="Learn about YAM"
        title="FAQ"
      />
      <Container>
        <Card>
          <CardContent>
            <Question
              active={activeSlug === "yam-protocol"}
              question="What is the YAM protocol?"
              slug="yam-protocol"
            >
              <span>YAM is a decentralized cryptocurrency that uses a rebasing mechanism to raise funds for a treasury managed by the community. The community can then use those funds via YAM governance to build out the protocol.</span>
            </Question>
            <Question
              active={activeSlug === "yam-token"}
              question="What is YAM?"
              slug="yam-token"
            >
              <span>YAM is the governance token for the YAM protocol. Using token voting, YAM holders have direct influence over the YAM treasury and direction of the protocol. Governance discussions take place on the <ExternalLink href="https://forum.yam.finance/">Yam Governance Forum.</ExternalLink></span>
            </Question>
            <Question
              active={activeSlug === "rebase"}
              question="What is rebasing?"
              slug="rebase"
            >
              <span>Rebases occur every 12 hours. In order to target a price of 1 yUSD, YAM supply is either increased or decreased during each rebase. In theory, an increase in supply would put downward pressure on price towards 1 and a decrease in supply would put upward pressure on price towards 1.</span>
              <span>If YAM price is above 1.05 yUSD, YAM supply increases. This is known as a positive rebase.</span>
              <span>If YAM price is below 0.95 yUSD, YAM supply decreases. This is known as a negative rebase.</span>
              <span>If YAM price is between 0.95 and 1.05 yUSD, YAM does not rebase.</span>
              <span>Every YAM holder gets the same increase or decrease in supply every rebase. However, this increase or decrease is offset by the subsequent increase or decrease in price.</span>
            </Question>
            <Question
              active={activeSlug === "rebase-math"}
              question="What is the math behind each rebase?"
              slug="rebase-math"
            >
              <span>YAM does not try to target $1 all at once, instead attempting to do it over 10 rebase periods.</span>
              <span>To calculate change in supply we need to determine how far from the peg the current price is. This formula is:</span>
              <code>
                Deviation from peg = (Current Price - Target Price) / Target Price
                <br />
                Rebase Amount = Current Supply * (Deviation From Peg/10)
                <br />
                New Supply = Current supply + Rebase Amount
              </code>
            </Question>
            <Question
              active={activeSlug === "rebase-supply"}
              question="Does this mean I gain or lose money every rebase?"
              slug="rebase-supply"
            >
              <span>No. The Uniswap liquidity pools are in sync with every rebase. This means that if supply is increased by 20% in a rebase, price will drop 20% to offset it. </span>
              <span>Imagine the following scenario. YAM is at $2 and you hold 100 YAM. This means your YAM holdings are $200. A rebase comes and it's a positive 20% rebase. You now have 120 YAM but the price will go $1.67, so your YAM holdings are still worth $200!</span>
            </Question>
            <Question
              active={activeSlug === "treasury"}
              question="How does YAM have a treasury?"
              slug="treasury"
            >
              <span>Every positive rebase, the treasury mints 10% of the rebase amount and sells YAM to the YAM/yUSD Uniswap pool. The yUSD acquired through this action is sent to the treasury which is managed by YAM holders. The current treasury amount can be seen on yam.finance.</span>
            </Question>
            <Question
              active={activeSlug === "farming"}
              question="Can I farm YAM?"
              slug="farming"
            >
              <span>Yes. Currently, you’re able to earn YAM rewards by providing liquidity to the <ExternalLink href="https://uniswap.info/pair/0xb93Cc05334093c6B3b8Bfd29933bb8d5C031caBC">yUSD/YAM Uniswap pool</ExternalLink>. The rewards given to the pool are 92,500 in week 1, decreasing by 10% every week after. Please realize that you must apply the YAM scaling factor to get the current reward amount at any given time.</span>
            </Question>

            <Question
              active={activeSlug === "scaling-factor"}
              question="What is the scaling factor?"
              slug="scaling-factor"
            >
              <span>Because YAM supply is constantly changing due to rebases, it’s hard to keep up with the ever changing supply amount. Yam.finance provides a scaling factor that you can use which allows you to go from initial Yam v3 supply amount to today’s supply amount.</span>
            </Question>
            <Question
              active={activeSlug === "yusd"}
              question="What is yUSD?"
              slug="yusd"
            >
              <span>yUSD is an interest earning stablecoin generated from <ExternalLink href="https://yearn.finance/vaults">yearn.finance vaults</ExternalLink>. Users are able to deposit yCRV (generated <ExternalLink href="https://www.curve.fi/iearn/deposit">here</ExternalLink>) into the vaults which then yield interest on the deposit over time.</span>
            </Question>
          </CardContent>
        </Card>
      </Container>
    </Page>
  )
}


export default FAQ