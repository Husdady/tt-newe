// React
import { useContext } from 'react'

// Context
import PokemonContext from '@context/Pokemon.Context'

// Hook para obtener el contexto de los pokemones
export default function usePokemon() {
  const context = useContext(PokemonContext)
  return context
}
