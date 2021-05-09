import React, { useEffect, useMemo } from 'react'
import { Currency } from 'definixswap-sdk'
import { useActiveWeb3React } from '../../hooks'
import { useAllTokens, useToken } from '../../hooks/Tokens'
import { useCurrencyBalance } from '../../state/wallet/hooks'

const DisplayBalance = () => {
  const { account } = useActiveWeb3React()
  const allTokens = useAllTokens()

  const getBalance = (currency: Currency) => {
    const balance = useCurrencyBalance(account ?? undefined, currency)
    return balance
  }

  const ethBalance = getBalance(Currency.ETHER)

  return (
    <ul>
      <li>
        {Currency.ETHER.symbol} = {ethBalance?.toSignificant()}
      </li>
      {Object.keys(allTokens).map((token) => {
        const currency: Currency = allTokens[token]
        const balance = getBalance(currency)
        return (
          <li key={token}>
            {allTokens[token].symbol} = {balance?.toSignificant()}
          </li>
        )
      })}
    </ul>
  )
}
export default DisplayBalance
