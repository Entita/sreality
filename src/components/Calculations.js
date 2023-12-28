import React from 'react'
import { Button } from '@mui/material'
import { GridWrapperStyled, ResultWrapperStyled } from './Calculations.style'
import { numberFormatter, amountFormatter } from '@/utils/util'

export const Calculations = ({ setPage, result }) => {
  const calculations = React.useMemo(() => {
    if (!result) {
      return {
        totalObjects: 0,
        totalValue: 0,
        totalSize: 0,
        averagePerM: 0,
      }
    }

    let totalValue = 0
    let totalSize = 0
    result.estates.forEach((object) => {
      const temp = object.name.split(' ')
      const temp2 = temp[temp.length - 2].split(' ')
      const size = Number(temp2[temp2.length - 1])
      totalValue += object.price
      totalSize += size
    })
    return {
      totalObjects: result.estates.length,
      totalValue,
      totalSize,
      averagePerM: totalValue / totalSize,
    }
  }, [result])

  return (
    <ResultWrapperStyled>
      <h2>Výpočty</h2>
      <GridWrapperStyled>
        <span>Celkem objektů</span>
        <span>{numberFormatter(calculations.totalObjects)}</span>
        <span>Celkem cena</span>
        <span>{amountFormatter(calculations.totalValue)}</span>
        <span>Celkem m²</span>
        <span>{numberFormatter(calculations.totalSize)} m²</span>
        <span>Průměrná cena za m²</span>
        <span>{amountFormatter(calculations.averagePerM)}</span>
      </GridWrapperStyled>
      <Button variant='outlined' onClick={() => setPage(0)}>Zpět</Button>
    </ResultWrapperStyled>
  )
}
