// React
import { useRef, memo } from 'react'

// Components
import Image from '@common/Image'

// Librarys
import Button from '@material-ui/core/Button'
import StoreIcon from '@mui/icons-material/Store'

// Utils
import { playClickEffect } from '@utils/sounds'

// Components
import ModalPokeballs from './ModalPokeballs'

// Store logo
const storeLogo = require('@assets/img/store.webp')

const buttonStyle = {
  color: 'var(--bg-gray-100)',
}

const iconStyle = {
  fontSize: 22,
}

const textStyle = {
  fontSize: '.85em',
}

const PokemonStore = () => {
  const refModalPokeballs: any = useRef<typeof ModalPokeballs>()

  // Abrir tienda Pokemón
  const handleOpenStore = () => {
    // Iniciar efecto de click
    playClickEffect()

    // Mostral modal que muestra la tienda
    refModalPokeballs.current?.open()
  }

  return (
    <div role="button" className="pokemon-store py-2 px-3 scale shadow-opacity-gray">
      {/* Logo de la tienda */}
      <figure className="mb-0 d-flex justify-content-center">
        <Image url={storeLogo} width={75} height={75} alt="store-logo" title="Pokemon Store" />
      </figure>

      {/* Botón para abrir la tienda */}
      <Button startIcon={<StoreIcon fontSize="large" style={iconStyle} />} className="w-100 text-capitalize" style={buttonStyle} onClick={handleOpenStore}>
        <span style={textStyle} className="press-start-2p">
          Open store
        </span>
      </Button>

      {/* Modal que muestra las pokebolas para comprar */}
      <ModalPokeballs ref={refModalPokeballs} title="Welcome to Pokemon Shop" description="We have everything you are looking for, buy your pokeballs now and catch at your favorite pokemons" />
    </div>
  )
}

export default memo(PokemonStore)
