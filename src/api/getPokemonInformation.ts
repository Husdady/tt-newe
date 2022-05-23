// Types
import { Pokemon, PokemonType, PokemonAbility } from '@types'

const defaultPkImage = require('@assets/img/who-is-that-pokemon.webp')

const regx = /-f|-m|-/g

export default function getPokemonInformation(pokemon: Pokemon) {
  return {
    id: pokemon.id,
    order: pokemon.order,
    stats: pokemon.stats,
    height: pokemon.height,
    weight: pokemon.weight,
    experience: pokemon.base_experience,
    location_area_encounters: pokemon.location_area_encounters,
    name: pokemon.name.replace(regx, ' '),
    defaultImage: pokemon.sprites.front_default || defaultPkImage,
    moves: pokemon.moves.map(({ move }: any) => move.name),
    heldItems: pokemon.held_items.map(({ item }: any) => item?.name),
    types: pokemon.types.map(({ type }: PokemonType) => type.name),
    specialAbilities: pokemon.abilities.map(({ ability }: PokemonAbility) => ability?.name),
  }
}
