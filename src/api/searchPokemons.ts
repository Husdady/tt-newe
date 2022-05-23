// Librarys
import { toast } from 'react-hot-toast'

// Typescript Types
import { SearchPokemonsAPI } from '@types'

// Utils
import { isEmptyString } from '@utils/Validations'

// Types
import { POKEMON_MISTERY_DUNGEON } from '@context/types'

// Utils
import { filterPokemons, saveInLocalStorage, getKeyFromLocalStorage } from '@utils/Helper'

// API
import getAllPokemons from './getAllPokemons'

const toastSettings: any = {
  loading: 'Pokemons are being invoked, please wait a moment...',
  success: 'Pokemons invoked',
  error: 'A error ocurred for invoke pokemons',
}

const defaultPagination = {
  next: null,
  previous: null,
}

const newState: any = {
  activeTab: 'pokemons',
}

let isExecuting: boolean = false

// Buscar pokemones por nombre
export default async function searchPokemons(payload: SearchPokemonsAPI) {
  if (isExecuting) return

  isExecuting = true

  const isEmptyValue = isEmptyString(payload.pokemon)
  const storage = getKeyFromLocalStorage(POKEMON_MISTERY_DUNGEON)

  // Asignar al objeto 'newState', el valor del buscador
  newState.searchValue = payload.pokemon

  // Si el valor del buscador es vacío
  if (isEmptyValue) {
    // Asignar a nue
    Object.assign(newState, {
      pagination: storage?.backup?.pagination,
      pokemons: storage?.backup?.currentPokemons,
    })

    isExecuting = false

    // Actualizar los pokemones actuales, por los que han sido encontrados
    return payload?.setPokemons(newState)
  }

  // Asignar al objeto 'newState', la paginación por defecto
  newState.pagination = defaultPagination

  if (!storage.backup?.pokemons) {
    const pokemons = await toast.promise(getAllPokemons(), toastSettings)

    const newLocalStorageState = {
      ...storage,
      backup: {
        pokemons: pokemons,
        currentPokemons: storage?.pokemons || [],
        pagination: payload.prevPagination,
      },
    }

    // Guardar en Local Storage un objeto 'backup' que contiene a todos los pokemones
    saveInLocalStorage({
      key: POKEMON_MISTERY_DUNGEON,
      data: newLocalStorageState,
    })

    const pokemonsFiltered = filterPokemons({
      pokemons: pokemons,
      pokemonNameToFilter: payload.pokemon,
    })

    // Asignar al objeto 'newState', los pokemones filtrados por nombre
    newState.pokemons = pokemonsFiltered

    isExecuting = false

    // Actualizar los pokemones actuales, por los que han sido encontrados
    return payload?.setPokemons(newState)
  }

  const pokemonsFiltered = filterPokemons({
    pokemons: storage.backup.pokemons,
    pokemonNameToFilter: payload.pokemon,
  })

  newState.pokemons = pokemonsFiltered

  // Actualizar los pokemones actuales, por los que han sido encontrados
  payload?.setPokemons(newState)

  isExecuting = false
}
