const health = require('@assets/img/stats/health.webp')
const attack = require('@assets/img/stats/attack.webp')
const defense = require('@assets/img/stats/defense.webp')
const specialAttack = require('@assets/img/stats/special-attack.webp')
const specialDefense = require('@assets/img/stats/special-defense.webp')
const speed = require('@assets/img/stats/speed.webp')

const statsIcons = [
  {
    name: 'attack',
    title: 'Attack',
    icon: attack,
  },
  {
    name: 'defense',
    title: 'Defense',
    icon: defense,
  },
  {
    name: 'hp',
    custom_name: 'health',
    title: 'Health',
    icon: health,
  },
  {
    name: 'speed',
    title: 'Speed',
    icon: speed,
  },
  {
    name: 'special-attack',
    title: 'Special Attack',
    icon: specialAttack,
  },
  {
    name: 'special-defense',
    title: 'Special Defense',
    icon: specialDefense,
  },
]

export default statsIcons
