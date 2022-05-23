// React
import React, { useState, useCallback, useMemo } from 'react'

// Librarys
import Button from '@material-ui/core/Button'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

// Hooks
import usePokemon from '@hooks/usePokemon'

// API
import getPokemonsInvoked from '@api/getPokemonsInvoked'

// Components
import Loading from '@loaders/Loading.Invoke'
import { searchIconStyle } from './Seeker'

const Invoke = () => {
  const { pagination, invokePokemons, finishSummonPokemons } = usePokemon()
  const [isInvoking, setInvoking] = useState<boolean>(false)

  // Invocar pokemones
  const handleInvoke = useCallback(() => {
    getPokemonsInvoked({
      pagination: pagination,
      setInvoking: setInvoking,
      invokePokemons: invokePokemons,
      finishSummonPokemons: finishSummonPokemons,
    })
  }, [])

  // Mostrar 'loading' en botón en caso se estén invocando los pokemones, de lo contrario mostrar texto para invocarlos
  const content = useMemo(() => {
    return (
      <React.Fragment>
        {isInvoking && <Loading />}
        <span className="press-start-2p">
          {isInvoking ? 'Invoking' : 'Invoke'} pokemons{isInvoking && '...'}
        </span>
      </React.Fragment>
    )
  }, [isInvoking])

  return (
    <div className="wrapper-invoke d-flex align-items-center justify-content-center">
      <Button
        className="press-start-2p py-2 px-3 text-capitalize shadow-opacity-dark"
        startIcon={!isInvoking ? <CatchingPokemonIcon fontSize="large" /> : null}
        style={searchIconStyle}
        onClick={handleInvoke}
      >
        {content}
      </Button>
    </div>
  )
}

export default Invoke
