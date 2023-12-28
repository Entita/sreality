export const amountFormatter = (amount) =>
  `${Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')} Kč`

export const numberFormatter = (amount) =>
  `${Number(amount).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$& ').slice(0, -2)}`
