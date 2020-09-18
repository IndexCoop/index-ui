import React, { useMemo } from 'react'
import { createTheme, ThemeProvider } from 'react-neu'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { UseWalletProvider } from 'use-wallet'

import TopBar from 'components/TopBar'

import { BalancesProvider } from 'contexts/Balances'
import { FarmingProvider } from 'contexts/Farming'
import { MigrationProvider } from 'contexts/Migration'
import YamProvider from 'contexts/YamProvider'

import Farm from 'views/Farm'
import Home from 'views/Home'
import Migrate from 'views/Migrate'

const App: React.FC = () => {
  return (
    <Router>
      <Providers>
        <TopBar onPresentMobileMenu={() => {}} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/farm">
            <Farm />
          </Route>
          <Route exact path="/migrate">
            <Migrate />
          </Route>
        </Switch>
      </Providers>
    </Router>
  )
}

const Providers: React.FC = ({ children }) => {
  const theme = useMemo(() => {
    return createTheme({
      baseColor: { h: 338, s: 100, l: 41 },
      borderRadius: 28,
    })
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        <YamProvider>
          <BalancesProvider>
            <FarmingProvider>
              <MigrationProvider>
                {children}
              </MigrationProvider>
            </FarmingProvider>
          </BalancesProvider>
        </YamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default App
