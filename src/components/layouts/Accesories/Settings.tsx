// React
import React from 'react'

// Librarys
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

// Hooks
import usePokemon from '@hooks/usePokemon'

// Utils
import { playClickEffect } from '@utils/sounds'

// Assets
import buttons from '@assets/data/settings-buttons'

// Types
import { ActionButtonType } from '@types'

// Interfaces
import { ActionButtonProps } from '@interfaces'

// Components
import Image from '@common/Image'
import PokemonStore from './Store'
import ModalPokeballs from './ModalPokeballs'

const Settings = () => {
  const refModalPokeballs: any = React.useRef<typeof ModalPokeballs>()

  // Mostrar mochila
  const showBackpack = React.useCallback(() => {
    return refModalPokeballs.current?.open()
  }, [])

  return (
    <div id="settings" className="position-absolute">
      {/* Tienda Pokemón */}
      <PokemonStore />

      {/* Botones que ejecutan una acción */}
      <ActionButtons showBackpack={showBackpack} />

      {/* Modal que muestra la mochila */}
      <ModalPokeballs ref={refModalPokeballs} mode="backpack" title="My Bacpack" description="This is your backpack when you buy items from the store, they will appear here" />
    </div>
  )
}

export default React.memo(Settings)

// <------------------------ Extra Components ------------------------>
const ActionButtons = ({ showBackpack }: any) => {
  const { activeTab, changeActiveTab } = usePokemon()

  // Evento que actualiza la pestaña activa
  const onChangeActiveTab = React.useCallback(
    (tab: string | boolean) => {
      // Iniciar efecto de click
      playClickEffect()

      if (typeof tab === 'string') {
        // Actualizar pestaña activa
        return changeActiveTab(tab)
      }

      showBackpack()
    },
    [activeTab],
  )

  return (
    <Grid container spacing={1} className="mt-2">
      {buttons.map((el: ActionButtonType) => (
        <ActionButton key={el.id} {...el} isActive={activeTab === el.activeTab} onAction={() => onChangeActiveTab(el.activeTab)} />
      ))}
    </Grid>
  )
}

const shouldComponentUpdate = (prevProps: ActionButtonProps, nextProps: ActionButtonProps) => {
  return prevProps.isActive === nextProps.isActive
}

const ActionButton = React.memo((props: ActionButtonProps) => {
  return (
    <Grid item xs={3}>
      <Button onClick={props.onAction} className={`item w-100 scale shadow-opacity-dark ${props.isActive ? 'active' : 'desactive'}`} title={props.title}>
        <Image url={props.image} width={30} height={30} alt={props.id} />
      </Button>
    </Grid>
  )
}, shouldComponentUpdate)
