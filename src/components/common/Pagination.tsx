// React
import { FC, useCallback, useMemo } from 'react'

// Librarys
import Button from '@material-ui/core/Button'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'

// Hooks
import usePokemon from '@hooks/usePokemon'

// API
import getPaginatedPokemons from '@api/getPaginatedPokemons'

// Interfaces
import { PaginationProps } from '@interfaces'

// Utils
import { backToHome } from '@utils/Helper'

const buttonStyle = {
  backgroundColor: 'var(--bs-warning)',
}

const pageStyle = {
  borderRadius: 5,
  backgroundColor: 'rgba(255, 255, 255, .75)',
}

const Pagination: FC<PaginationProps> = ({ allItemsAreUploaded }) => {
  const { pagination, invokingPokemons, finishSummonPokemons, updatePokemonPage } = usePokemon()
  const { next, limit, offset, count, currentPage, pokemonsPerPage }: any = pagination

  // Comprobar si estamos en la primera página
  const isFirstPage = useMemo(() => currentPage === 1, [currentPage])

  // Comprobar si estamos en la primera página
  const isSecondPage = useMemo(() => currentPage === 2, [currentPage])

  // Definir la página actual
  const defaultPage = useMemo(() => {
    if (isFirstPage) return currentPage

    return isSecondPage ? pokemonsPerPage + 1 : pokemonsPerPage * (currentPage - 1) + 1
  }, [currentPage])

  // Definir si el botón 'Anterior' debe estar deshabilitado o no
  const isDisabledPrevButton = useMemo(() => {
    if (isFirstPage) return true
    return false
  }, [currentPage])

  const actions = useMemo(() => {
    return {
      invokingPokemons: invokingPokemons,
      updatePokemonPage: updatePokemonPage,
      finishSummonPokemons: finishSummonPokemons,
    }
  }, [])

  // Evento 'click' en el botón 'Anterior'
  const onPrev = useCallback(() => {
    // pokemonPerPage = 40 + 10 prevPage = 2
    const prevPage = currentPage - 1
    const newOffset = isSecondPage ? offset * prevPage : pokemonsPerPage * (prevPage - 1) + limit

    getPaginatedPokemons({
      ...actions,
      currentPage: prevPage,
      url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`,
    })
  }, [currentPage])

  // Evento 'click' en el botón 'Siguiente'
  const onNext = useCallback(() => {
    getPaginatedPokemons({
      ...actions,
      url: next,
      currentPage: currentPage + 1,
    })
  }, [currentPage])

  console.log('[Pagination]')

  return (
    <div className="d-flex justify-content-center my-5">
      {/* Ícono de home */}
      <IconButton onClick={backToHome} disabled={isDisabledPrevButton} style={buttonStyle} className="shadow-opacity-dark me-2">
        <HomeIcon />
      </IconButton>

      {/* Botón 'Anterior' */}
      <Button disabled={isDisabledPrevButton} onClick={onPrev} className="text-capitalize shadow-opacity-dark fw-bold" style={buttonStyle}>
        Previous
      </Button>

      {/* Página actual */}
      <span style={pageStyle} className="mx-2 px-4 fw-bold d-flex align-items-center shadow-opacity-gray">
        {defaultPage} - {allItemsAreUploaded ? count : pokemonsPerPage * currentPage} / {count}
      </span>

      {/* Botón 'Siguiente' */}
      <Button disabled={allItemsAreUploaded} onClick={onNext} className="text-capitalize shadow-opacity-dark fw-bold" style={buttonStyle}>
        Next
      </Button>
    </div>
  )
}

export default Pagination
