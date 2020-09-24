import React, { useCallback, useMemo, useState } from 'react'
import { createTheme, ThemeProvider } from 'react-neu'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { UseWalletProvider } from 'use-wallet'

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'

import { BalancesProvider } from 'contexts/Balances'
import { FarmingProvider } from 'contexts/Farming'
import { MigrationProvider } from 'contexts/Migration'
import { VestingProvider } from 'contexts/Vesting'
import YamProvider from 'contexts/YamProvider'

import useLocalStorage from 'hooks/useLocalStorage'

import Farm from 'views/Farm'
import FAQ from 'views/FAQ'
import Home from 'views/Home'
import Migrate from 'views/Migrate'

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
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/farm">
            <Farm />
          </Route>
          <Route path="/faq">
            <FAQ />
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
  const [darkModeSetting] = useLocalStorage('darkMode', false)
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme({
      baseColor: { h: 338, s: 100, l: 41 },
      baseColorDark: { h: 339, s: 89, l: 49 },
      borderRadius: 28,
    })
  }, [])
  return (
    <ThemeProvider
      darkModeEnabled={darkModeSetting}
      darkTheme={darkTheme}
      lightTheme={lightTheme}
    >
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
                <VestingProvider>
                  {children}
                </VestingProvider>
              </MigrationProvider>
            </FarmingProvider>
          </BalancesProvider>
        </YamProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

export default App
