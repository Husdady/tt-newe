// React
import React from 'react'

// Components
import Image from '@common/Image'
import Counter from '@common/Counter'

// Librarys
import { toast } from 'react-hot-toast'
import Button from '@material-ui/core/Button'

// Hooks
import usePokemon from '@hooks/usePokemon'

// Types
import { PokemonShopItem } from '@types'

// Utils
import { playClickEffect } from '@utils/sounds'
import { convertToHyphens } from '@utils/Helper'

const itemStyle = {
  borderRadius: 10,
  backgroundColor: 'rgba(255, 255, 255, .15)',
}

const titleStyle = {
  fontSize: '.65em',
  lineHeight: '1.45',
  color: 'var(--bs-white)',
}

const buttonStyle = {
  ...titleStyle,
  backgroundColor: 'var(--bs-warning)',
}

const ShopItem: React.FC<PokemonShopItem> = ({ name, units, image, ...moreProps }) => {
  const { buyPokemonShopItem } = usePokemon()
  const refCounter: any = React.useRef<typeof Counter>()

  // Definir la propiedad alt de la imagen
  const altImage = React.useMemo(() => convertToHyphens(name), [])

  // Comprobar si el modo activo es comprar
  const isModeBuy = React.useMemo(() => moreProps.mode === 'buy', [])

  // Evento 'click' en botón comprar
  const onBuyItem = React.useCallback(() => {
    const max = refCounter?.current?.max
    const count = refCounter?.current?.count

    if (max === 0) {
      return toast.error(`The ${name} are over, come back later to buy new ones`)
    }

    // Iniciar efecto de click
    playClickEffect()

    const item = {
      name: name,
      units: units,
      image: image,
      ...moreProps,
    }

    toast.success(`You have bought ${count} ${name}`)

    const newMax = max - count

    refCounter?.current?.setMax(newMax)
    refCounter?.current?.setCount(newMax)

    buyPokemonShopItem({
      item: item,
      unitsPurchased: count,
    })
  }, [])

  return (
    <article style={itemStyle} className="py-3 px-2 overflow-hidden">
      {/* Imagen del producto */}
      <Image url={image.url} width={image.width} height={image.height} alt={altImage} wrapperClassname="d-block mx-auto" title={name} />

      {/* Nombre del producto */}
      <h6 style={titleStyle} className="my-2 text-center press-start-2p text-break">
        {name}
      </h6>

      {/* Stock del producto */}
      {isModeBuy && <Counter ref={refCounter} defaultValue={units} />}
      {!isModeBuy && (
        <span className="d-block text-center" style={titleStyle}>
          {units} units
        </span>
      )}

      {/* Botón para comprar */}
      {isModeBuy && (
        <Button style={buttonStyle} onClick={onBuyItem} className="scale shadow-opacity-dark press-start-2p d-block mx-auto text-capitalize">
          Buy
        </Button>
      )}
    </article>
  )
}

const shouldComponentUpdate = (prevProps: PokemonShopItem, nextProps: PokemonShopItem) => {
  return prevProps.id === nextProps.id
}

export default React.memo(ShopItem, shouldComponentUpdate)
