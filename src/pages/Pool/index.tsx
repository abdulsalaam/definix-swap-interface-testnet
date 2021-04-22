import { BorderCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import PageHeader from 'components/PageHeader'
import FullPositionCard from 'components/PositionCard'
import Question from 'components/QuestionHelper'
import { RowBetween } from 'components/Row'
import { StyledInternalLink } from 'components/Shared'
import { Dots } from 'components/swap/styleds'
import TranslatedText from 'components/TranslatedText'
import { usePairs } from 'data/Reserves'
import { Pair } from 'definixswap-sdk'
import { useActiveWeb3React } from 'hooks'
import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { ThemeContext } from 'styled-components'
import { Button, CardBody, Heading, Text } from 'uikit-dev'
import { TranslateString } from 'utils/translateTextHelpers'
import AppBody from '../AppBody'

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
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

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <>
      {/* <CardNav activeIndex={1} /> */}

      <Heading as="h1" fontSize="32px !important" className="mb-6 mt-2">
        Liquidity
      </Heading>

      <AppBody>
        <PageHeader title="Add liquidity to receive LP tokens">
          <Button id="join-pool-button" as={Link} to="/add/ETH" fullWidth>
            <TranslatedText translationId={100}>Add Liquidity</TranslatedText>
          </Button>
        </PageHeader>
        <AutoColumn gap="lg" justify="center">
          <CardBody style={{ width: '100%' }}>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0.5rem 0 1.5rem 0" className="flex justify-start">
                <Heading>
                  <TranslatedText translationId={102}>Your Liquidity</TranslatedText>
                </Heading>
                <Question
                  text={TranslateString(
                    130,
                    'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'
                  )}
                />
              </RowBetween>

              {!account ? (
                <BorderCard padding="24px">
                  <Text color={theme.colors.textDisabled} textAlign="center">
                    Connect to a wallet to view your liquidity.
                  </Text>
                </BorderCard>
              ) : v2IsLoading ? (
                <BorderCard padding="24px">
                  <Text color={theme.colors.textDisabled} textAlign="center">
                    <Dots>Loading</Dots>
                  </Text>
                </BorderCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <BorderCard padding="24px">
                  <Text color="textDisabled" textAlign="center">
                    <TranslatedText translationId={104}>No liquidity found.</TranslatedText>
                  </Text>
                </BorderCard>
              )}

              <div>
                <Heading style={{ padding: '1.5rem 0 .5rem 0' }}>
                  {TranslateString(106, "Don't see a pool you joined?")}{' '}
                  <StyledInternalLink id="import-pool-link" to="/find">
                    {TranslateString(108, 'Import it.')}
                  </StyledInternalLink>
                </Heading>
              </div>
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </>
  )
}
