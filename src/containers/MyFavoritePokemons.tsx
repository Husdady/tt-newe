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

const gengar = require('@assets/img/pokemons/gengar.gif')

const MyFavoritePokemons = () => {
  const { favoritePokemons } = usePokemon()

  // Renderizar pokemones
  const renderPokemons = useCallback((pokemon: PokemonProps) => {
    return <Pokemon {...pokemon} />
  }, [])

  const emptyPokemons = isEmptyArray(favoritePokemons)

  // Pokemones vacíos
  if (emptyPokemons) {
    return <Empty image={gengar} title="Oh no, a Gengar has appeared" message="Be very careful, adventurous, Gengars can be dangerous, that's why I never add it to my favorite pokemon" />
  }

  return <PokemonWrapper items={favoritePokemons} renderItem={renderPokemons} />
}

export default MyFavoritePokemons
