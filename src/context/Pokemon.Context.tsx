// React
import { createContext } from 'react'

// Interfaces
import { PokemonContextState } from '@interfaces'

const PokemonContext = createContext<PokemonContextState>({} as PokemonContextState)

export default PokemonContext
