import React, { useCallback, useMemo, useState } from 'react'
import { ThemeProvider } from 'react-neu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'

import { MediaQueryProvider } from 'contexts/MediaQuery'
import { BalancesProvider } from 'contexts/Balances'
import { AirdropProvider } from 'contexts/Airdrop'
import { ExternalAirdropProvider } from 'contexts/ExternalAirdrop'
import { FarmingProvider } from 'contexts/Farming'
import { FarmingTwoProvider } from 'contexts/FarmingTwo'
import { PricesProvider } from 'contexts/Prices'
import { WalletProvider } from 'contexts/Wallet'
import { BuySellProvider } from 'contexts/BuySell'
import { DpiTokenMarketDataProvider } from 'contexts/DpiTokenMarketData'
import { DpiIndexComponentsProvider } from 'contexts/DpiIndexComponents'
import { CgiTokenMarketDataProvider } from 'contexts/CgiTokenMarketData'
import { CgiIndexComponentsProvider } from 'contexts/CgiIndexComponents'
import { IndexTokenMarketDataProvider } from 'contexts/IndexTokenMarketData'
import { SnapshotProposalsProvider } from 'contexts/SnapshotProposals'
import { TransactionWatcherProvider } from 'contexts/TransactionWatcher'

import useLocalStorage from 'hooks/useLocalStorage'

import About from 'views/About'
import Farm from 'views/Farm'
import Home from 'views/Home'
import DPI from 'views/DPI'
import CGI from 'views/CGI'
import INDEX from 'views/INDEX'
import Vote from 'views/Vote'
import News from 'views/News'
import ContributorRewards from './views/ContributorRewards'
import HowToBuy from './views/HowToBuy'

import createTheme from 'utils/createCustomTheme'
import graphqlClient from 'utils/graphql'
import { RewardsProvider } from './contexts/Rewards'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Router>
      <Providers>
        <StyledBackgroundDiv>
          <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
          <MobileMenu
            onDismiss={handleDismissMobileMenu}
            visible={mobileMenu}
          />
          <Switch>
            <Route exact path='/'>
              <Home title={'Index - Home'} />
            </Route>
            <Route exact path='/dpi'>
              <DPI title={'Index - DPI'} />
            </Route>
            <Route exact path='/cgi'>
              <CGI title={'Index - CGI'} />
            </Route>
            <Route exact path='/index'>
              <INDEX title={'Index - Index'} />
            </Route>
            <Route exact path='/vote'>
              <Vote title={'Index - Vote'} />
            </Route>
            <Route exact path='/about'>
              <About title={'Index - About'} />
            </Route>
            <Route exact path='/farm'>
              <Farm title={'Index - Farm'} />
            </Route>
            <Route exact path='/rewards'>
              <ContributorRewards title={'Index - Rewards'} />
            </Route>
            <Route path='/news'>
              <News title={'Index - News'} />
            </Route>
            <Route path='/how-to-buy'>
              <HowToBuy title={'Index - How to Buy'} />
            </Route>
          </Switch>
        </StyledBackgroundDiv>
      </Providers>
    </Router>
  )
}

const Providers: React.FC = ({ children }) => {
  const [darkModeSetting] = useLocalStorage('darkMode', true)
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme()
  }, [])

  return (
    <ThemeProvider
      darkModeEnabled={darkModeSetting}
      darkTheme={darkTheme}
      lightTheme={lightTheme}
    >
      <TransactionWatcherProvider>
        <WalletProvider>
          <ApolloProvider client={graphqlClient}>
            <MediaQueryProvider>
              <AirdropProvider>
                <RewardsProvider>
                  <ExternalAirdropProvider>
                    <BalancesProvider>
                      <FarmingProvider>
                        <FarmingTwoProvider>
                          <PricesProvider>
                            <BuySellProvider>
                              <DpiTokenMarketDataProvider>
                                <DpiIndexComponentsProvider>
                                  <CgiTokenMarketDataProvider>
                                    <CgiIndexComponentsProvider>
                                      <IndexTokenMarketDataProvider>
                                        <SnapshotProposalsProvider>
                                          {children}
                                        </SnapshotProposalsProvider>
                                      </IndexTokenMarketDataProvider>
                                    </CgiIndexComponentsProvider>
                                  </CgiTokenMarketDataProvider>
                                </DpiIndexComponentsProvider>
                              </DpiTokenMarketDataProvider>
                            </BuySellProvider>
                          </PricesProvider>
                        </FarmingTwoProvider>
                      </FarmingProvider>
                    </BalancesProvider>
                  </ExternalAirdropProvider>
                </RewardsProvider>
              </AirdropProvider>
            </MediaQueryProvider>
          </ApolloProvider>
        </WalletProvider>
      </TransactionWatcherProvider>
      <ToastContainer transition={Slide} position='bottom-left' />
    </ThemeProvider>
  )
}

const StyledBackgroundDiv = styled.div`
  background: url(https://index-dao.s3.amazonaws.com/gradient_bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
`

export default App
