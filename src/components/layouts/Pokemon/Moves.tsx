// React
import { FC, useCallback, memo } from 'react'

// Interfaces
import { PokemonUtilities } from '@interfaces'

// Librarys
import { toast } from 'react-hot-toast'
import Grid from '@material-ui/core/Grid'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'

// Components
import Image from '@common/Image'

// Hooks
import usePokemon from '@hooks/usePokemon'

// Utils
import { replaceHyphens } from '@utils/Helper'
import { isEmptyArray } from '@utils/Validations'

const sword = require('@assets/img/pk-tabs/sword.webp')

const descriptionStyle = {
  fontSize: '.75em',
}

const Moves: FC<PokemonUtilities> = ({ pokemon, extraProps }) => {
  const { myPokemons, editPokemonName } = usePokemon()

  // Editar nombre del pokemon
  const handleEditPokemonName = useCallback(() => {
    const newPkName = window.prompt('Give your pokemon a name', pokemon.name)

    // No se cancelado el proceso para actualizar el nombre del pokemon
    if (newPkName === null) {
      return toast.error('Your Pokemon wants a new name')
    }

    // El nuevo nombre del pokemon es igual al actual
    if (newPkName === pokemon.name) {
      return toast.error(`Your pokemon is already called ${pokemon.name}`)
    }

    // Editar el nombre del pokemon
    editPokemonName({
      pokemons: myPokemons,
      pokemonId: pokemon.id,
      newPokemonName: newPkName,
    })
  }, [pokemon.name])

  // Renderizar movimientos del pokemon
  const PkMoves = useCallback(() => {
    const emptyMoves = isEmptyArray(pokemon.moves)

    // Si el pokemon no tiene movimientos
    if (emptyMoves) {
      return (
        <q className="d-block text-center pt-3 pb-4 px-4" style={descriptionStyle}>
          The moves of this pokemon is a mistery
        </q>
      )
    }

    const moves = pokemon.moves.map((move: string, i: number) => (
      <Grid key={`${i + 1}`} item xs={4} className="move text-break text-center">
        <Image url={sword} alt="pokemon-move" width={30} height={30} />
        <span className="d-block mt-2 text-capitalize">{replaceHyphens(move)}</span>
      </Grid>
    ))

    return (
      <Grid container spacing={1} className="moves pt-2 pb-4 px-3 scrollbar-hidden" justifyContent="center">
        {moves}
      </Grid>
    )
  }, [])

  // Renderizar el nombre del pokemon, dependiendo de modo
  const PkName = useCallback(() => {
    if (extraProps?.mode === null) {
      return <h6 className="text-center my-0 py-2">{pokemon.name}</h6>
    }

    return (
      <div className="d-flex align-items-center justify-content-center">
        {/* Ícono de editar */}
        <IconButton onClick={handleEditPokemonName}>
          <AutoFixHighOutlinedIcon sx={{ color: 'var(--bg-gray-100)' }} />
        </IconButton>

        {/* Nombre del pokemon */}
        <h6 className="text-center ms-2 my-0 py-2">{pokemon.name}</h6>
      </div>
    )
  }, [pokemon.name])

  return (
    <section className="wrapper-moves">
      <Divider className="mb-1" />

      {/* Nombre del pokemon */}
      <PkName />

      <Divider className="mb-1" />

      {/* Descripción del pokemon */}
      <q className="d-block text-center p-2 mb-1" style={descriptionStyle}>
        {pokemon.description}
      </q>

      <Divider className="mb-1" />

      <h6 className="text-center py-2 mb-0">Movements:</h6>

      <Divider className="mb-2" />

      {/* Movimientos del pokemon */}
      <PkMoves />
    </section>
  )
}

export default memo(Moves)
