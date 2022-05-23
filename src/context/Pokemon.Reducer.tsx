// Librarys
import { toast } from 'react-hot-toast'

// Typescript Types
import { PokemonAction, PokemonShopItem } from '@types'

// Interfaces
import { PokemonProps, PokemonState } from '@interfaces'

// Utils
import { mergeObjs, saveInLocalStorage, getKeyFromLocalStorage } from '@utils/Helper'

// Types
import * as types from './types'

const PokemonReducer = (state: PokemonState, action: PokemonAction) => {
  switch (action.type) {
    // Invocando pokemones
    case types.INVOKING_POKEMONS:
      return { ...state, isInvoking: true }

    // Finalizar invocación de pokemones
    case types.FINISH_SUMMON_POKEMONS:
      return { ...state, isInvoking: false }

    // Invocar pokemones | Filtrar pokemones por nombre | Agregar más pokemones
    case types.INVOKE_POKEMONS:
    case types.FILTER_POKEMONS_BY_NAME:
    case types.SET_POKEMONS:
      return mergeObjs({
        prevObj: state,
        nextObj: action.payload,
        subFields: ['pagination'],
      })

    // Editar nombre de pokemon
    case types.EDIT_POKEMON_NAME:
      return {
        ...state,
        myPokemons: action.payload.pokemons,
      }

    // Agregar más pokemones
    case types.ADD_POKEMONS: {
      const newPokemons = [...state.pokemons, ...action.payload.pokemons]
      const pagination = mergeObjs({
        prevObj: state.pagination,
        nextObj: action.payload.pagination,
      })

      return {
        ...state,
        pokemons: newPokemons,
        pagination: pagination,
      }
    }

    // Agregar pokemón a favoritos
    case types.ADD_FAVORITE_POKEMON:
      return {
        ...state,
        favoritePokemons: [...state.favoritePokemons, action.payload.pokemon],
      }

    // Eliminar pokemón de favoritos
    case types.DELETE_FAVORITE_POKEMON: {
      const newFavoritePokemons = state.favoritePokemons.filter((favoritePokemon: PokemonProps) => {
        return favoritePokemon.id !== action.payload.pokemonId
      })

      return {
        ...state,
        favoritePokemons: newFavoritePokemons,
      }
    }

    // Agregar pokemón a mis pokemones capturados
    case types.ADD_CATCHED_POKEMON:
      return {
        ...state,
        myPokemons: [...state.myPokemons, action.payload.pokemon],
      }

    // Eliminar pokemón de mis pokemones capturados
    case types.DELETE_CATCHED_POKEMON: {
      const newCatchedPokemons = state.myPokemons.filter((pk: PokemonProps) => {
        return pk.id !== action.payload.pokemonId
      })

      return {
        ...state,
        myPokemons: newCatchedPokemons,
      }
    }

    // Comprar un artículo de la tienda y agregarlo a la mochila
    case types.BUY_POKEMON_SHOP_ITEM: {
      const stateCopy = { ...state }
      const { itemPurchased } = action.payload
      const callback = (item: PokemonShopItem) => item.id === itemPurchased.id
      const storage = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)

      if (stateCopy.shop.timeForReloadItems === null) {
        stateCopy.shop.timeForReloadItems = Date.now()
      }

      // Obtener el índice del artículo comprado desde la tienda
      const shopItemIndex = stateCopy.shop.items.findIndex(callback)

      // Disminuir las unidades del producto comprado de la tienda
      stateCopy.shop.items[shopItemIndex].units -= itemPurchased.units

      // Comprobar si el nuevo item ya existe en la mochila
      const existItemPurchasedInBackpack = stateCopy.backpack.items.find(callback)

      // Si está en la mochila
      if (existItemPurchasedInBackpack) {
        // Obtener su posición
        const index = stateCopy.backpack.items.findIndex(callback)

        // Actualizar las actuales unidades del artículo
        stateCopy.backpack.items[index].units += itemPurchased.units

        // Guardar en Local Storage el nuevo stock del producto comprado de la tienda y guardado en la mochila
        saveInLocalStorage({
          key: types.POKEMON_MISTERY_DUNGEON,
          data: stateCopy,
        })

        return {
          ...state,
          backpack: stateCopy.backpack,
        }
      }

      // Nuevo estado de la mochila, con los nuevos productos comprados
      const newBackpackState = {
        items: [...state.backpack.items, action.payload.itemPurchased],
      }

      // Definir el nuevo estado
      const newShopState = {
        shop: stateCopy.shop,
        backpack: newBackpackState,
      }

      // Guardar en Local Storage el nuevo stock del producto comprado de la tienda y guardado en la mochila
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: { ...storage, ...newShopState },
      })

      return {
        ...state,
        backpack: newBackpackState,
      }
    }

    // Usar artículo de la mochila
    case types.USE_BACKPACK_ITEM: {
      const storage = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)
      const callback = (item: PokemonShopItem) => item.id === action.payload.itemId
      const newBackpackState = {
        items: Array.from(state.backpack.items),
      }

      const index = newBackpackState.items.findIndex(callback)

      const isUnitsGreaterThanZero = newBackpackState.items[index].units === 1

      if (!isUnitsGreaterThanZero) {
        newBackpackState.items[index].units -= 1
      } else {
        newBackpackState.items = newBackpackState.items.filter((item: PokemonShopItem) => item.id !== action.payload.itemId)
      }

      const newLocalStorageState = {
        ...storage,
        backpack: newBackpackState,
      }

      // Guardar en Local Storage el nuevo estadoa de la mochila
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: newLocalStorageState,
      })

      return {
        ...state,
        backpack: newBackpackState,
      }
    }

    // Cambiar la pestaña actual que se está mostrando: Pokemons|MyPokemons|MyFavoritePokemons
    case types.CHANGE_ACTIVE_TAB: {
      // Si la pestaña activa no tiene un valor de tipo string, mostrar error y devolver el estado actual
      if (state.activeTab === null) {
        toast.error('You need to summon pokemons')
        return state
      }

      const storage = getKeyFromLocalStorage(types.POKEMON_MISTERY_DUNGEON)

      // Guardar en Local Storage la nueva pestaña
      saveInLocalStorage({
        key: types.POKEMON_MISTERY_DUNGEON,
        data: { ...storage, activeTab: action.payload.activeTab },
      })

      return {
        ...state,
        activeTab: action.payload.activeTab,
      }
    }

    // Cargar datos guardados en Local Storage
    case types.UPLOAD_KEY_FROM_LOCALSTORAGE:
      return action.payload

    default:
      return state
  }
}

export default PokemonReducer
