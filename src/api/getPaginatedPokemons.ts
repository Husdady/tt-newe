// Librarys
import { toast } from 'react-hot-toast'

// Utils
import { playClickEffect } from '@utils/sounds'

// Types
import { GetPaginatedPokemons } from '@types'

// Utils
import { setQueryString } from '@utils/Helper'

// API
import getPokemons from './getPokemons'
import getPokemonInformation from './getPokemonInformation'

export default async function getPaginatedPokemons({ url, currentPage, updatePokemonPage, invokingPokemons, finishSummonPokemons }: GetPaginatedPokemons) {
  try {
    // Ejecutar efecto de sonido
    playClickEffect()

    // Invocando pokemones
    invokingPokemons()

    // Realizar petición a la pokeApi para obtener los pokemones
    const res = await fetch(url as string)
    const data = await res.json()

    // Obtener datos de la respuesta de la pokeApi
    const { next, previous, results } = data

    // Obtener pokemones
    const pks = await getPokemons({ pokemons: results })

    // En caso existe un error al obtener los pokemones, lanzar un error
    if (!pks) throw new Error('An error ocurred to invoke pokemons')

    // Obtener algunos campos de los pokemones
    const pokemons = pks.map(getPokemonInformation)

    // Agregar nuevos pokemones invocados
    updatePokemonPage({
      page: currentPage,
      pokemons: pokemons,
      pagination: {
        next: next,
        previous: previous,
        currentPage: currentPage,
      },
    })

    // Setear query string a la página
    setQueryString({
      key: 'page',
      value: String(currentPage),
    })

    setTimeout(() => {
      // Terminar de invocar pokemones por primera vez
      finishSummonPokemons()
    }, 3000)
  } catch(err: any) {
    // Mostrar error por consola
    console.error('[getPaginatedPokemons]', err)

    const defaultMessage = 'An error ocurred for summon pokemons'

    // Mostrar error por pantalla
    toast.error(err.message || defaultMessage)
  }
}
