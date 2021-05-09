import React from 'react'
import useFinixPrice from '../../hooks/useFinixPrice'

const DisplayPrice = () => {
  const finixPrice = useFinixPrice()

  return <div>Definix Price: {finixPrice}</div>
}
export default DisplayPrice
