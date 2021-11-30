import Select from 'react-select'
import useChainData from 'hooks/useChainData'

export const ChainSelector = () => {
  const { chain, setMainnet, setPolygon } = useChainData()

  return (
    <Select
      isSearchable={false}
      value={{ label: chain.name } as any}
      onChange={(chain) => {
        if (chain.value === 'polygon') setPolygon()
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
      ]}
    />
  )
}

export default ChainSelector
