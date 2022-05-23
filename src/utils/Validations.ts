// Comprobar si es un string vacío
export function isEmptyString(str: string) {
  return str.length === 0
}

// Comprobar si es un arreglo
export function isArray(array: any) {
  return Array.isArray(array)
}

// Comprobar si es un arreglo vacío
export function isEmptyArray(array: any[]) {
  if (!isArray(array)) return false
  return array.length === 0
}

// Comprobar si es un número
export function isUndefined(data: any) {
  return typeof data === 'undefined'
}

// Comprobar si es un objeto
export function isObject(obj: any) {
  return typeof obj === 'object'
}

// Comprobar si es un objeto vacío
export function isEmptyObject(obj: any) {
  return obj && isObject(obj) && Object.keys(obj).length === 0
}
