// React
import React, { useState, useCallback } from 'react'

// Librarys
import { toast } from 'react-hot-toast'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'

// Hooks
import usePokemon from '@hooks/usePokemon'
import useMounted from '@hooks/useMounted'

// API
import searchPokemons from '@api/searchPokemons'

// Utils
import { playClickEffect } from '@utils/sounds'
import { isEmptyString } from '@utils/Validations'

export const searchIconStyle = {
  backgroundColor: 'var(--bs-warning)',
}

const Seeker = () => {
  const { pagination, activeTab, searchValue, filterPokemonsByName } = usePokemon()

  const [value, setValue] = useState<string>(searchValue)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [value],
  )

  // Evento que se ejecuta cuando se presiona la tecla 'Enter'
  const handlePressEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      handleSearchPokemon()
    },
    [value, activeTab],
  )

  // Buscar pokemones
  const handleSearchPokemon = useCallback(() => {
    // Iniciar efecto de click
    playClickEffect()

    // Cuando el valor de 'activeTab' es nulo, es porque los pokemones aún no han sido invocados
    if (activeTab === null) {
      return toast.error('You need to summon Pokemons')
    }

    const isEmptyValue = isEmptyString(value)
    const isEmptySearchValue = isEmptyString(searchValue)

    if (isEmptyValue && isEmptySearchValue) {
      return toast.error('You need to enter the name of a Pokemon')
    }

    const valueWithoutSpaces = value.trim()
    const valueToLowerCase = valueWithoutSpaces.toLowerCase()

    // Buscar pokemones
    searchPokemons({
      pokemon: valueToLowerCase,
      setPokemons: filterPokemonsByName,
      prevPagination: {
        next: pagination.next,
        previous: pagination.previous,
      },
    })
  }, [value, activeTab, pagination, searchValue])

  useMounted(() => {
    if (value !== searchValue) {
      setValue(searchValue)
    }
  }, [searchValue])

  return (
    <div className="mt-4 d-flex align-items-center justify-content-between wrapper-seeker rounded-pill overflow-hidden">
      <input
        value={value}
        autoComplete="off"
        id="seeker"
        type="text"
        className="w-100  bg-transparent border-0 py-3 px-4 press-start-2p"
        placeholder="Search your favorite pokemon..."
        onChange={handleChange}
        onKeyDown={handlePressEnter}
      />

      {/* Ícono */}
      <div role="button" style={searchIconStyle} className="p-3 user-select-none shadow-opacity-dark" onClick={handleSearchPokemon} onKeyDown={handleSearchPokemon} tabIndex={0}>
        <SavedSearchIcon className="scale" />
      </div>
    </div>
  )
}

export default Seeker
