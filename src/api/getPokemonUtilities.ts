// Librarys
import { toast } from 'react-hot-toast'

// Types
import { GetPokemonUtilities } from '@types'

const defaultDescription = 'The personality of this pokemon is a mystery'

export default async function getPokemonUtilities({ urls, language, setUtilities }: GetPokemonUtilities) {
  // Definir las promesas a usarse
  const promises = urls.map((url: String) => {
    return fetch(url as string)
      .then((obj) => obj?.json())
      .catch((e) => e)
  })

  try {
    // Realizar peticiones
    const results = await Promise.all(promises)

    const validResults = results.filter((result) => !(result instanceof Error))

    const item = validResults[1]?.descriptions.find((el: any) => {
      return el.language.name === language
    })

    const localizations = validResults[0]?.map((el: any) => el.location_area.name)

    // Setear campos extras del pokemon
    setUtilities({
      description: item?.description || defaultDescription,
      localizations: localizations || [],
    })
  } catch(err: any) {
    // Mostrar error por consola
    console.error('[getPokemonUtilities]', err)

    const defaultMessage = 'An error ocurred for get pokemon utilities'

    // Mostrar error por pantalla
    toast.error(err.message || defaultMessage)
  }
}
