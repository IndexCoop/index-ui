import React, { useCallback, useMemo, useState } from 'react'
import { ThemeProvider } from 'react-neu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'

import { BalancesProvider } from 'contexts/Balances'
import { AirdropProvider } from 'contexts/Airdrop'
import { ExternalAirdropProvider } from 'contexts/ExternalAirdrop'
import { FarmingProvider } from 'contexts/Farming'
import { PricesProvider } from 'contexts/Prices'
import { MarketDataProvider } from 'contexts/MarketData'
import { WalletProvider } from 'contexts/Wallet'

import useLocalStorage from 'hooks/useLocalStorage'

import ComingSoon from 'views/ComingSoon'
import Farm from 'views/Farm'
import FAQ from 'views/FAQ'
import Home from 'views/Home'

import createTheme from 'utils/createCustomTheme'
import graphqlClient from 'utils/graphql'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  if (process.env.REACT_APP_LAUNCHED === 'false') {
    return (
      <Providers>
        <ComingSoon />
      </Providers>
    );
  }

  return (
    <Router>
      <Providers>
        <StyledBackgroundDiv>
          <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
          <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/farm'>
              <Farm />
            </Route>
            <Route path='/faq'>
              <FAQ />
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
      <WalletProvider>
        <ApolloProvider client={graphqlClient}>
          <AirdropProvider>
            <ExternalAirdropProvider>
              <PricesProvider>
                <BalancesProvider>
                  <FarmingProvider>
										<MarketDataProvider>
											{children}
										</MarketDataProvider>
                  </FarmingProvider>
                </BalancesProvider>
              </PricesProvider>
            </ExternalAirdropProvider>
          </AirdropProvider>
        </ApolloProvider>
      </WalletProvider>
      <ToastContainer
        transition={Slide}
        position="bottom-left"
      />
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
