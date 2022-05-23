// React
import { FC, memo } from 'react'

// Components
import Image from '@common/Image'
import Pokeballs from '@layouts/Accesories/Pokeballs'

// Librarys
import Grid from '@material-ui/core/Grid'
import Divider from '@mui/material/Divider'

// Types
import { PokemonStats } from '@types'

// Interfaces
import { PokemonUtilities, PokemonStatProps } from '@interfaces'

// Assets
import statsIcons from '@assets/data/pokemon-stats-icons'

const defaultOrderStats = [2, 0, 1, 4, 5, 3]

// Cambiar orden de las estadísticas del pokemon
const changeOrderStats = (stats: PokemonStats[]) => {
  const newStats: PokemonStats[] = []

  stats.forEach((element: PokemonStats, i: number) => {
    newStats[defaultOrderStats[i]] = element
  })

  return newStats
}

// Transformar estadísticas del pokemon
const transformStats = (stats: any) => {
  return stats.reduce((acc: PokemonStats[], allStats: PokemonStats[], i: number) => {
    return [...acc, { ...allStats, ...statsIcons[i] }]
  }, [])
}

const attributeStyle = {
  fontSize: '.70em',
}

const Stats: FC<PokemonUtilities> = ({ pokemon, extraProps }) => {
  // Cambiar orden de estadísticas
  const statsOrdered = changeOrderStats(pokemon.stats)

  // Transformar las estadísticas
  const statsTransformed = transformStats(statsOrdered)

  // Renderizar estadísticas del pokemon
  const renderStats = statsTransformed?.map((item: any, i: number) => <Stat key={`${i + 1}`} title={item.title} icon={item.icon} value={item.base_stat} />)

  return (
    <section className="statistics">
      <Divider className="mb-1" />

      {/* Peso del pokemon */}
      <span className="d-block text-center py-2" style={attributeStyle}>
        Weight: {pokemon.weight.toFixed(2)} hg.
      </span>

      <Divider className="mb-1" />

      {/* Altura del pokemon */}
      <span className="d-block text-center py-2" style={attributeStyle}>
        Height: {pokemon.height.toFixed(2)} dm.
      </span>

      {extraProps?.showPokeballs && <Divider className="mb-1" />}

      {/* Pokebolas */}
      {extraProps?.showPokeballs && <Pokeballs pokemon={pokemon} />}

      <Divider className="mb-1" />

      <h6 className="text-center py-2 mb-0">Statistics:</h6>

      <Divider />

      {/* Estadísticas del pokemon */}
      <Grid container spacing={1} className="stats py-3 px-4" justifyContent="center">
        {renderStats}
      </Grid>
    </section>
  )
}

export default memo(Stats)

// <------------------------ Extra Components ------------------------>
export const Stat: FC<PokemonStatProps> = ({ icon, title, value }) => {
  return (
    <Grid item xs={5} className="stat text-center d-flex justify-content-center my-1 align-items-center" title={title}>
      <Image url={icon} width={30} height={30} alt={title} />
      <span className="ms-2 user-select-none">{value}</span>
    </Grid>
  )
}
