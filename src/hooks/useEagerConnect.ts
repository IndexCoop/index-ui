import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { injected } from 'utils/connectors'
import useMediaQuery from './useMediaQuery'

export default function useEagerConnect() {
  const { activate, active } = useWeb3React()
  const [tried, setTried] = useState(false)
  const { isMobile } = useMediaQuery()

  // then, if that fails, try connecting to an injected connector
  useEffect(() => {
    if (!active && !tried) {
      alert('Connecting eagerly')
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          if (isMobile) {
            activate(injected, undefined, true).catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        }
      })
    }
  }, [activate, active, tried])

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}
