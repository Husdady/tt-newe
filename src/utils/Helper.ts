// Interfaces
import { PokemonProps } from '@interfaces'

// Types
import { POKEMON_MISTERY_DUNGEON } from '@context/types'

// Typescript Types
import { FilterPokemonsType, MergeObjsType, SetQueryString, SaveInLocalStorage, AddPokemonToLocalStorage, DeletePokemonFromLocalStorage, UploadPokemonStateFromLocalStorage } from '@types'

// Volver al inicio
export function backToHome() {
  window.location.href = window.location.origin + window.location.pathname
}

// Definir clases a un componente
export function classnames(arrClasses: String[]) {
  return arrClasses.filter((el) => !!el).join(' ')
}

// Reemplazar '-' por empacios en blanco
export function replaceHyphens(str: string) {
  return str.replace(/-/g, ' ')
}

// Convertir un string a minúsculas y reemplazar cada ' ' por '-'
export function convertToHyphens(str: string) {
  return str.replace(/ /g, '-').toLowerCase()
}

// Capitalizar un string
export function capitalize(str: string) {
  const lower = str.toLowerCase()
  const firstCharacter = str.charAt(0)

  return firstCharacter.toUpperCase() + lower.slice(1)
}

// Setear una query string a la url de la página
export function setQueryString({ key, value }: SetQueryString) {
  const params = new URLSearchParams(window.location.search)
  params.set(key, value)

  params.toString()
  window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
}

// Filtrar pokemones
export function filterPokemons({ pokemons, pokemonNameToFilter }: FilterPokemonsType) {
  const filteredPokemons = pokemons?.filter((pokemon: PokemonProps) => {
    const pk = pokemon.name.replace(/-/g, ' ').trim()
    return pk.includes(pokemonNameToFilter)
  })

  return filteredPokemons
}

// Obtener la probabilidad que tiene un pokemon para ser atrapado
export function probability(n: number, exp: number) {
  let totalPercentage = {
    value: 0,
    case: '',
  }

  // Definir los casos dependiendo de la experiencia del pokemon
  const cases: any = [
    { name: 'case1', condition: exp <= 50 },
    { name: 'case2', condition: exp > 50 && exp <= 120 },
    { name: 'case3', condition: exp > 120 && exp <= 150 },
    { name: 'case4', condition: exp > 150 && exp <= 190 },
    { name: 'case5', condition: exp > 190 },
  ]

  // Definir las acciones dependiendo de la probabilidad que existe para capturar a un pokemon
  const actions: any = {
    case1: { value: 0.3, case: 'add' },
    case2: { value: 0.25, case: 'subtract' },
    case3: { value: 0.4, case: 'subtract' },
    case4: { value: 0.5, case: 'subtract' },
    case5: { value: 0.75, case: 'subtract' },
  }

  // Obtener el caso que ha pasado la condición
  const successCase = cases.find((item: any) => item.condition)

  // Definir el caso al porcentaje total
  totalPercentage = actions[successCase.name]

  // Disminuir el porcentaje de capturar a un pokemon, dependiendo del caso
  if (totalPercentage.case === 'subtract') {
    return Math.random() <= n - totalPercentage.value
  }

  // Aumentar el porcentaje de capturar a un pokemon, dependiendo del caso
  return Math.random() <= n + totalPercentage.value
}

// Fusionar dos objetos
export function mergeObjs({ prevObj, nextObj, subFields = [], subFieldsToExclude }: MergeObjsType) {
  const result = {
    ...prevObj,
    ...nextObj,
  }

  // Iterar cada campo de subFields  y mezclar cada sub-campo de 'prevObj' con 'nextObj'
  subFields.forEach((subField: string) => {
    result[subField] = {
      ...prevObj[subField],
      ...nextObj[subField],
    }
  })

  const keys = Object.keys(result)

  keys.forEach((key: string) => {
    const fieldToExclude = subFieldsToExclude?.find((subFieldToExclude: string) => {
      return subFieldToExclude === key
    })

    if (fieldToExclude) {
      delete result[fieldToExclude]
    }
  })

  return result
}

// Guardar datos en Local Storage
export function saveInLocalStorage({ key, data }: SaveInLocalStorage) {
  const dataToStringify = JSON.stringify(data)
  localStorage.setItem(key, dataToStringify)
}

// Obtener una key de Local Storage para cargar su información guardada
export function getKeyFromLocalStorage(key: string) {
  const data = localStorage.getItem(key)

  // Si no existe 'data' guardada en Local Storage
  if (data === null) return null

  return JSON.parse(data)
}

// Agregar nuevo pokemon a Local Storage, dependiendo del campo que se está pasando, ejemplo, si el campo es 'favoritePokemons', el pokemon se agrega a los pokemones favoritos en Local Storage
export function addPokemonToLocalStorage({ key, field, pokemon }: AddPokemonToLocalStorage) {
  const data = getKeyFromLocalStorage(key)

  // Si no hay pokemones guardados en el campo 'field' en Local Storage, guardarlos por primera vez
  if (!data[field]) {
    return saveInLocalStorage({
      key: key,
      data: { ...data, [field]: [pokemon] },
    })
  }

  // Si ya existen pokemones guardados en el campo 'field' en Local Storage, concatenarlos con los actuales
  return saveInLocalStorage({
    key: key,
    data: { ...data, [field]: [...data[field], pokemon] },
  })
}

// Eliminar pokemon existente de Local Storage, dependiendo del campo que se está pasando, ejemplo, si el campo es 'favoritePokemons', el pokemon se elimina de los pokemones favoritos en Local Storage
export function deletePokemonFromLocalStorage({ key, field, pokemonId }: DeletePokemonFromLocalStorage) {
  const data = getKeyFromLocalStorage(key)

  const existField = Array.isArray(data[field])

  // Si el campo aún no ha sido agregado a Local Storage, finalizar función
  if (!existField) return

  // Obtener nuevos pokemones, excluyendo al pokemon con el id que se recive de 'pokemonId'
  const newPokemons = data[field].filter((pk: PokemonProps) => {
    return pk.id !== pokemonId
  })

  // Eliminar pokemon dependiendo del campo de Local Storage
  return saveInLocalStorage({
    key: key,
    data: { ...data, [field]: newPokemons },
  })
}

// Obtener la difencia de horas entre la fecha actual y una fecha en específico
export function differenceDate(specificDate: number, limitHour: number) {
  let lastTime = Date.now() - specificDate
  const segs = 1000
  const mins = segs * 60
  const hours = mins * 60
  const days = hours * 24
  const months = days * 30.416666666666668
  const years = months * 12

  const yearsDifference = Math.floor(lastTime / years)

  lastTime -= yearsDifference * years
  const monthsDifference = Math.floor(lastTime / months)

  lastTime -= monthsDifference * months
  const daysDifference = Math.floor(lastTime / days)

  lastTime -= daysDifference * days
  const hourDifference = Math.floor(lastTime / hours)

  return {
    hourDifference: hourDifference,
    passLimit: hourDifference >= limitHour,
  }
}

// Cargar información del estado de nuestro Context guardado en LocalStorage
export function uploadPokemonStateFromLocalStorage({ initialState, savedState }: UploadPokemonStateFromLocalStorage) {
  if (savedState.shop) {
    const diff = differenceDate(savedState.shop.timeForReloadItems, 1)

    if (diff.passLimit) {
      Object.assign(savedState.shop, initialState.shop)

      saveInLocalStorage({
        key: POKEMON_MISTERY_DUNGEON,
        data: { ...savedState, shop: initialState.shop },
      })
    }
  }

  const newPokemonState = mergeObjs({
    prevObj: initialState,
    nextObj: savedState,
    subFields: ['backpack', 'pagination'],
    subFieldsToExclude: ['backup', 'page'],
  })

  return newPokemonState
}
