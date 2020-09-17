import React from 'react'
import { createTheme, ThemeProvider } from 'react-neu'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { UseWalletProvider } from 'use-wallet'

import TopBar from 'components/TopBar'

import Farm from 'views/Farm'
import Home from 'views/Home'
import Migrate from 'views/Migrate'

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={createTheme({
        baseColor: { h: 338, s: 100, l: 41 },
        borderRadius: 28,
      })}>
        <UseWalletProvider
          chainId={1}
          connectors={{
            walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
          }}
        >
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
        </UseWalletProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
