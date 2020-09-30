import { createContext } from 'react'

interface AirdropContextValues {
  dpiPrice?: string
  totalUSDInFarms?: number
}

const AirdropContext = createContext<AirdropContextValues>({})

export default AirdropContext