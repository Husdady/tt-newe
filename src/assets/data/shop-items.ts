// Pokeballs
const pokeball = require('@assets/img/pokeballs/pokeball.webp')
const superPokeball = require('@assets/img/pokeballs/super-pokeball.webp')
const ultraPokeball = require('@assets/img/pokeballs/ultra-pokeball.webp')

const items = [
  {
    id: 'a30f488c-9c0a-4968-9399-ef85c2c78f22',
    name: 'Pokeball',
    units: 50,
    cost: 'free',
    image: {
      url: pokeball,
      width: 30,
      height: 30,
    },
  },
  {
    id: 'd4369fc2-18d0-4a02-8776-8446c7be29dd',
    name: 'Super Pokeball',
    units: 30,
    cost: 'free',
    image: {
      url: superPokeball,
      width: 30,
      height: 30,
    },
  },
  {
    id: 'fbb535d9-b350-419f-ab5d-a32d74c0df68',
    name: 'Ultra Pokeball',
    units: 30,
    cost: 'free',
    image: {
      url: ultraPokeball,
      width: 30,
      height: 30,
    },
  },
]

export default items
