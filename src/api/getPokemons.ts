// Librarys
import { toast } from 'react-hot-toast'

// Types
import { GetPokemons } from '@types'

// Obtener pokemones paginados
export default async function getPokemons(payload: GetPokemons) {
  // Obtener pokemones de los cuáles se debe obtener su información
  const { pokemons } = payload

  // Obtener las urls que obtenemos de los pokemones y por cada url, realizar un fetch que devuelve una promesa, al finalizar la promesa, convertir esos datos a JSON
  const promises = pokemons.map((pokemon) => {
    return fetch(pokemon.url).then((obj) => obj.json())
  })

  try {
    // Realizar peticiones
    const pks = await Promise.all(promises)

    return pks
  } catch(err: any) {
    // Mostrar error por consola
    console.error('[getPokemons]', err)

    const defaultMessage = 'An error ocurred for invoke some pokemons'

    // Mostrar error por pantalla
    toast.error(err.message || defaultMessage)
  }
}
