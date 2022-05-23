// React
import React from 'react'

// Librarys
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography'
import StoreIcon from '@mui/icons-material/Store'
import BackpackIcon from '@mui/icons-material/Backpack'

// Typescript Types
import { PokemonShopItem } from '@types'

// Interfaces
import { ModalPokeballsProps } from '@interfaces'

// Hooks
import usePokemon from '@hooks/usePokemon'
import useMounted from '@hooks/useMounted'

// Styles
import * as styles from '@assets/data/pokemon-modal-pokeballs-styles'

// Utils
import { getKeyFromLocalStorage } from '@utils/Helper'

// Types
import { POKEMON_MISTERY_DUNGEON } from '@context/types'

// Components
import ShopItem from './ShopItem'
import { CloseModal } from './CatchPokemon'

const ModalPokeballs = React.forwardRef((props: ModalPokeballsProps, ref) => {
  const [open, setOpen] = React.useState<boolean>(false)

  // Abrir modal
  const handleOpen = React.useCallback(() => setOpen(true), [])

  // Cerrar modal
  const handleClose = React.useCallback(() => setOpen(false), [])

  const ActiveIcon = React.useCallback(() => {
    const isModeForBuyPokeballs = props.mode === 'buy'

    if (isModeForBuyPokeballs) {
      return <StoreIcon style={styles.titleStyle} fontSize="large" />
    }

    return <BackpackIcon style={styles.titleStyle} fontSize="large" />
  }, [])

  // Definir variables a usar desde otro componente
  React.useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }))

  return (
    <Modal open={open} onClose={handleClose} style={styles.defaultBgColor} aria-labelledby="modal-pokeballs-title" aria-describedby="modal-pokeballs-description">
      <Box sx={styles.boxStyle} className="position-absolute p-4 overflow-hidden">
        <CloseModal onClose={handleClose} style={styles.closeModalStyle} />

        <div className="position-absolute top-0 start-0 bottom-0 end-0" style={styles.wrapperStyle} />

        <section className="position-relative" style={styles.sectionStyle}>
          <ActiveIcon />

          {/* Título */}
          <Typography variant="h6" component="h2" className="mt-2 press-start-2p" style={styles.titleStyle}>
            {props.title}
          </Typography>

          {/* Descripción */}
          <Typography className="mt-3 press-start-2p" style={styles.descriptionStyle}>
            {props.description}
          </Typography>

          {/* Items para mostrar */}
          <ShopItems mode={props.mode} />
        </section>
      </Box>
    </Modal>
  )
})

export default React.memo(ModalPokeballs)

ModalPokeballs.defaultProps = {
  mode: 'buy',
}

// <------------------------ Extra Components ------------------------>
export const ShopItems = React.memo((props: any) => {
  const { shop, backpack } = usePokemon()

  const activeItems = React.useMemo(() => {
    return props.mode === 'buy' ? shop.items : backpack.items
  }, [])

  const [items, setItems] = React.useState<PokemonShopItem[]>(activeItems)

  useMounted(() => {
    // Obtener el estado de Local Storage
    const storage = getKeyFromLocalStorage(POKEMON_MISTERY_DUNGEON)

    // Comprobar si existe el estado de Local Storage
    if (storage !== null) {
      // Comprobar el tipo de modo, en caso sea buy, es porque se está mostrando la tienda de lo contrario la mochil
      const activeMode = props.mode === 'buy' ? 'shop' : 'backpack'

      // Comprobar si existe las propiedad 'shop' o 'backpack' en Local Storage
      if (storage[activeMode]) {
        // Obtener los items que están dentro de esa propiedad
        const currentItems = storage[activeMode].items

        // Actualizar items
        setItems(currentItems)
      }
    }
  }, [])

  return (
    <Grid container spacing={1} className="py-4">
      {items.map((item: PokemonShopItem) => (
        <Grid key={item.id} item xs={4}>
          <ShopItem {...item} mode={props.mode} />
        </Grid>
      ))}
    </Grid>
  )
})
