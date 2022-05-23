// React
import { useCallback } from 'react'

// Hooks
import usePokemon from '@hooks/usePokemon'

// Interfaces
import { PokemonProps } from '@interfaces'

// Utils
import { isEmptyArray } from '@utils/Validations'

// Components
import Empty from '@common/Empty'
import Pokemon from '@layouts/Pokemon'
import { PokemonWrapper } from './Pokemons'

const buizel = require('@assets/img/pokemons/buizel.gif')

const MyPokemons = () => {
  const { myPokemons } = usePokemon()

  // Renderizar pokemones
  const renderPokemons = useCallback((pokemon: PokemonProps) => {
    return <Pokemon {...pokemon} mode="edit" showPokeballs={false} />
  }, [])

  const emptyPokemons = isEmptyArray(myPokemons)

  // Pokemones vacíos
  if (emptyPokemons) {
    return (
      <Empty
        image={buizel}
        title="You don't have captured pokemons"
        message="You have come across a Buizel, it seems that he is looking for someone to take care of him, because you do not dare to catch him?"
      />
    )
  }

  return <PokemonWrapper items={myPokemons} renderItem={renderPokemons} />
}

export default MyPokemons
