// React
import { FC, memo } from 'react'

// Types
import { PokemonTypesProps } from '@interfaces'

const Types: FC<PokemonTypesProps> = ({ items }) => {
  const renderTypes = items.map((type, i) => {
    const typeStyle = {
      backgroundColor: `var(--bs-${type})`,
    }

    return (
      <li key={`${i + 1}`} style={typeStyle} className="type rounded-pill m-1 user-select-none">
        {type}
      </li>
    )
  })

  return <ul className="types d-flex align-items-center justify-content-center px-4">{renderTypes}</ul>
}

export default memo(Types)
