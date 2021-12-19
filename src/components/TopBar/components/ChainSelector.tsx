import Select from 'react-select'
import { useEffect, useMemo } from 'react'
import { useTheme } from 'react-neu'

import useChainData from 'hooks/useChainData'
import useWallet from 'hooks/useWallet'
import { POLYGON_CHAIN_DATA, LOCALHOST_CHAIN_DATA } from 'utils/connectors'

export const ChainSelector = () => {
  const { chain, setLocalhost, setMainnet, setPolygon } = useChainData()
  const theme = useTheme()
  const { chainId } = useWallet()

  useEffect(() => {
    if (chainId) {
      if (chainId === POLYGON_CHAIN_DATA.chainId) setPolygon()
      else if (chainId === LOCALHOST_CHAIN_DATA.chainId) setLocalhost()
      else setMainnet()
    }
  }, [chainId, setLocalhost, setMainnet, setPolygon])

  const styles = useMemo(
    () => ({
      control: (styles: any) => ({
        ...styles,
        width: 135,
        background: `rgba(0, 0, 0, 0.4)`,
        padding: 7,
        border: 'none',
        borderRadius: 14,
      }),
      singleValue: (styles: any) => ({
        ...styles,
        color: theme.textColor,
        fontWeight: 600,
        fontSize: 16,
        width: 130,
        textAlign: 'left',
      }),
      menu: (styles: any) => ({
        ...styles,
        color: 'black',
      }),
      dropdownIndicator: (styles: any) => ({
        ...styles,
        'color': theme.textColor,
        'cursor': 'pointer',
        '&:hover': {
          color: theme.textColor,
        },
      }),
      indicatorSeparator: () => ({}),
      indicatorContainer: (styles: any) => ({
        ...styles,
        marginLeft: 0,
        padding: 0,
      }),
    }),
    [theme]
  )

  return (
    <Select
      isSearchable={false}
      value={{ label: chain.name } as any}
      onChange={(chain) => {
        if (chain.value === 'polygon') setPolygon()
        else if (chain.value === 'localhost') setLocalhost()
        else setMainnet()
      }}
      options={[
        {
          value: 'ethereum',
          label: 'Ethereum',
        },
        {
          value: 'polygon',
          label: 'Polygon',
        },
        {
          value: 'localhost',
          label: 'Localhost',
        },
      ]}
      styles={styles}
    />
  )
}

export default ChainSelector
