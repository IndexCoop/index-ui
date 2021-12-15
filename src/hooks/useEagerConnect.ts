import { useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

export default function useEagerConnect(
  connect: (walletType: string) => Promise<void>
) {
  const { active } = useWeb3React()
  const [tried, setTried] = useState(false)

  // Connect to existing injected provider if app was opened from ONTO mobile wallet
  useEffect(() => {
    if (!active && !tried && (window as any).ethereum?.isONTO) {
      connect('injected').catch(() => {
        setTried(true)
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
