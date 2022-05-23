// Librarys
import { toast } from 'react-hot-toast'

// Types
import { InvokingPokemons } from '@types'

// Utils
import { playInvokingEffect } from '@utils/sounds'

// API
import getPokemons from './getPokemons'
import getPokemonInformation from './getPokemonInformation'

// Obtener pokemones invocados
export default async function getPokemonsInvoked(payload: InvokingPokemons) {
  const { pagination, setInvoking, invokePokemons, finishSummonPokemons } = payload

  const { limit, offset } = pagination

  const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

  try {
    // Mostrar 'loading' en botón para invocar pokemones
    setInvoking(true)

    // Ejecutar efecto de sonido
    playInvokingEffect()

    // Realizar petición a la pokeApi para obtener los pokemones
    const res = await fetch(URL)
    const data = await res.json()

    // Obtener datos de la respuesta de la pokeApi
    const { count, next, previous, results } = data

    // Obtener pokemones
    const pks = await getPokemons({ pokemons: results })

    // En caso existe un error al obtener los pokemones, lanzar un error
    if (!pks) throw new Error('An error ocurred to invoke pokemons')

    // Obtener algunos campos de los pokemones
    const pokemons = pks.map(getPokemonInformation)

    // Invocar pokemones
    invokePokemons({
      pokemons: pokemons,
      activeTab: 'pokemons',
      pagination: {
        count: count,
        next: next,
        previous: previous,
      },
    })

    setTimeout(() => {
      // Terminar de invocar pokemones por primera vez
      finishSummonPokemons()
    }, 3000)
  } catch(err: any) {
    // Mostrar error por consola
    console.error('[getPokemonsInvoked]', err)

    const defaultMessage = 'An error ocurred for summon pokemons'

    // Mostrar error por pantalla
    toast.error(err.message || defaultMessage)
  }
}
