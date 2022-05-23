// React
import { FC, useState, useMemo } from 'react'

// Interfaces
import { PokemonUtilities } from '@interfaces'

// Hooks
import useMounted from '@hooks/useMounted'

// API
import getPokemonUtilities from '@api/getPokemonUtilities'

// Components
import Tabs from '@common/Tabs'
import Image from '@common/Image'
import Moves from './Moves'
import Stats from './Stats'
import Localization from './Localization'

const egg = require('@assets/img/pk-tabs/egg.webp')
const moves = require('@assets/img/pk-tabs/moves.webp')
const location = require('@assets/img/pk-tabs/location.webp')

const Utilities: FC<PokemonUtilities> = ({ pokemon, extraProps }) => {
  const [utilities, setUtilities] = useState<any>({})

  const pk = {
    ...pokemon,
    description: utilities.description,
  }

  // Tabs para mostrar distinta información del pokemon
  const tabs = useMemo(
    () => [
      {
        label: 'moves',
        value: <Image url={moves} name="Pokemon Moves" alt="egg" className="pk-tab-img" />,
        content: <Moves pokemon={pk} extraProps={extraProps} />,
      },
      {
        label: 'basic-data',
        value: <Image url={egg} name="Pokemon Statistics" alt="egg" className="pk-tab-img" />,
        content: <Stats pokemon={pk} extraProps={extraProps} />,
      },
      {
        label: 'basic-maita',
        value: <Image url={location} name="Pokemon Location" alt="egg" className="pk-tab-img" />,
        content: <Localization places={utilities.localizations} heldItems={pokemon.heldItems} specialAbilities={pokemon.specialAbilities} />,
      },
    ],
    [utilities, pokemon],
  )

  useMounted(() => {
    getPokemonUtilities({
      language: 'en',
      setUtilities: setUtilities,
      urls: [pokemon.location_area_encounters, `https://pokeapi.co/api/v2/characteristic/${pokemon.id}`],
    })
  }, [])

  return <Tabs items={tabs} />
}

export default Utilities
