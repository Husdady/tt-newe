// Librarys
import { toast } from 'react-hot-toast'

// Utils
import { playInvokingEffect } from '@utils/sounds'

// Types
import { GetMorePokemons } from '@types'

// API
import getPokemons from './getPokemons'
import getPokemonInformation from './getPokemonInformation'

export default async function getMorePokemons({ url, addPokemons, showLoading, hideLoading }: GetMorePokemons) {
  try {
    // Ejecutar efecto de sonido
    playInvokingEffect()

    // Mostrar loading en botón que carga más pokemones
    showLoading()

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
    addPokemons({
      pokemons: pokemons,
      pagination: {
        next: next,
        previous: previous,
      },
    })
  } catch(err: any) {
    // Mostrar error por consola
    console.error('[getMorePokemons]', err)

    const defaultMessage = 'An error ocurred for summon more pokemons'

    // Mostrar error por pantalla
    toast.error(err.message || defaultMessage)
  }

  // Ocultar loading en botón que carga más pokemones
  hideLoading()
}
