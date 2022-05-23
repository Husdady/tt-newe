const pikachu = require('@assets/img/settings/pikachu.webp')
const pokeball = require('@assets/img/settings/pokeball.webp')
const favorite = require('@assets/img/settings/favorite.webp')
const backpack = require('@assets/img/settings/backpack.webp')

const buttons = [
  {
    id: 'pokeball-settings',
    image: pokeball,
    title: 'Pokemons',
    activeTab: 'pokemons',
  },
  {
    id: 'pikachu-settings',
    image: pikachu,
    title: 'My Pokemons',
    activeTab: 'myPokemons',
  },
  {
    id: 'favorite-settings',
    image: favorite,
    title: 'My favorite Pokemons',
    activeTab: 'favoritePokemons',
  },
  {
    id: 'backpack-settings',
    image: backpack,
    activeTab: false,
    title: 'My Backpack',
  },
]

export default buttons
