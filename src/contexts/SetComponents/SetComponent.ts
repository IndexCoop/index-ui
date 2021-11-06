import { BigNumber } from "bignumber.js";

export interface SetComponent {
    address: string

    /**
     * Token id
     * @example "uniswap"
     */
    id: string
    image: string

    /**
     * Token name
     * @example "Uniswap"
     */
    name: string
    /**
     * The percent of USD this component makes up in the Set.
     * Equivalant to totalPriceUsd / total price of set in USD
     */
    percentOfSet: string
    /**
     * The percent of USD this component makes up in the Set.
     * Equivalant to totalPriceUsd / total price of set in USD
     */
    percentOfSetNumber: BigNumber
    /**
     * Quantity of component in the Set
     */
    quantity: string
    /**
     * Token symbol
     * @example "UNI"
     */
    symbol: string
    /**
     * Total price of this component. This is equivalant to quantity of
     * component * price of component.
     */
    totalPriceUsd: string
}
