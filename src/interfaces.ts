// Reac
import React from 'react'

// Types
import * as types from './types'
import { ShowModalType, PokemonBackpack, SearchPokemonsPayload, ActionButtonType } from './types'

// Interface for Children
export interface ChildrenProp {
  children?: React.ReactNode
}

// Interface for Global Props
export interface GlobalProps {
  style?: any
  className?: string
}

// Interface for EmptyProps Component
export interface EmptyProps extends ChildrenProp {
  image: string
  title: string
  message: string
}

// Interface for LoadingButton Component
export interface LoadingButtonProps {
  showLoading: Function
  hideLoading: Function
}

// Interface for onclik event in Button Component
export interface ButtonOnclick extends LoadingButtonProps {
  event: React.MouseEvent<HTMLButtonElement>
}

// Interface for Button Component
export interface ButtonProps extends GlobalProps {
  type: string
  title: string
  titleStyle?: any
  titleClasses?: string
  attributes?: any
  textColor?: string
  backgroundColor?: string
  loading?: React.ReactNode | null
  endIcon?: React.ReactNode | boolean | null
  startIcon?: React.ReactNode | boolean | null
  onClick: (ctx: ButtonOnclick) => void
}

// Interface for Image Component
export interface ImageProps {
  url: string
  alt: string
  name?: string
  title?: string
  width?: number
  height?: number
  className?: string
  wrapperClassname?: string
  onClick?: React.MouseEventHandler<HTMLImageElement>
}

// Interface for PlayBackgroundMusic Component
export interface ActivePlayIconProps {
  isPlay?: boolean
}

// Interface for function 'onLoadMore' in Scroller Component
export interface ScrollerOnLoadMore extends LoadingButtonProps {
  limit: number
  hideLoadMoreButton: Function
}

// Interface for Scroller Component
export interface ScrollerProps extends ChildrenProp {
  limit: number
  dataLength: number
  next?: string | null
  loadMoreButton?: any
  onLoadMore: (ctx: ScrollerOnLoadMore) => void
}

// Interface for Pokemon Wrapper Component
export interface PokemonWrapperProps {
  items: PokemonProps[]
  renderItem: (ctx: PokemonProps) => React.ReactNode
}

// Interface for ScrollerItems Component
export interface ScrollerItemsProps {
  items: any[]
  containerClasses?: string
  renderItem: (ctx: any) => React.ReactNode
}

// Interface for Pagination Component
export interface PaginationProps {
  allItemsAreUploaded?: boolean
}

// Interface for Tabs Component
export interface TabsProps {
  items: TabItem[]
}

// Interface for Item of Tabs Component
export interface TabItem {
  label: string
  value: React.ReactNode
  content: React.ReactNode
}

// Interface for Tab Item Component
export interface TabItemProps extends ChildrenProp {
  label: string
  isActive: boolean
  onChange: (label: string) => void
}

// Interface for
export interface ActionButtonProps extends ActionButtonType {
  isActive: boolean
  onAction: any
}

// Type for Pokemon State (Context)
export interface PokemonState {
  isInvoking: boolean
  pokemons: Array<PokemonProps>
  myPokemons: Array<PokemonProps>
  favoritePokemons: Array<PokemonProps>
  activeTab: string | null
  searchValue: string
  pagination: types.PokemonPagination
  shop: types.PokemonShop
  backpack: types.PokemonBackpack
}

// Interface for value of Context Provider
export interface PokemonContextState extends PokemonState {
  invokingPokemons: Function
  finishSummonPokemons: Function
  changeActiveTab: (tab: string) => void
  filterPokemonsByName: (payload: types.SearchPokemonsPayload) => void
  buyPokemonShopItem: (payload: types.BuyPokemonShopItemPayload) => void
  consumePokemonShopItem: (payload: types.UseBackpackItemPayload) => void
  editPokemonName: (payload: types.EditPokemonNamePayload) => void
  addPokemons: (payload: types.AddPokemonsPayload) => void
  invokePokemons: (payload: types.InvokePokemonsPayload) => void
  updatePokemonPage: (payload: types.AddPokemonsPayload) => void
  addCatchedPokemon: (payload: PokemonUtilities) => void
  addFavoritePokemon: (payload: PokemonUtilities) => void
  deleteCatchedPokemon: (payload: types.PokemonIdPayload) => void
  deleteFavoritePokemon: (payload: types.PokemonIdPayload) => void
}

// Interface for Pokemon Component
export interface PokemonProps {
  id: number
  order?: number
  stats: types.PokemonStats[]
  height: number
  weight: number
  experience: number
  description?: string
  defaultImage: string
  name: string
  moves: string[]
  heldItems: string[]
  types: string[]
  specialAbilities: string[]
  location_area_encounters: string
  mode?: string | null
  showPokeballs?: boolean
}

// Interface for Pokemon Utilities Component
export interface PokemonUtilities {
  pokemon: PokemonProps
  extraProps?: {
    mode?: string | null
    showPokeballs?: boolean
  }
}

// Interface for Pokemon Stats Component
export interface PokemonStatsProps {
  weight: number
  height: number
  stats: any[]
}

// Interface for Pokemon Stat Component
export interface PokemonStatProps {
  icon: string
  title: string
  value: number
}

// Interface for Types Component
export interface PokemonTypesProps {
  items: String[]
}

// Interface for Localization Component
export interface PokemonLocalizationProps {
  places: string[]
  heldItems: string[]
  specialAbilities: string[]
}

// Interface for Fallback Pokemon Component
export interface PokemonFallbackProps {
  mainPokemonType: String
}

// Interface for Pokemon Utilities Component
export interface HeartProps extends GlobalProps {
  pokemon: PokemonProps
}

// Interface for Catch Pokemon Modal Content Component
export interface ModalContentProps {
  title?: string
  image: string
  altImage: string
  titleClass: string
  imageClass: string
  onClickImage?: React.MouseEventHandler<HTMLImageElement>
}

// Interface for Pokeball Component in Pokeballs Component
export interface PokeballProps {
  pokemon: string
  ball: types.PokeballType
  onCatch: (ctx: ShowModalType) => void
}

// Interface for Close Modal Component in Catch Pokemon Modal Component
export interface CloseModalProps {
  style?: any
  onClose: React.MouseEventHandler<HTMLButtonElement>
}

// Interface for Modal Pokeballs Component
export interface ModalPokeballsProps {
  mode?: string
  title: string
  description: string
}

// Interface for Counter Component
export interface CounterProps extends GlobalProps {
  defaultValue: number
}
