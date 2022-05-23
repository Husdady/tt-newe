// React
import { FC, Suspense, lazy, memo } from 'react'

// Librarys
import Skeleton from '@mui/material/Skeleton'

// Types
import { PokemonProps, PokemonFallbackProps } from '@interfaces'

// Utils
import { capitalize } from '@utils/Helper'

// Components
import Image from '@common/Image'

const Heart = lazy(() => import('@layouts/Accesories/Heart'))
const Types = lazy(() => import('./Types'))
const Utilities = lazy(() => import('./Utilities'))

const heartStyle = {
  top: 15,
  right: 15,
}

const Pokemon: FC<PokemonProps> = ({ name, order, types, moves, defaultImage, ...moreProps }) => {
  const pkName = capitalize(name)
  const altImg = `pokemon-${name}`
  const pokemonStyle = {
    background: `linear-gradient(55deg, rgba(0, 0, 0, .85) 25%, var(--bs-${types[0]}))`,
  }

  const pk = {
    name: pkName,
    moves: moves,
    order: order,
    types: types,
    defaultImage: defaultImage,
    ...moreProps,
  }

  const utilitiesMoreProps = {
    mode: moreProps.mode,
    showPokeballs: moreProps.showPokeballs,
  }

  return (
    <Suspense fallback={<Fallback mainPokemonType={types[0]} />}>
      <article className="pokemon w-100 press-start-2p position-relative overflow-hidden" style={pokemonStyle}>
        {/* Ícono de corazón */}
        <Heart pokemon={pk} className="position-absolute" style={heartStyle} />

        {/* Imagen del pokemon */}
        <figure className="d-flex justify-content-center mb-0">
          <Image url={defaultImage} name={pkName} alt={altImg} className="pk-img" />
        </figure>

        {/* Naturaleza del pokemon */}
        <Types items={types} />

        {/* Orden del pokemon */}
        <span className="order position-absolute">#{order}</span>

        {/* Tabs */}
        <Utilities pokemon={pk} extraProps={utilitiesMoreProps} />
      </article>
    </Suspense>
  )
}

export default memo(Pokemon)

Pokemon.defaultProps = {
  mode: null,
  showPokeballs: true,
}

// <------------------------ Extra Components ------------------------>
export const Fallback: FC<PokemonFallbackProps> = ({ mainPokemonType }) => {
  const fallbackStyle = {
    borderRadius: '.5em',
    background: `linear-gradient(55deg, rgba(0, 0, 0, .85) 25%, var(--bs-${mainPokemonType}))`,
  }

  return <Skeleton variant="rectangular" animation="wave" width="100%" height={650} style={fallbackStyle} className="shadow-opacity-dark" />
}
