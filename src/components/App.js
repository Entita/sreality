import React from 'react'
import { WrapperStyled } from './App.style'
import { Config } from './Config'
import { Calculations } from './Calculations'

export const App = () => {
  const [page, setPage] = React.useState(0)
  const [result, setResult] = React.useState()

  return (
    <WrapperStyled page={page}>
      <Config setPage={setPage} setResult={setResult} />
      <Calculations setPage={setPage} result={result} />
    </WrapperStyled>
  )
}
