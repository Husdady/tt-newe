// React
import { FC, useState, useCallback, useMemo } from 'react'

// Librarys
import { toast } from 'react-hot-toast'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

// Interfaces
import { HeartProps } from '@interfaces'

// Hooks
import usePokemon from '@hooks/usePokemon'
import useMounted from '@hooks/useMounted'

// Utils
import { classnames } from '@utils/Helper'

const jello = 'animate__animated animate__jello'
const rubberBand = 'active animate__animated animate__rubberBand'

const activeHeartStyle = {
  color: 'var(--bs-red)',
}

const Heart: FC<HeartProps> = ({ pokemon, style, className }) => {
  const [isActive, setActive] = useState<boolean>(false)
  const { favoritePokemons, addFavoritePokemon, deleteFavoritePokemon } = usePokemon()

  // Definir el título flotante al pasar el mouse encima del ícono del corazón
  const heartTitle = useMemo(() => {
    return `Add to ${pokemon.name} my favorite pokemons`
  }, [pokemon.name])

  // Definir los estilos del ícono del corazón
  const heartStyle = useMemo(() => {
    const typesForGrayOpacity = ['ice', 'water', 'fighting']
    const isGrayOpacity = typesForGrayOpacity.includes(pokemon.types[0])
    const activeOpacity = isGrayOpacity ? 'var(--bg-opacity-gray)' : 'var(--bg-opacity-white)'

    return {
      backgroundColor: isActive ? activeOpacity : null,
      ...style,
    }
  }, [isActive])

  // Definir las clases del ícono del corazón
  const heartClasses = useMemo(() => {
    return classnames(['heart', className as string, isActive ? `active ${rubberBand}` : `desactive ${jello}`])
  }, [isActive])

  // Evento que se ejecuta cuando un pokemon es agregado a favoritos
  const onAddPokemonToFavorites = useCallback(() => {
    const successMessage = `The pokemon ${pokemon.name} has been added to your favorite pokemons`

    // Agregar pokemon a favoritos
    addFavoritePokemon({ pokemon })

    // Mostrar mensaje por pantalla
    toast.success(successMessage)
  }, [pokemon])

  // Evento que se ejecuta cuando un pokemon es eliminado de favoritos
  const onDeletePokemonToFavorites = useCallback(() => {
    const errorMessage = `The pokemon ${pokemon.name} has been deleted from your favorite pokemons`

    // Agregar pokemon a favoritos
    deleteFavoritePokemon({ pokemonId: pokemon.id })

    // Mostrar mensaje por pantalla
    toast.error(errorMessage)
  }, [])

  // Evento 'click' en ícono del corazón
  const handleClick = useCallback(() => {
    setActive((prevState) => !prevState)

    if (!isActive) {
      onAddPokemonToFavorites()

      return false
    }

    onDeletePokemonToFavorites()
  }, [isActive])

  useMounted(() => {
    const existPokemonInFavorites = favoritePokemons.find((favoritePokemon) => {
      return favoritePokemon.id === pokemon.id && favoritePokemon.name === pokemon.name
    })

    // Comprobar si el pokemon ya ha sido agregado a favoritos, actualizar el estado a true, para mostrar el ícono del corazón como activo
    if (existPokemonInFavorites) {
      setActive(true)
    }
  }, [])

  return (
    <IconButton style={heartStyle} onClick={handleClick} className={heartClasses} title={heartTitle}>
      {isActive ? <FavoriteIcon fontSize="inherit" className="fav-icon" style={activeHeartStyle} /> : <FavoriteBorderIcon fontSize="inherit" className="fav-icon-border" />}
    </IconButton>
  )
}

export default Heart
