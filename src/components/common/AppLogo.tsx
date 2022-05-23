// React
import { memo } from 'react'

// Pokemon Logo
const logo = require('@assets/img/logo.webp')

const AppLogo = () => {
  return <img id="pokemon-logo" src={logo} width="400" height="400" alt="pokemon-logo" className="d-block mx-auto" />
}

export default memo(AppLogo)
