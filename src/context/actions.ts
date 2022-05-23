// React
import { Dispatch } from 'react'

import { toast } from 'react-hot-toast'

// Interfaces
import { PokemonProps, PokemonUtilities } from '@interfaces'

// Typescript Types
import {
  AddPokemonsPayload,
  EditPokemonNamePayload,
  UseBackpackItemPayload,
  BuyPokemonShopItemPayload,
  PokemonIdPayload,
  InvokePokemonsPayload,
  SearchPokemonsPayload,
  UploadDataFromLocalStorage,
} from '@types'

// Utils
import { mergeObjs, setQueryString, saveInLocalStorage, getKeyFromLocalStorage, addPokemonToLocalStorage, deletePokemonFromLocalStorage, uploadPokemonStateFromLocalStorage } from '@utils/Helper'

// Types
import * as types from './types'

export default (dispatch: Dispatch<any>) => {
  return {
    // Invocando pokemones
    invokingPokemons: () => {
      return dispatch({ type: types.INVOKING_POKEMONS })
    },

    // Terminar de invocar pokemones
    finishSummonPokemons: () => {
      return dispatch({ type: types.FINISH_SUMMON_POKEMONS })
    },

    // Invocar pokemones
    invokePokemons: (payload: InvokePokemonsPayload) => {
      // Guardar en Local Storage los datos que recibimos del 'payload'
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: { ...payload, isInvoking: false },
      })

      return dispatch({
        type: types.INVOKE_POKEMONS,
        payload: payload,
      })
    },

    // Filtrar pokemones por nombre
    filterPokemonsByName: (payload: SearchPokemonsPayload) => {
      const data = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)

      const newDataInLocalStorage = mergeObjs({
        prevObj: data,
        nextObj: payload,
        subFields: ['pagination'],
      })

      // Guardar en Local Storage los datos que recibimos del 'payload'
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: newDataInLocalStorage,
      })

      return dispatch({
        type: types.FILTER_POKEMONS_BY_NAME,
        payload: payload,
      })
    },

    // Comprar artículo de la tienda Pokemón
    buyPokemonShopItem: (payload: BuyPokemonShopItemPayload) => {
      const itemPurchased = {
        ...payload.item,
        units: payload.unitsPurchased,
      }

      const newItemPurchased = {
        itemPurchased: itemPurchased,
      }

      return dispatch({
        type: types.BUY_POKEMON_SHOP_ITEM,
        payload: newItemPurchased,
      })
    },

    // Usar artículo de la tienda
    consumePokemonShopItem: (payload: UseBackpackItemPayload) => {
      return dispatch({
        type: types.USE_BACKPACK_ITEM,
        payload: payload,
      })
    },

    // Agregar más pokemones
    addPokemons: (payload: AddPokemonsPayload) => {
      const data = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)

      // Limpiar errores de consola
      console.clear()

      const pokemons = [...data.pokemons, ...payload.pokemons]

      const pagination = {
        next: payload.pagination.next,
        previous: payload.pagination.previous,
      }

      const backup = {
        ...data?.backup,
        pagination: pagination,
        currentPokemons: pokemons,
      }

      const newLocalStorageState = {
        ...data,
        backup: backup,
        pokemons: pokemons,
        pagination: { ...data.pagination, ...pagination },
      }

      // Guardar en Local Storage los datos que recibimos del 'payload'
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: newLocalStorageState,
      })

      return dispatch({
        type: types.ADD_POKEMONS,
        payload: payload,
      })
    },

    // Agregar pokemon a favoritos
    addFavoritePokemon: (payload: PokemonUtilities) => {
      // Agregar pokemon favorito a Local Storage
      addPokemonToLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        field: 'favoritePokemons',
        pokemon: payload.pokemon,
      })

      return dispatch({
        type: types.ADD_FAVORITE_POKEMON,
        payload: payload,
      })
    },

    // Agregar pokemon a mis pokemones capturados
    addCatchedPokemon: (payload: PokemonUtilities) => {
      // Agregar pokemon capturado a Local Storage
      addPokemonToLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        field: 'myPokemons',
        pokemon: payload.pokemon,
      })

      return dispatch({
        type: types.ADD_CATCHED_POKEMON,
        payload: payload,
      })
    },

    // Eliminar pokemon de favoritos
    deleteFavoritePokemon: (payload: PokemonIdPayload) => {
      // Eliminar pokemon favorito de Local Storage
      deletePokemonFromLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        field: 'favoritePokemons',
        pokemonId: payload.pokemonId,
      })

      return dispatch({
        type: types.DELETE_FAVORITE_POKEMON,
        payload: payload,
      })
    },

    // Editar el nombre del pokemonaa
    editPokemonName: (payload: EditPokemonNamePayload) => {
      // Encontrar ek índice del pokemon que se debe editar
      const index = payload.pokemons.findIndex((pk) => pk.id === payload.pokemonId)

      if (index === -1) return

      const pokemons: PokemonProps[] = [...payload.pokemons]

      // Pokemon con un nuevo nombre
      pokemons[index].name = payload.newPokemonName

      const data = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)

      toast.success(`Now, Your pokemon is called ${payload.newPokemonName}`)

      // Guardar en Local Storage el pokemon con el nombre actualizado
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: { ...data, myPokemons: pokemons },
      })

      return dispatch({
        type: types.EDIT_POKEMON_NAME,
        payload: { pokemons },
      })
    },

    // Actualizar la página actual que muestra los pokemonesa
    updatePokemonPage: (payload: AddPokemonsPayload) => {
      const data = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)

      // Limpiar errores de consola
      console.clear()

      // En caso existe la propiedad 'backup' en Local Storage
      if (data?.backup) {
        // Actualizar los pokemones que están en la propiedad 'currentPokemons'
        const backup = {
          ...data.backup,
          currentPokemons: payload.pokemons,
          pagination: {
            next: payload.pagination.next,
            previous: payload.pagination.previous,
          },
        }

        const newLocalStorageState = {
          ...data,
          backup: backup,
          pokemons: payload.pokemons,
        }

        // Guardar en Local Storage el pokemon con el nombre actualizado
        saveInLocalStorage({
          key: types.POKEMON_MISTERY_DUNGEON,
          data: newLocalStorageState,
        })
      }

      // Guardar en Local Storage la página actual
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: { ...data, page: payload.page },
      })

      return dispatch({
        type: types.SET_POKEMONS,
        payload: payload,
      })
    },

    // Cargar información guardada de Local Storage
    uploadDataFromLocalStorage: ({ state }: UploadDataFromLocalStorage) => {
      const data = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)

      if (data === null) {
        const defaultUrl = window.location.pathname.replace(/(\?.*)|(#.*)/g, '')
        return window.history.replaceState({}, '', defaultUrl)
      }

      if (data?.page) {
        // Obtener las query string de la url
        const urlParams = new URLSearchParams(window.location.search)
        const page = urlParams.get('page')

        if (page === null) {
          // Setear query string a la página
          setQueryString({
            key: 'page',
            value: String(data.page),
          })
        }
      }

      // Fusionar nuestro estaado inicial de nuestro Context con el estado guardado en LocalStorage, devuelve el estado actualizado del Context
      const newStateUpdated = uploadPokemonStateFromLocalStorage({
        savedState: data,
        initialState: state,
      })

      return dispatch({
        type: types.UPLOAD_KEY_FROM_LOCALSTORAGE,
        payload: newStateUpdated,
      })
    },

    // Actualizar la pestaña actual
    changeActiveTab: (tab: string) => {
      return dispatch({
        type: types.CHANGE_ACTIVE_TAB,
        payload: {
          activeTab: tab,
        },
      })
    },
  }
}
