// React
import React from 'react'

// Components
import Image from '@common/Image'

// Librarys
import Grid from '@material-ui/core/Grid'
import Divider from '@mui/material/Divider'

// Types
import { ItemsLocalization } from '@types'

// Interfaces
import { PokemonLocalizationProps } from '@interfaces'

// Utils
import { replaceHyphens } from '@utils/Helper'
import { isEmptyArray } from '@utils/Validations'

const potion = require('@assets/img/pk-tabs/potion.webp')
const place = require('@assets/img/pk-tabs/place.webp')
const specialAbilityImg = require('@assets/img/pk-tabs/special-ability.webp')

const textStyle = {
  fontSize: '.65em',
}

// Renderizar elementos
const renderItems = ({ items, altImage, defaultImage, emptyMessage }: ItemsLocalization) => {
  const emptyItems = isEmptyArray(items)

  // Elementos vacíos
  if (emptyItems) {
    return (
      <span className="d-block text-center" style={textStyle}>
        {emptyMessage}
      </span>
    )
  }

  return items.map((item: string, i: number) => (
    <Grid key={`${i + 1}`} item xs={6} className="d-flex align-items-center justify-content-center">
      <Image url={defaultImage} width={25} height={25} alt={altImage} />
      <span style={textStyle} className="ms-2 text-break text-capitalize">
        {replaceHyphens(item)}
      </span>
    </Grid>
  ))
}

const Localization: React.FC<PokemonLocalizationProps> = ({ places, heldItems, specialAbilities }) => {
  // Renderizar objetos que posee el pokemon
  const pkPlaces = renderItems({
    items: places,
    altImage: 'place',
    defaultImage: place,
    emptyMessage: 'The location of this pokemon is a mystery',
  })

  // Renderizar objetos que posee el pokemon
  const pkItems = renderItems({
    items: heldItems,
    altImage: 'potion',
    defaultImage: potion,
    emptyMessage: 'This pokemon not have items',
  })

  // Renderizar habilidades especiales del pokemon
  const abilities = renderItems({
    items: specialAbilities,
    altImage: 'special-abiliy',
    defaultImage: specialAbilityImg,
    emptyMessage: 'This pokemon not special abilities',
  })

  return (
    <div className="extra-information">
      <Divider className="mb-1" />

      <h6 className="text-center py-2 px-4 mb-0">Possible places of appearance:</h6>

      <Divider className="mb-1" />

      {/* Habilidades especiales del pokemon */}
      <Grid container spacing={1} className="p-3" justifyContent="space-between">
        {pkPlaces}
      </Grid>

      <Divider className="mb-1" />

      <h6 className="text-center p-2 mb-0">Special abilities:</h6>

      <Divider className="mb-1" />

      {/* Habilidades especiales del pokemon */}
      <Grid container spacing={1} className="p-3" justifyContent="space-between">
        {abilities}
      </Grid>

      <Divider className="mb-1" />

      <h6 className="text-center py-2 mb-0">Items:</h6>

      <Divider className="mb-1" />

      {/* Objetos que puede poseer el pokemon */}
      <Grid container spacing={1} className="p-3" justifyContent="space-between">
        {pkItems}
      </Grid>
    </div>
  )
}

const shouldComponentUpdate = (prevProps: PokemonLocalizationProps, nextProps: PokemonLocalizationProps) => {
  return prevProps.places !== nextProps.places
}

export default React.memo(Localization, shouldComponentUpdate)
