import { Currency } from 'definixswap-sdk'
import React, { useMemo } from 'react'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'

const DisplayLP = () => {
  const { account } = useActiveWeb3React()
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])

  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  return (
    <ul>
      {Object.keys(v2PairsBalances).map((pair) => {
        const pool = tokenPairsWithLiquidityTokens.find((i) => i.liquidityToken.address === pair)
        return (
          <li key={pair}>
            {pool?.tokens[0].symbol}/{pool?.tokens[1].symbol} = {v2PairsBalances[pair]?.toSignificant()}
          </li>
        )
      })}
    </ul>
  )
}
export default DisplayLP
