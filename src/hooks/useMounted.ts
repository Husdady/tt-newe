// React
import { useEffect } from 'react'

// Hook para ejecutar un callback cuando un componente se haya montado
export default function usePokemon(callback: Function, dependencyArray: any[] = []) {
  useEffect(() => {
    let isMounted = true

    // Ejecutar el callback sólo si el componente ha sido montado
    if (isMounted) {
      callback()
    }

    return () => {
      isMounted = false
    }
  }, dependencyArray)
}
