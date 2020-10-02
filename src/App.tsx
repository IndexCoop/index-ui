import React, { useCallback, useMemo, useState } from 'react'
import { ThemeProvider } from 'react-neu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UseWalletProvider } from 'use-wallet'
import { ToastContainer, Slide } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import 'react-toastify/dist/ReactToastify.css';

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'

import { BalancesProvider } from 'contexts/Balances'
import { AirdropProvider } from 'contexts/Airdrop'
import { ExternalAirdropProvider } from 'contexts/ExternalAirdrop'
import { FarmingProvider } from 'contexts/Farming'
import { PricesProvider } from 'contexts/Prices'
import YamProvider from 'contexts/YamProvider'

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
      <UseWalletProvider
        chainId={Number(process.env.REACT_APP_ETHEREUM_NETWORK_ID)}
        connectors={{
          walletconnect: { rpcUrl: process.env.REACT_APP_ETHEREUM_RPC_URL as any},
        }}
      >
        <ApolloProvider client={graphqlClient}>
          <AirdropProvider>
            <ExternalAirdropProvider>
              <YamProvider>
                <PricesProvider>
                  <BalancesProvider>
                    <FarmingProvider>
                      {children}
                    </FarmingProvider>
                  </BalancesProvider>
                </PricesProvider>
              </YamProvider>
            </ExternalAirdropProvider>
          </AirdropProvider>
        </ApolloProvider>
      </UseWalletProvider>
      <ToastContainer
        transition={Slide}
        position="bottom-left"
      />
    </ThemeProvider>
  )
}

export default App
