// React
import React from 'react'

// Librarys
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'

// Interfaces
import { CounterProps } from '@interfaces'

const iconStyle = {
  backgroundColor: 'var(--bs-warning)',
}

const inputStyle = {
  width: 40,
  height: 20,
  outline: 'none',
  fontSize: '.5em',
  color: 'var(--bg-gray-100)',
  backgroundColor: 'var(--bs-gray-900)',
}

const Counter = React.forwardRef(({ defaultValue }: CounterProps, ref) => {
  const [max, setMax] = React.useState<number>(defaultValue)
  const [count, setCount] = React.useState<number>(defaultValue)

  // Aumentar contador en 1
  const increaseCount = React.useCallback(() => {
    if (count >= max) return

    setCount((currentCount) => currentCount + 1)
  }, [count])

  // Disminuir contador en 1
  const decreaseCount = React.useCallback(() => {
    if (count <= 1) return
    setCount((currentCount) => currentCount - 1)
  }, [count])

  // Comprobar si es un valor numérico
  const handleNumericValues = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const regx = /[0-9]/
    const isNumericValue = regx.test(e.key)

    // Si no es un valor numérico, prevenir comportamiento por defecto
    if (!isNumericValue) e.preventDefault()
  }, [])

  // Evento 'onChange' que actualiza el valor del contador
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Obtener el valor actual
      const currentValue = Number(e.target.value)
      const isGreaterThanMinValue = currentValue >= 1
      const isLessThanMaxValue = currentValue <= defaultValue

      // Comprobar si el valor actual está entre los valores permitidos
      const isBetweenTheValidValues = isGreaterThanMinValue && isLessThanMaxValue
      if (!isBetweenTheValidValues) return

      // Setear nuevo contador
      setCount(currentValue)
    },
    [count],
  )

  // Hook para obtener el estado del contador desde otro componente
  React.useImperativeHandle(ref, () => ({
    count: count,
    setCount: setCount,
    max: max,
    setMax: setMax,
  }))

  return (
    <div className="w-100 d-flex align-items-center justify-content-center mb-2 text-center">
      {/* Ícono para aumentar el contador */}
      <AddBoxIcon role="button" onClick={increaseCount} className="scale shadow-opacity-dark" style={iconStyle} />

      {/* Valor del contador */}
      <input type="number" className="d-table text-center press-start-2p border-0" value={count} style={inputStyle} onChange={handleChange} onKeyPress={handleNumericValues} />

      {/* Ícono para disminuir el contador */}
      <IndeterminateCheckBoxIcon role="button" onClick={decreaseCount} className="scale shadow-opacity-dark" style={iconStyle} />
    </div>
  )
})

export default React.memo(Counter)
