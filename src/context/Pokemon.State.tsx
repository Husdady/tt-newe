// React
import React from 'react'

// Interfaces
import { ChildrenProp, PokemonState as PokemonStateType } from '@interfaces'

// Assets
import shopItemsForSell from '@assets/data/shop-items'

// Context
import PokemonReducer from './Pokemon.Reducer'
import PokemonContext from './Pokemon.Context'

// Actions
import actions from './actions'

const defaultState = require('@assets/data/defaultState.json')

defaultState.shop.items = shopItemsForSell

const PokemonState: React.FC<ChildrenProp> = ({ children }) => {
  const initialState: PokemonStateType = defaultState

  // Declarar reducer
  const [state, dispatch] = React.useReducer(PokemonReducer, initialState)

  // Obtener acciones que actualizan el estado
  const pokemonActions = React.useMemo(() => actions(dispatch), [])

  // Definir el valor del context que queremos pasar
  const contextValue = React.useMemo(
    () => ({
      ...state,
      ...pokemonActions,
    }),
    [state],
  )

  React.useLayoutEffect(() => {
    let isMounted = true

    if (isMounted) {
      pokemonActions.uploadDataFromLocalStorage({ state })
    }

    return () => {
      isMounted = false
    }
  }, [])

  return <PokemonContext.Provider value={contextValue}>{children}</PokemonContext.Provider>
}

export default React.memo(PokemonState)
