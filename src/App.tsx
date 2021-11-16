import React, { useCallback, useMemo, useState } from 'react'
import { ThemeProvider } from 'react-neu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import { ChainId, DAppProvider, Config } from '@usedapp/core'

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'

import { MediaQueryProvider } from 'contexts/MediaQuery'
import { BalancesProvider } from 'contexts/Balances'
import { AirdropProvider } from 'contexts/Airdrop'
import { ExternalAirdropProvider } from 'contexts/ExternalAirdrop'
import { FarmingProvider } from 'contexts/Farming'
import { FarmingTwoProvider } from 'contexts/FarmingTwo'
import { MviStakingRewardsProvider } from 'contexts/MviStakingRewards'
import { PricesProvider } from 'contexts/Prices'
import { WalletProvider } from 'contexts/Wallet'
import { BuySellProvider } from 'contexts/BuySell'
import { Eth2xFliTokenMarketDataProvider } from 'contexts/Eth2xFliTokenMarketData'
import { Eth2xFliTokenSupplyCapProvider } from 'contexts/Eth2xFliTokenSupplyCap'
import { Btc2xFliTokenMarketDataProvider } from 'contexts/Btc2xFliTokenMarketData'
import { Btc2xFliTokenSupplyCapProvider } from 'contexts/Btc2xFliTokenSupplyCap'
import { DpiTokenMarketDataProvider } from 'contexts/DpiTokenMarketData'
import { MviTokenMarketDataProvider } from 'contexts/MviTokenMarketData'
import { IndexTokenMarketDataProvider } from 'contexts/IndexTokenMarketData'
import { TransactionWatcherProvider } from 'contexts/TransactionWatcher'
import { V3FarmingProvider } from 'contexts/V3Farming'
import { BedTokenMarketDataProvider } from 'contexts/BedTokenMarketData'
import { StreamingFeeProvider } from 'contexts/StreamingFee'
import { TokenSupplyProvider } from 'contexts/TokenSupply'
import { DataTokenMarketDataProvider } from 'contexts/DataTokenMarketData'
import { SetComponentsProvider } from 'contexts/SetComponents'

import useLocalStorage from 'hooks/useLocalStorage'

import Farm from 'views/Farm'
import DPI from 'views/DPI'
import ETH2XFLI from 'views/ETH2XFLI'
import BTC2XFLI from 'views/BTC2XFLI'
import MVI from 'views/MVI'
import BED from 'views/BED'
import DATA from 'views/DATA'
import INDEX from 'views/INDEX'
import { discordLink } from 'constants/externalLinks'

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
              <INDEX title={'Index - Index'} />
            </Route>
            <Route exact path='/dpi'>
              <DPI title={'Index - DPI'} />
            </Route>
            <Route exact path='/mvi'>
              <MVI title={'Index - MVI'} />
            </Route>
            <Route exact path='/ethfli'>
              <ETH2XFLI title={'Index - ETH2xFLI'} />
            </Route>
            <Route exact path='/btcfli'>
              <BTC2XFLI title={'Index - BTC2xFLI'} />
            </Route>
            <Route exact path='/bed'>
              <BED title={'Index - BED'} />
            </Route>
            <Route exact path='/data'>
              <DATA title={'Index - DATA'} />
            </Route>
            <Route exact path='/index'>
              <INDEX title={'Index - Index'} />
            </Route>
            <Route exact path='/liquidity-mining'>
              <Farm title={'Index - Liquidity Mining'} />
            </Route>
            <Route
              exact
              path='/join'
              render={() => (window.location.href = discordLink)}
            />
            <Route
              exact
              path='/discord'
              render={() => (window.location.href = discordLink)}
            />
          </Switch>
        </StyledBackgroundDiv>
      </Providers>
    </Router>
  )
}

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
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
          <DAppProvider config={config}>
            <ApolloProvider client={graphqlClient}>
              <MediaQueryProvider>
                <AirdropProvider>
                  <ExternalAirdropProvider>
                    <BalancesProvider>
                      <FarmingProvider>
                        <FarmingTwoProvider>
                          <MviStakingRewardsProvider>
                            <PricesProvider>
                              <BuySellProvider>
                                <Eth2xFliTokenMarketDataProvider>
                                  <Eth2xFliTokenSupplyCapProvider>
                                    <Btc2xFliTokenMarketDataProvider>
                                      <Btc2xFliTokenSupplyCapProvider>
                                        <DpiTokenMarketDataProvider>
                                          <MviTokenMarketDataProvider>
                                            <BedTokenMarketDataProvider>
                                              <DataTokenMarketDataProvider>
                                                <IndexTokenMarketDataProvider>
                                                  <V3FarmingProvider>
                                                    <StreamingFeeProvider>
                                                      <TokenSupplyProvider>
                                                        <SetComponentsProvider>
                                                          {children}
                                                        </SetComponentsProvider>
                                                      </TokenSupplyProvider>
                                                    </StreamingFeeProvider>
                                                  </V3FarmingProvider>
                                                </IndexTokenMarketDataProvider>
                                              </DataTokenMarketDataProvider>
                                            </BedTokenMarketDataProvider>
                                          </MviTokenMarketDataProvider>
                                        </DpiTokenMarketDataProvider>
                                      </Btc2xFliTokenSupplyCapProvider>
                                    </Btc2xFliTokenMarketDataProvider>
                                  </Eth2xFliTokenSupplyCapProvider>
                                </Eth2xFliTokenMarketDataProvider>
                              </BuySellProvider>
                            </PricesProvider>
                          </MviStakingRewardsProvider>
                        </FarmingTwoProvider>
                      </FarmingProvider>
                    </BalancesProvider>
                  </ExternalAirdropProvider>
                </AirdropProvider>
              </MediaQueryProvider>
            </ApolloProvider>
          </DAppProvider>
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
