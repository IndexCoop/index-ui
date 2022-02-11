import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { ThemeProvider } from 'react-neu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Slide, toast, ToastContainer } from 'react-toastify'

import styled from 'styled-components'

import { ApolloProvider } from '@apollo/client'
import { ChainId, Config, DAppProvider } from '@usedapp/core'

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'
import { discordLink } from 'constants/externalLinks'
import { BalancesProvider } from 'contexts/Balances'
import { BedTokenMarketDataProvider } from 'contexts/BedTokenMarketData'
import { Btc2xFliTokenMarketDataProvider } from 'contexts/Btc2xFliTokenMarketData'
import { Btc2xFliTokenSupplyCapProvider } from 'contexts/Btc2xFliTokenSupplyCap'
import { BuySellProvider } from 'contexts/BuySell'
import ChainIdProvider from 'contexts/ChainData/ChainDataProvider'
import { DataTokenMarketDataProvider } from 'contexts/DataTokenMarketData'
import { DpiTokenMarketDataProvider } from 'contexts/DpiTokenMarketData'
import { Eth2xFLIPTokenMarketDataProvider } from 'contexts/Eth2xFLIPTokenMarketData'
import { Eth2xFLIPTokenSupplyCapProvider } from 'contexts/Eth2xFLIPTokenSupplyCap'
import { Eth2xFliTokenMarketDataProvider } from 'contexts/Eth2xFliTokenMarketData'
import { Eth2xFliTokenSupplyCapProvider } from 'contexts/Eth2xFliTokenSupplyCap'
import { FarmingProvider } from 'contexts/Farming'
import { FarmingTwoProvider } from 'contexts/FarmingTwo'
import { GmiFarmingProvider } from 'contexts/GmiFarming'
import { GmiTokenMarketDataProvider } from 'contexts/GmiTokenMarketData'
import { IEthFLIPTokenMarketDataProvider } from 'contexts/IEthFLIPTokenMarketData'
import { IEthFLIPTokenSupplyCapProvider } from 'contexts/IEthFLIPTokenSupplyCap'
import { IMaticFLIPTokenMarketDataProvider } from 'contexts/IMaticFLIPTokenMarketData'
import { IMaticFLIPTokenSupplyCapProvider } from 'contexts/IMaticFLIPTokenSupplyCap'
import { IndexTokenMarketDataProvider } from 'contexts/IndexTokenMarketData'
import { Matic2xFLIPTokenMarketDataProvider } from 'contexts/Matic2xFLIPTokenMarketData'
import { Matic2xFLIPTokenSupplyCapProvider } from 'contexts/Matic2xFLIPTokenSupplyCap'
import { MediaQueryProvider } from 'contexts/MediaQuery'
import { MviStakingRewardsProvider } from 'contexts/MviStakingRewards'
import { MviTokenMarketDataProvider } from 'contexts/MviTokenMarketData'
import { PricesProvider } from 'contexts/Prices'
import { SetComponentsProvider } from 'contexts/SetComponents'
import { StreamingFeeProvider } from 'contexts/StreamingFee'
import { TokenSupplyProvider } from 'contexts/TokenSupply'
import { TransactionWatcherProvider } from 'contexts/TransactionWatcher'
import { V3FarmingProvider } from 'contexts/V3Farming'
import { WalletProvider } from 'contexts/Wallet'
import useLocalStorage from 'hooks/useLocalStorage'
import useWallet from 'hooks/useWallet'
import createTheme from 'utils/createCustomTheme'
import graphqlClient from 'utils/graphql'
import BED from 'views/BED'
import BTC2XFLI from 'views/BTC2XFLI'
import DATA from 'views/DATA'
import DPI from 'views/DPI'
import ETH2XFLI from 'views/ETH2XFLI'
import ETH2XFLIP from 'views/ETH2XFLIP'
import Farm from 'views/Farm'
import GMI from 'views/GMI'
import IETHFLIP from 'views/IETHFLIP'
import IMATICFLIP from 'views/IMATICFLIP'
import INDEX from 'views/INDEX'
import MATIC2XFLIP from 'views/MATIC2XFLIP'
import MVI from 'views/MVI'

import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  const { account } = useWallet()

  useEffect(() => {
    if (!account)
      toast.warn('Connect a wallet for the best experience', {
        toastId: 'connect-wallet',
        autoClose: 6000,
        closeOnClick: true,
        pauseOnHover: true,
      })
  }, [])

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
              <DPI title={'Index - DPI'} />
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
            <Route exact path='/ethflip'>
              <ETH2XFLIP title={'Index - ETH2xFLI-P'} />
            </Route>
            <Route exact path='/btcfli'>
              <BTC2XFLI title={'Index - BTC2xFLI'} />
            </Route>
            <Route exact path='/bed'>
              <BED title={'Index - BED'} />
            </Route>
            <Route exact path='/gmi'>
              <GMI title={'Index - GMI'} />
            </Route>
            <Route exact path='/data'>
              <DATA title={'Index - DATA'} />
            </Route>
            <Route exact path='/ieth'>
              <IETHFLIP title={'Index - iETH-FLI-P'} />
            </Route>
            <Route exact path='/matic2x'>
              <MATIC2XFLIP title={'Index - MATIC2x-FLI-P'} />
            </Route>
            <Route exact path='/imatic'>
              <IMATICFLIP title={'Index - iMATIC-FLI-P'} />
            </Route>
            <Route exact path='/index'>
              <INDEX title={'Index - Index'} />
            </Route>
            <Route exact path='/liquidity-mining'>
              <Farm title={'Index - Liquidity Mining'} />
            </Route>
            <Route exact path='/join' render={() => (window.location.href = discordLink)} />
            <Route exact path='/discord' render={() => (window.location.href = discordLink)} />
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
            <ChainIdProvider>
              <ApolloProvider client={graphqlClient}>
                <MediaQueryProvider>
                  <BalancesProvider>
                    <FarmingProvider>
                      <FarmingTwoProvider>
                        <MviStakingRewardsProvider>
                          <PricesProvider>
                            <BuySellProvider>
                              <Eth2xFLIPTokenMarketDataProvider>
                                <Eth2xFLIPTokenSupplyCapProvider>
                                  <IEthFLIPTokenMarketDataProvider>
                                    <IEthFLIPTokenSupplyCapProvider>
                                      <Matic2xFLIPTokenMarketDataProvider>
                                        <Matic2xFLIPTokenSupplyCapProvider>
                                          <IMaticFLIPTokenMarketDataProvider>
                                            <IMaticFLIPTokenSupplyCapProvider>
                                              <Eth2xFliTokenMarketDataProvider>
                                                <Eth2xFliTokenSupplyCapProvider>
                                                  <Btc2xFliTokenMarketDataProvider>
                                                    <Btc2xFliTokenSupplyCapProvider>
                                                      <DpiTokenMarketDataProvider>
                                                        <MviTokenMarketDataProvider>
                                                          <BedTokenMarketDataProvider>
                                                            <GmiTokenMarketDataProvider>
                                                              <DataTokenMarketDataProvider>
                                                                <IndexTokenMarketDataProvider>
                                                                  <V3FarmingProvider>
                                                                    <GmiFarmingProvider>
                                                                      <StreamingFeeProvider>
                                                                        <TokenSupplyProvider>
                                                                          <SetComponentsProvider>
                                                                            {
                                                                              children
                                                                            }
                                                                          </SetComponentsProvider>
                                                                        </TokenSupplyProvider>
                                                                      </StreamingFeeProvider>
                                                                    </GmiFarmingProvider>
                                                                  </V3FarmingProvider>
                                                                </IndexTokenMarketDataProvider>
                                                              </DataTokenMarketDataProvider>
                                                            </GmiTokenMarketDataProvider>
                                                          </BedTokenMarketDataProvider>
                                                        </MviTokenMarketDataProvider>
                                                      </DpiTokenMarketDataProvider>
                                                    </Btc2xFliTokenSupplyCapProvider>
                                                  </Btc2xFliTokenMarketDataProvider>
                                                </Eth2xFliTokenSupplyCapProvider>
                                              </Eth2xFliTokenMarketDataProvider>
                                            </IMaticFLIPTokenSupplyCapProvider>
                                          </IMaticFLIPTokenMarketDataProvider>
                                        </Matic2xFLIPTokenSupplyCapProvider>
                                      </Matic2xFLIPTokenMarketDataProvider>
                                    </IEthFLIPTokenSupplyCapProvider>
                                  </IEthFLIPTokenMarketDataProvider>
                                </Eth2xFLIPTokenSupplyCapProvider>
                              </Eth2xFLIPTokenMarketDataProvider>
                            </BuySellProvider>
                          </PricesProvider>
                        </MviStakingRewardsProvider>
                      </FarmingTwoProvider>
                    </FarmingProvider>
                  </BalancesProvider>
                </MediaQueryProvider>
              </ApolloProvider>
            </ChainIdProvider>
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
