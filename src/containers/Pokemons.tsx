// React
import React from 'react'

// Components
import Empty from '@common/Empty'
import Scroller from '@common/Scroller'
import Loading from '@loaders/Loading.Invoke'
import LoadingPreload from '@loaders/Loading.Preload'
import Pokemon, { Fallback } from '@layouts/Pokemon'

// Librarys
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import HomeIcon from '@mui/icons-material/Home'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

// Hooks
import usePokemon from '@hooks/usePokemon'
import useMounted from '@hooks/useMounted'

// API
import getMorePokemons from '@api/getMorePokemons'
import getPaginatedPokemons from '@api/getPaginatedPokemons'

// Interfaces
import { PokemonProps, PokemonWrapperProps, ScrollerOnLoadMore } from '@interfaces'

// Utils
import { backToHome } from '@utils/Helper'
import { isEmptyArray } from '@utils/Validations'

const charizard = require('@assets/img/pokemons/charizard.gif')

const loadMoreButton = {
  loading: <Loading />,
  title: 'Summon more Pokémons',
  titleClasses: 'press-start-2p',
  backgroundColor: 'var(--bs-warning)',
  startIcon: <CatchingPokemonIcon />,
  className: 'shadow-opacity-dark py-2 px-5 my-5 d-flex mx-auto rounded-pill',
}

const Pokemons = () => {
  const { pokemons, pagination, isInvoking, addPokemons, updatePokemonPage, invokingPokemons, finishSummonPokemons }: any = usePokemon()

  // Evento 'click' en botón 'Summon more pokemons' cargar más pokemones
  const handleLoadMore = React.useCallback(
    (ctx: ScrollerOnLoadMore) => {
      getMorePokemons({
        url: pagination.next,
        addPokemons: addPokemons,
        showLoading: ctx.showLoading,
        hideLoading: ctx.hideLoading,
      })
    },
    [pagination.next],
  )

  // Evento que se ejecuta cuando el usuario cambia el valor de la query string que establece la página actual
  const onChangePage = React.useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search)

    // Comprobar si en la url existe la query string 'page'
    const existPageQueryString = urlParams.has('page')

    if (existPageQueryString) {
      // Obtener el valor de la query string 'page'
      const page = urlParams.get('page') || 1
      const needUpdatePokemons = page !== pagination.currentPage

      // Si el valor de la query string es diferente a la página actual guardada, actualizar pokemones
      if (needUpdatePokemons) {
        const newOffset = pagination.pokemonsPerPage * (Number(page) - 1) + pagination.limit

        getPaginatedPokemons({
          currentPage: Number(page),
          updatePokemonPage: updatePokemonPage,
          invokingPokemons: invokingPokemons,
          finishSummonPokemons: finishSummonPokemons,
          url: `https://pokeapi.co/api/v2/pokemon?limit=${pagination.limit}&offset=${newOffset}`,
        })
      }
    }
  }, [])

  // Renderizar fallbacks
  const renderFallbacks = React.useCallback((pokemon: PokemonProps) => {
    return <Fallback mainPokemonType={pokemon.types[0]} />
  }, [])

  // Renderizar pokemones
  const renderPokemon = React.useCallback((pokemon: PokemonProps) => {
    return (
      <Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3}>
        <Pokemon {...pokemon} />
      </Grid>
    )
  }, [])

  useMounted(() => {
    onChangePage()
  }, [])

  if (isInvoking) {
    return <PokemonWrapper items={pokemons} renderItem={renderFallbacks} />
  }

  const emptyPokemons = isEmptyArray(pokemons)

  // Pokemones vacíos
  if (emptyPokemons) {
    return (
      <Empty image={charizard} title="Pokemons not found" message="Charizard has been summoned and brings a message: 'Grrrrrrrrrrrrr', it seems that there are no Pokemons nearby">
        <Button onClick={backToHome} startIcon={<HomeIcon />} className="shadow-opacity-dark fw-bold px-4" style={{ backgroundColor: loadMoreButton.backgroundColor }}>
          Back to home page
        </Button>
      </Empty>
    )
  }

  return (
    <React.Fragment>
      {/* Pokemones */}
      <Grid container spacing={2} className="pokemons">
        {pokemons.map(renderPokemon)}
      </Grid>

      {/* Componente que trae la paginación y carga más pokemones */}
      <Scroller next={pagination.next} limit={pagination.pokemonsPerPage} dataLength={pokemons.length} onLoadMore={handleLoadMore} loadMoreButton={loadMoreButton} />
    </React.Fragment>
  )
}

export default Pokemons

// <------------------------ Extra Components ------------------------>
export const PokemonWrapper: React.FC<PokemonWrapperProps> = ({ items, renderItem }) => {
  const [isLoadingItems, setLoadingItems] = React.useState<boolean>(true)

  // Renderizar pokemones
  const PkItems: any = React.useCallback(() => {
    return items.map((pokemon: PokemonProps) => (
      <Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3}>
        {renderItem(pokemon)}
      </Grid>
    ))
  }, [items])

  useMounted(() => {
    setLoadingItems(false)
  }, [])

  if (isLoadingItems) {
    return <LoadingPreload />
  }

  return (
    <Grid container spacing={2} className="pokemons">
      <PkItems />
    </Grid>
  )
}
