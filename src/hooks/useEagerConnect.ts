import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { injected } from 'utils/connectors'
import useMediaQuery from './useMediaQuery'

export default function useEagerConnect(
  connect: (walletType: string) => Promise<void>
) {
  const { active } = useWeb3React()
  const [tried, setTried] = useState(false)
  const { isMobile } = useMediaQuery()

  // then, if that fails, try connecting to an injected connector
  useEffect(() => {
    if (!active && !tried) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          connect('injected').catch(() => {
            setTried(true)
          })
        } else {
          if (isMobile) {
            connect('injected').catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        }
      })
    }
  }, [connect, active, tried])

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}
