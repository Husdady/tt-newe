// React
import React, { useEffect, useState, useCallback, useMemo, useImperativeHandle, forwardRef, memo } from 'react'

// Components
import Image from '@common/Image'

// Librarys
import Button from '@material-ui/core/Button'

// Hooks
import usePokemon from '@hooks/usePokemon'
import useMounted from '@hooks/useMounted'

// Types
import { CatchPokemonState, ShowModalType, PokemonShopItem } from '@types'

// Interfaces
import { PokemonUtilities, ModalContentProps, CloseModalProps } from '@interfaces'

// Utils
import { classnames, probability } from '@utils/Helper'
import { pausePkInBallEffect, playPkInBallEffect, playPkCatchedEffect, playPkNotCatchedEffect, playPkAlreadyCatchedEffect } from '@utils/sounds'

// Images
const pokeball = require('@assets/img/game/pokeball-animation.gif')
const openedPokeball = require('@assets/img/game/opened-pokeball.webp')
const catchedPokeball = require('@assets/img/game/pokeball-catch-animation.gif')

const soundsForViews: any = {
  DefaultContent: () => playPkInBallEffect(),
  PokemonAlreadyCatched: () => playPkAlreadyCatchedEffect(),
}

const closeModalStyle = {
  fontSize: '2.5rem',
  color: 'var(--bs-gray-700)',
}

const initialState = {
  show: false,
  pokeballType: null,
  pokemonState: 'DefaultContent',
}

const CatchPokemon = forwardRef(({ pokemon }: PokemonUtilities, ref) => {
  const [state, setState] = useState<CatchPokemonState>(initialState)
  const { backpack, myPokemons, addCatchedPokemon, consumePokemonShopItem } = usePokemon()

  // Mostrar modal
  const show = useCallback(({ itemBackpack, pokeballType }: ShowModalType) => {
    setState((prevState) => ({
      ...prevState,
      show: true,
      itemBackpack: itemBackpack,
      pokeballType: pokeballType,
    }))
  }, [])

  // Ocultar modal
  const hide = useCallback(() => {
    // Pausar efecto de sonido cuando un pokemon está dentro de la pokebola
    pausePkInBallEffect()

    setState((prevState) => ({
      ...prevState,
      show: false,
      pokemonState: 'DefaultContent',
    }))
  }, [])

  // Evento 'click' en pokebola para atrapar al pokemon, este evento sólo se ejecutará en el componente DefaultContent
  const handleOpenPokeball = useCallback(() => {
    if (state.pokeballType === null) return

    // Pausar efecto de sonido cuando un pokemon está dentro de la pokebola
    pausePkInBallEffect()

    // Obtener el ítem de la mochila
    const itemBackpack = backpack.items.find((item: PokemonShopItem) => item.id === state.itemBackpack)

    console.log('[maita demasiado]', backpack.items, state.pokeballType)

    if (itemBackpack) {
      console.log('[maita demasiado]')
      // Consumir pokebola de mochila
      consumePokemonShopItem({
        itemId: itemBackpack.id,
      })
    }

    const pokeballsTypes: any = {
      pokeball: probability(0.4, pokemon.experience),
      superPokeball: probability(0.6, pokemon.experience),
      ultraPokeball: probability(0.8, pokemon.experience),
    }

    // El pokemon no ha sido capturado
    if (!pokeballsTypes[state.pokeballType]) {
      // Iniciar efecto de sonido cuando un pokemon no es atrapado
      playPkNotCatchedEffect()

      return setState((prevState) => ({
        ...prevState,
        pokemonState: 'PokemonNotCatched',
      }))
    }

    // Iniciar efecto de sonido cuando un pokemon es atrapado
    playPkCatchedEffect()

    // Agregar pokemon a mis pokemones
    addCatchedPokemon({ pokemon })

    return setState((prevState) => ({
      ...prevState,
      pokemonState: 'PokemonCatched',
    }))

    // getPokemonsCatchedFromLocalStorage({})
  }, [state.pokeballType, backpack])

  // Vista cuando un pokemon es atrapado
  const PokemonCatched: React.ReactNode = useMemo(() => {
    return (
      <ModalContent
        image={catchedPokeball}
        altImage="pokeball-animated-catched"
        imageClass="animate__zoomInDown catched-pokeball"
        title={`You have successfully caught ${pokemon.name}, you can see the pokemon trapped in the section of My Pokemons.`}
        titleClass="animate__zoomInDown mx-auto message-catched-pokemon"
      />
    )
  }, [])

  // Vista cuando un pokemon no ha sido atrapado
  const PokemonNotCatched: React.ReactNode = useMemo(() => {
    return (
      <ModalContent
        image={openedPokeball}
        imageClass="opened-pokeball"
        altImage="pokeball-animated-not-catched"
        title={`You couldn't catch ${pokemon.name}, the pokemon has fled!`}
        titleClass="animate__fadeInUp message-not-catched-pokemon"
      />
    )
  }, [])

  // Vista cuando un pokemon ya ha sido atrapado
  const PokemonAlreadyCatched: React.ReactNode = useMemo(() => {
    return (
      <ModalContent
        image={pokemon.defaultImage}
        altImage="pokeball-isalready-catched"
        imageClass="animate__pulse animate__infinite pk-catched"
        title={`${pokemon.name} has already been caught!`}
        titleClass="animate__shakeY default-message"
      />
    )
  }, [])

  // Vista por defecto
  const DefaultContent: React.ReactNode = useMemo(() => {
    return (
      <ModalContent
        image={pokeball}
        imageClass="default-pokeball animate__rollIn"
        altImage="default-pokeball"
        title="Touch the pokeball to see if you caught the pokemon"
        titleClass="animate__fadeIn animate__infinite default-message"
        onClickImage={handleOpenPokeball}
      />
    )
  }, [state.pokeballType, backpack])

  // Definir los posibles contenidos de la modal dependiendo si el pokemon está recien atrapado, si ya lo está o aún no ha sido atrapado
  const possiblesModalContents: any = useMemo(() => {
    return {
      PokemonCatched: PokemonCatched,
      PokemonNotCatched: PokemonNotCatched,
      PokemonAlreadyCatched: PokemonAlreadyCatched,
      DefaultContent: DefaultContent,
    }
  }, [state.pokeballType, backpack])

  // Renderizar contenido de la modal
  const content = useMemo(() => {
    return possiblesModalContents[state.pokemonState]
  }, [state.pokemonState, state.pokeballType, backpack])

  // Definir hook para poder acceder a las funciones 'show' y 'hide'
  useImperativeHandle(ref, () => ({
    show: show,
    hide: hide,
  }))

  useMounted(() => {
    const isAlreadyPokemonCatched = myPokemons.find((pk) => {
      return pk.id === pokemon.id
    })

    // Comprobar si el pokemon ya ha sido agregado a favoritos, actualizar el estado a true, para mostrar el ícono del corazón como activo
    if (isAlreadyPokemonCatched) {
      setState((prevState) => ({
        ...prevState,
        pokemonState: 'PokemonAlreadyCatched',
      }))
    }
  }, [state.show])

  useEffect(() => {
    if (state.show) {
      const sound = soundsForViews[state.pokemonState]

      // Ejecutar efecto de sonido dependiendo de la vista
      if (sound) sound()
    }
  }, [state.show, state.pokemonState])

  if (!state.show) {
    return null
  }

  return (
    <div className="pokemon-modal position-fixed top-0 start-0 bottom-0 end-0 press-start-2p overflow-hidden d-flex flex-wrap align-items-center justify-content-center">
      <CloseModal onClose={hide} style={closeModalStyle} />
      <div className="content mb-4">{content}</div>
    </div>
  )
})

export default memo(CatchPokemon)

// <------------------------ Extra Components ------------------------>
export const CloseModal = memo<CloseModalProps>(({ style, onClose }) => {
  return (
    <Button id="close-modal" onClick={onClose} style={style} className="press-start-2p position-absolute">
      X
    </Button>
  )
})

const ModalContent: React.FC<ModalContentProps> = ({ title, titleClass, image, altImage, imageClass, onClickImage }) => {
  // Definir las clases de la imagen
  const imageClasses = classnames(['mx-auto mb-0 animate__animated d-flex justify-content-center', imageClass])

  // Definir las clases del título
  const titleClasses = classnames(['animate__animated position-relative message px-5 mb-0 text-center', titleClass])

  return (
    <React.Fragment>
      {/* Imagen del contenido de la modal */}
      <Image url={image} alt={altImage} wrapperClassname={imageClasses} onClick={onClickImage} />

      {/* Mensaje del contenido de la modal */}
      <h5 className={titleClasses}>{title}</h5>
    </React.Fragment>
  )
}
