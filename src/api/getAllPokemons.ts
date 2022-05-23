// API
import getPokemons from './getPokemons'
import getPokemonInformation from './getPokemonInformation'

const URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000'

// Obtener todos los pokemones
export default async function getAllPokemons() {
  try {
    const response = await fetch(URL)
    const data = await response.json()

    // Obtener datos de la respuesta de la pokeApi
    const { results } = data

    // Obtener pokemones
    const pks = await getPokemons({ pokemons: results })

    if (!pks) return []

    // Obtener algunos campos de los pokemones
    const pokemons = pks.map(getPokemonInformation)

    return pokemons
  } catch(err: any) {
    return []
  }
}
