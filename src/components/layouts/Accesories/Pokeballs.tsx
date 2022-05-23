// React
import React from 'react'

// Components
import Image from '@common/Image'
import Grid from '@material-ui/core/Grid'
import IconButton from '@mui/material/IconButton'
import CatchPokemon from '@layouts/Accesories/CatchPokemon'

// Librarys
import { toast } from 'react-hot-toast'

// Hooks
import usePokemon from '@hooks/usePokemon'

// Types
import { PokeballType, ShowModalType, PokemonShopItem } from '@types'

// Interfaces
import { PokeballProps, PokemonUtilities } from '@interfaces'

// Assets
import pokeballs from '@assets/data/pokeballs'

const pokeballStyle = {
  padding: 10,
  fontSize: 'inherit',
  backgroundColor: 'var(--bg-opacity-white)',
}

const Pokeballs: React.FC<PokemonUtilities> = ({ pokemon }) => {
  const refCatchPokemon = React.useRef<any>()

  const showPokeball = React.useCallback((extraData: ShowModalType) => {
    return refCatchPokemon.current.show(extraData)
  }, [])

  return (
    <React.Fragment>
      <Grid container spacing={1} className="pokeballs py-2" justifyContent="center">
        {pokeballs.map((ball: PokeballType) => (
          <Grid key={ball.name} item>
            <Pokeball pokemon={pokemon.name} ball={ball} onCatch={showPokeball} />
          </Grid>
        ))}
      </Grid>

      {/* Modal que muestra pokebola para atrapar a un pokemon */}
      <CatchPokemon ref={refCatchPokemon} pokemon={pokemon} />
    </React.Fragment>
  )
}

export default React.memo(Pokeballs)

// <------------------------ Extra Components ------------------------>
export const Pokeball = React.memo(({ pokemon, ball, onCatch }: PokeballProps) => {
  const { backpack } = usePokemon()

  // Evento 'click' en pokebola para atrapar pokemon
  const handleCatchPokemon = React.useCallback(() => {
    const pkBall = backpack.items.find((item: PokemonShopItem) => item.name === ball.name)

    if (!pkBall || pkBall.units === 0) {
      return toast.error(`You have 0 ${ball.name}s, go to the Pokemon Store and buy some`)
    }

    onCatch({
      pokeballType: ball.id,
      itemBackpack: pkBall.id,
    })
  }, [backpack.items])

  return (
    <IconButton className="pokeball scale rounded-circle" style={pokeballStyle} title={`Catch ${pokemon}`} onClick={handleCatchPokemon}>
      <Image url={ball.img} width={30} height={30} alt={ball.name} />
    </IconButton>
  )
})
