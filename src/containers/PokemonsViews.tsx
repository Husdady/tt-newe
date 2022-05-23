// React
import { useMemo } from 'react'

// Hooks
import usePokemon from '@hooks/usePokemon'

// Components
import Invoke from '@layouts/Accesories/Invoke'
import Pokemons from './Pokemons'
import MyPokemons from './MyPokemons'
import MyFavoritePokemons from './MyFavoritePokemons'

const PokemonsViews = () => {
  const { activeTab } = usePokemon()

  const screen: any = useMemo(
    () => ({
      pokemons: <Pokemons />,
      myPokemons: <MyPokemons />,
      favoritePokemons: <MyFavoritePokemons />,
    }),
    [],
  )

  if (activeTab === null) {
    return <Invoke />
  }

  return screen[activeTab]
}

export default PokemonsViews
