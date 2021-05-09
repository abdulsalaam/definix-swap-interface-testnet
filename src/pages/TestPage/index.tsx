import React from 'react'
import { useActiveWeb3React } from '../../hooks'
import DisplayBalance from './DisplayBalance'
import DisplayLP from './DisplayLP'
import DisplayPrice from './DisplayPrice'

const TestPage = () => {
  const { account } = useActiveWeb3React()
  return (
    <div>
      <p>Account: {account}</p>
      <br />
      <p>My Balance</p>
      <DisplayBalance />
      <br />
      <p>My LiquidityPool</p>
      <DisplayLP />
      <br />
      <DisplayPrice />
    </div>
  )
}
export default TestPage
