import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Container } from 'react-neu'
import { useTheme } from 'react-neu'

import Page from 'components/Page'
import useMediaQuery from '../../hooks/useMediaQuery'

const HowToBuy = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [])

  const { isMobile } = useMediaQuery()

  let headerImage = isMobile ? null : (
    <HeaderImage
      src={
        'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-banner.svg'
      }
    />
  )

  let doubleImage1 = isMobile ? (
    <div style={{ marginLeft: '-40px' }}>
      <Image
        src={
          'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-1.svg'
        }
      />
      <Image
        src={
          'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-2.svg'
        }
      />
    </div>
  ) : (
    <div
      style={{ display: 'flex', marginLeft: '-40px', justifyContent: 'center' }}
    >
      <div style={{ maxWidth: '50%', padding: '5px' }}>
        <Image
          src={
            'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-1.svg'
          }
        />
      </div>
      <div style={{ maxWidth: '50%', padding: '5px' }}>
        <Image
          src={
            'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-2.svg'
          }
        />
      </div>
    </div>
  )

  let doubleImage2 = isMobile ? (
    <div style={{ marginLeft: '-40px' }}>
      <Image
        src={
          'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-3.svg'
        }
      />
      <Image
        src={
          'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-4.svg'
        }
      />
    </div>
  ) : (
    <div
      style={{ display: 'flex', marginLeft: '-40px', justifyContent: 'center' }}
    >
      <div style={{ maxWidth: '50%', padding: '5px' }}>
        <Image
          src={
            'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-3.svg'
          }
        />
      </div>
      <div style={{ maxWidth: '50%', padding: '5px' }}>
        <Image
          src={
            'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-4.svg'
          }
        />
      </div>
    </div>
  )

  let doubleImage3 = isMobile ? (
    <div>
      <Image
        src={
          'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-5.svg'
        }
      />
      <Image
        src={
          'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-6.svg'
        }
      />
    </div>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '50%', padding: '5px' }}>
        <Image
          src={
            'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-5.svg'
          }
        />
      </div>
      <div style={{ maxWidth: '50%', padding: '5px' }}>
        <Image
          src={
            'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-mobile-1.svg'
          }
        />
      </div>
    </div>
  )

  return (
    <Page>
      <Container size='lg'>
        <Section>
          <div>
            <AboutTitle>
              How To Buy The{' '}
              <HighlightedHeader> DeFi Pulse Index </HighlightedHeader>
            </AboutTitle>
            <br />
            {headerImage}
          </div>
        </Section>
        <Section>
          <div>
            <SectionTitle>Introduction</SectionTitle>
            <Description>
              This is to help an investor who is new to cryptocurrency and
              Decentralized Finance (DeFi) buy the DeFi Pulse Index, known as
              $DPI.
              <br />
              <br />
              If this is your first time buying digital assets and you do not
              have an exchange account or a cryptocurrency wallet, you can
              follow this guide and buy DPI in under an hour. If you choose to
              take longer, that’s fine too.
              <br />
              <br />
              The guide covers two avenues for purchasing digital assets: mobile
              wallets and centralised exchanges.
            </Description>
          </div>
        </Section>
        <Section>
          <div>
            <SectionTitle>Steps to buying DPI</SectionTitle>
            <SectionSubTitle>
              Option 1: Buy DPI in your wallet (e.g. Argent, Dharma).
            </SectionSubTitle>
            <Description>
              For the purposes of this option, we’ll use Dharma as the reference
              point wallet on iPhone in the U.S. However, the user journey is
              fairly similar for other app stores, wallets, and locations too.
              <ol>
                <li>
                  Open your mobile phone, enter your app store, search for
                  "Dharma", and download the app.
                </li>
                <br />
                <li>
                  Click the shopping cart icon in the bottom menu, then search
                  for ‘DPI’ in the search field at the top of the screen.
                </li>
                <br />
                {doubleImage1}
                <li>
                  Check the contract address matches what is shown on&nbsp;
                  <Link
                    href={'https://www.coingecko.com/en/coins/defipulse-index'}
                  >
                    Coingecko
                  </Link>
                  and/or&nbsp;
                  <Link
                    href={
                      'https://etherscan.io/token/0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b'
                    }
                  >
                    Etherscan.
                  </Link>
                  This will help ensure you are buying the correct token.
                </li>
                <br />
                <li>
                  Click on ‘DPI’, then click ‘Buy’. To complete your purchase
                  you will need to connect your bank account or deposit crypto.
                  If you’re brand new to crypto you will not have digital assets
                  elsewhere to deposit to your Dharma wallet and you’ll need to
                  connect your bank account and exchange U.S. dollars to buy
                  DPI.
                </li>
                <br />
                {doubleImage2}
              </ol>
              <br />
              Not all payment methods are supported in all countries or states.
              Notably, bank purchases are supported in California but not New
              York.
              <br />
              <br />
              {doubleImage3}
              <br />
              Some mobile wallets don’t support direct purchases of DPI with USD
              or other fiat currencies. Most wallet providers work with payment
              processors to enable fiat on-ramps and that can lead to
              restrictions on the assets you can buy. Don’t worry, you can still
              use your mobile wallet by taking advantage of the “swap” function.
              You can follow the instructions above, but instead of DPI buy DAI,
              ETH or USDC, for example. Once your DAI, ETH or USDC is in your
              wallet you can swap it for DPI.
              <br />
              <br />
              If your mobile wallet doesn’t support crypto purchases in your
              country or state, you can move to OPTION 2, Part A in this guide.
              It will teach you how to buy DAI, ETH or USDC on a centralized
              exchange and send it to a&nbsp;
              <Link
                href={
                  'https://www.google.com/search?sxsrf=ALeKk01NxL7nslidvV4ay2Tc1wZjgwZfWQ%3A1611627619709&ei=Y3wPYMmyKtfl5NoP65WNGA&q=what+is+a+web3+crypto+wallet&oq=what+is+a+web3+crypto+wallet&gs_lcp=CgZwc3ktYWIQAzoECAAQRzoHCCMQsAIQJ1DVJVjwLmCiMGgAcAJ4AIABS4gBggWSAQIxMJgBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab&ved=0ahUKEwiJ8KDexLjuAhXXMlkFHetKAwMQ4dUDCA0&uact=5'
                }
              >
                Web3 wallet,
              </Link>
              such as&nbsp;
              <Link href={'https://metamask.io/'}>MetaMask</Link>
              or&nbsp;
              <Link href={'https://walletconnect.org/'}>WalletConnect,</Link>
              that allows you to buy tokens such as DPI. Once your assets are in
              the Web3 wallet you are just one small step away from buying DPI.
            </Description>
            <br />
            <SectionSubTitle>
              Option 2: on the Web using indexcoop.com or a decentralized
              exchange (DEX)
            </SectionSubTitle>
            <Description>
              <h4>Part A: Buy DAI, ETH, or USDC</h4>
              Before purchasing DPI, you must buy ETH, DAI, or USDC. This is
              necessary because DPI is not currently listed on centralized
              exchanges. Once DPI is listed on such exchanges you will be able
              to skip this part.
              <br />
              <ol>
                <li>
                  Open an account at a centralized exchange such as&nbsp;
                  <Link href-={'https://www.binance.com/en'}>Binance,</Link>
                  <Link href={'https://www.bitstamp.net/'}>Bitstamp,</Link>
                  <Link href={'https://www.coinbase.com/'}>Coinbase,</Link>
                  <Link href={'https://www.gemini.com/'}>Gemini,</Link>
                  or&nbsp;
                  <Link href={'https://www.kraken.com/'}>Kraken.</Link>
                </li>
                <br />
                <li>
                  Deposit fiat currency using the available payment methods.
                  E.g. - EUR, GBP, JPY, USD.
                </li>
                <br />
                <li>
                  Enter DAI, ETH, or USDC market on the exchange’s app or
                  website and buy the amount you require. E.g. - $1,000 of ETH.
                </li>
                <br />
                <li>
                  To buy DPI on the Web using indexcoop.com or a decentralized
                  exchange you’ll need to create an account with a Web3 wallet
                  such as&nbsp;
                  <Link href={'https://metamask.io/'}>MetaMask</Link>
                  or&nbsp;
                  <Link href={'https://walletconnect.org/'}>
                    WalletConnect,
                  </Link>
                  then send DAI, ETH, or USDC from your centralized exchange to
                  your Metamask or WalletConnect address.&nbsp;
                  <Link href={'https://boxmining.com/metamask-tutorial/'}>
                    Here’s a great tutorial on setting up a Metamask account and
                    also depositing funds into the wallet.
                  </Link>
                </li>
              </ol>
              <br />
              Note: when you send ETH from your centralized exchange account to
              another ETH address be sure to check the address you’re sending
              the ETH to is correct. If you send your ETH to an incorrect
              address which you do not own you will not be able to get it back.
              You might want to make a small test transfer to make sure your ETH
              arrives safely before transferring larger amounts.
              <br />
              <br />
              <h4>Part B: Buy DPI</h4>
              While you can buy DPI on decentralized exchanges, such as&nbsp;
              <Link
                href={
                  'https://info.uniswap.org/pair/0x4d5ef58aac27d99935e5b6b4a6778ff292059991'
                }
              >
                Uniswap,
              </Link>
              we will show a purchase via indexcoop.com - the website managed by
              the Index Coop, the&nbsp;
              <Link
                href={
                  'https://www.google.com/search?sxsrf=ALeKk01kP0CozxN-ffaZeIb5-V7FXFTCJA%3A1611627627153&ei=a3wPYLHiCIir5NoPrqOM4AM&q=what+is+a+decentralied+anonyouns+organization&oq=what+is+a+decentralied+anonyouns+orga&gs_lcp=CgZwc3ktYWIQAxgAMgUIIRCgAToECAAQRzoFCAAQyQM6AggAOgQIIxAnOggIABDJAxCRAjoFCAAQkQI6CAgAELEDEIMBOgUIABCxAzoECAAQCjoHCAAQFBCHAjoHCAAQyQMQDToECAAQDToGCAAQFhAeOggIIRAWEB0QHjoHCCEQChCgAToECCEQCjoHCCEQChCrAjoKCCEQFhAKEB0QHlD6jAhYo9wIYPbsCGgAcAJ4AIABeYgBiRKSAQQyNi4zmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab'
                }
              >
                Decentralized Anonymous Organization (DAO)
              </Link>
              which manages DPI.
              <br />
              <ol>
                <li>
                  Visit&nbsp;
                  <Link href={'https://www.indexcoop.com'}>indexcoop.com</Link>
                  and using the navigation head to the&nbsp;
                  <Link href={'https://www.indexcoop.com/dpi'}>DPI</Link>
                  page
                </li>
                <br />
                <li>
                  Click the button in the very top right of the screen (‘Unlock
                  Wallet’) and connect your wallet (e.g. - MetaMask or
                  WalletConnect) by logging in with your password.
                </li>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    style={{
                      marginLeft: '-40px',
                      marginRight: '0px',
                      width: '100%',
                    }}
                    src={
                      'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-1.png'
                    }
                  />
                </div>
                <br />
                <li>
                  Populate the Buy / Sell widget with the amount of DPI you
                  would like to buy, review your transaction, then click ‘Buy’.
                  You can still choose not to buy at a later step.
                  <br />
                  <br />
                  In this example, we’re seeking to buy 0.2 ETH’s worth of DPI.
                </li>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    style={{
                      marginLeft: '-40px',
                      marginRight: '0px',
                      width: '100%',
                    }}
                    src={
                      'https://index-dao.s3.amazonaws.com/dpi-how-to-buy/dpi-how-to-buy-2.png'
                    }
                  />
                </div>
                <br />
                <li>
                  The Index Coop website will then prompt your wallet, which
                  will present you with an option to confirm or reject the
                  transaction. Different wallets will present this option fairly
                  similarly, but this is your final chance to reject the
                  transaction before exchanging ETH for DPI.
                </li>
                <br />
                <li>
                  Click to confirm the transaction. In a few moments your new
                  holding of DPI will appear in your wallet. The settlement time
                  of the transaction time can take a little longer when there is
                  a lot of demand on the Ethereum network.
                </li>
              </ol>
              <br />
              Congratulations! You now own DPI and are part of&nbsp;
              <Link
                href={
                  'https://explore.duneanalytics.com/dashboard/index-coop-community'
                }
              >
                a growing community of holders.
              </Link>
              We hope this will be the first of many assets you buy via Index
              Coop.
              <br />
              <br />
              Now that you hold DPI in your Web3 wallet you may find it easier
              to manage DPI and any other assets through a portfolio tracker
              like&nbsp;
              <Link href={'https://gnosis-safe.io/'}>Gnosis</Link>
              or&nbsp;
              <Link href={'https://app.zerion.io/'}>Zerion.</Link>
              These applications let you simply track or connect a wallet and
              view gain/loss, portfolio allocations and you can even buy or sell
              through them You may also wish to transfer your DPI holdings from
              your Web3 wallet to a more secure&nbsp;
              <Link
                href={
                  'https://www.google.com/search?sxsrf=ALeKk00iRF14cd4kv_qjdR7cO2KyPMka5w%3A1611027755026&ei=K1UGYKiXAajt5gLy9I_wDw&q=best+cold+wallet+cryptocurrency&oq=best+cold+wallet+cryptocurrency&gs_lcp=CgZwc3ktYWIQAzIJCAAQyQMQFhAeMgYIABAWEB46BAgAEEc6CggjELACEMkDECc6CAgAEAgQDRAeUOgEWJ0MYKQOaABwAngAgAHfAYgBhwiSAQUxLjUuMZgBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab&ved=0ahUKEwjo2L6IiqfuAhWotlkKHXL6A_4Q4dUDCA0&uact=5'
                }
              >
                "cold" wallet.
              </Link>
            </Description>
          </div>
        </Section>
      </Container>
    </Page>
  )
}

const Section = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0px;
  @media (max-width: 768px) {
    font-size: 36px;
    flex-direction: column;
    justify-content: center;
  }
`

const AboutTitle = styled.p`
  font-size: 72px;
  font-weight: 600;
  line-height: 1.1;
  @media (max-width: 768px) {
    font-size: 66px;
  }
`

const HighlightedHeader = styled.span`
  font-size: 72px;
  line-height: 1.1;
  color: #a9a7ff;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 66px;
  }
`

const SectionTitle = styled.p`
  font-size: 48px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 40px;
  margin-top: 0px;
  @media (max-width: 768px) {
    font-size: 48px;
    margin-top: 20px;
  }
`

const SectionSubTitle = styled.p`
  font-size: 24px;
  display: inline;
  line-height: 1.1;
  padding-bottom: 5px;
  border-bottom: 3px solid #a9a7ff;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const Image = styled.img`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  min-width: 250px;
  max-width: 100%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const HeaderImage = styled.img`
  position: relative;
  top: -50px;
  z-index: -1;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const Description = styled.p`
  font-size: 24px;
  line-height: 1.4;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 40px;
  }
`

const Link = styled.a`
  text-decoration: none;
  padding-right: 5px;
  color: #a9a7ff;
  display: inline-block;
`

export default HowToBuy
