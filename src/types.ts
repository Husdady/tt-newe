// React
import React from 'react'

// Interfaces
import { PokemonProps, PokemonState } from '@interfaces'

// Type for Boundary Component state
export type BoundaryState = {
  error: null | string
}

// Type for save data in Local Storage
export type SaveInLocalStorage = {
  key: string
  data: any
}

// Type for Pokemon
export type Pokemon = {
  abilities: PokemonAbility[]
  base_experience: number
  id: number
  order: number
  is_default: boolean
  location_area_encounters: string
  game_indices: PokemonGameIndice[]
  moves: any[]
  past_types: any[]
  species: PokemonStat
  height: number
  name: string
  weight: number
  sprites: any
  held_items: any[]
  types: PokemonType[]
  stats: PokemonStats[]
  forms: PokemonStat[]
}

// Type for Pokemon ability
export type PokemonAbility = {
  ability: PokemonStat
  is_hidden: boolean
  slot: number
}

// Type for Pokemon nature
export type PokemonType = {
  slot: number
  type: PokemonStat
}

// Type for Pokemon game index
export type PokemonGameIndice = {
  game_index: number
  version: PokemonStat
}

// Type for Pokemon statistic
export type PokemonStat = {
  name: string
  url: string
}

// Type for Pokemon stats
export type PokemonStats = {
  base_stat: number
  effort: number
  stat: PokemonStat
}

// Type for Pokemon Action (Reducer)
export type PokemonAction = {
  type: symbol
  payload: any
}

// Type for Pokemon Shop
export type PokemonShop = {
  items: PokemonShopItem[]
  timeForReloadItems: Date | string | number | null
}

// Type for Pokemon Shop Item
export type PokemonShopItem = {
  id: string
  name: string
  units: number
  cost: string
  image: PokemonShopImageItem
  mode?: string
}

// Type for Pokemon Shop Image Item
export type PokemonShopImageItem = {
  url: string
  width: number
  height: number
}

// Type for Backpack
export type PokemonBackpack = {
  items: PokemonShopItem[]
}

// Type for paginate pokemons
export type PokemonPagination = {
  count: number
  limit: number
  offset: number
  next: string | null
  previous: string | null
  currentPage?: number
  pokemonsPerPage?: number
}

// Type for function getPokemonsInvoked
export type InvokingPokemons = {
  setInvoking: Function
  invokePokemons: Function
  finishSummonPokemons: Function
  pagination: PokemonPagination
}

// Type for action getPokemons
export type GetPokemons = {
  pokemons: Array<PokemonStat>
}

// Type for action getMorePokemons
export type GetMorePokemons = {
  url: string | null
  addPokemons: Function
  showLoading: Function
  hideLoading: Function
}

// Type for action getMorePokemons
export type GetPaginatedPokemons = {
  url: any
  currentPage: number
  updatePokemonPage: Function
  invokingPokemons: Function
  finishSummonPokemons: Function
}

// Type for action getPokemonsUtilities
export type GetPokemonUtilities = {
  language: string
  setUtilities: Function
  urls: String[]
}

// Type for payload of action getPokemonsInvoked
export type InvokePokemonsPayload = {
  pokemons: Array<Pokemon>
  activeTab: string
  pagination: {
    count: number
    next: string
    previous: string
  }
}

// Type for payload of action addPokemons
export type AddPokemonsPayload = {
  page?: number,
  pokemons: Array<Pokemon>
  pagination: {
    next: string
    previous: string
  }
}

// Type for payload of action editPokemonName
export type EditPokemonNamePayload = {
  pokemonId: number
  newPokemonName: string
  pokemons: PokemonProps[]
}

// Type for payload of action deleteFavoritePokemon
export type PokemonIdPayload = {
  pokemonId: number
}

// Type for delete pokemon from Local Storage
export type AddPokemonToLocalStorage = {
  key: string
  field: string
  pokemon: PokemonProps
}

// Type for delete pokemon from Local Storage
export type DeletePokemonFromLocalStorage = {
  key: string
  field: string
  pokemonId: number
}

// Type for render items in Localization Component
export type ItemsLocalization = {
  items: string[]
  altImage: string
  defaultImage: string
  emptyMessage: string
}

// Type for action uploadDataFromLocalStorage
export type UploadDataFromLocalStorage = {
  state: PokemonState
}

// Type for function uploadPokemonStateFromLocalStorage in Helper
export type UploadPokemonStateFromLocalStorage = {
  savedState: any
  initialState: PokemonState
}

// Type for function setQueryString in Helper
export type SetQueryString = {
  key: string
  value: string
}

// Type for CatchPokemon Component
export type CatchPokemonState = {
  show: boolean
  pokemonState: string
  itemBackpack?: string
  pokeballType: string | null
}

// Type for action 'consumePokemonShopItem' payload
export type UseBackpackItemPayload = {
  itemId: string
}

// Type for function 'show' in CatchPokemon Component
export type ShowModalType = {
  itemBackpack: string
  pokeballType: string
}

// Type for action 'searchPokemons'
export type SearchPokemonsPayload = {
  activeTab: string
  searchValue: string
  pagination: {
    next?: null
    prev?: null
  }
}

// Type for function filterPokemons in Helper
export type FilterPokemonsType = {
  pokemons?: PokemonProps[]
  pokemonNameToFilter: string
}

// Type for api function 'searchPokemons'
export type SearchPokemonsAPI = {
  pokemon: string
  setPokemons: Function
  prevPagination: {
    next: string | null
    previous: string | null
  }
}

// Type for action 'buyPokemonShopItem' payload
export type BuyPokemonShopItemPayload = {
  item: PokemonShopItem
  unitsPurchased: number
}

// Type for function mergeObjs in Helper
export type MergeObjsType = {
  prevObj: any
  nextObj: any
  subFields?: string[]
  subFieldsToExclude?: string[]
}

// Type for action button element in settings
export type ActionButtonType = {
  id: string
  image: string
  title: string
  activeTab: string | boolean
}

// Type for pokeball properties in Pokeballs Component
export type PokeballType = {
  id: string
  name: string
  img: string
  altImg: string
}
