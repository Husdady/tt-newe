// React
import { Suspense, lazy } from 'react'

// Components
import Loading from '@loaders/Loading.Preload'

// Librarys
import { Toaster } from 'react-hot-toast'
import Container from '@material-ui/core/Container'

// Library Styles
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

// Styles
import '@styles/global.css'
import '@styles/pokemon.css'
import '@styles/pokemon.modal.css'
import '@styles/loaders/loading.invoke.css'
import '@styles/loaders/loading.preload.css'

// Lazy Components
const AppLogo = lazy(() => import('@common/AppLogo'))
const ErrorBoundary = lazy(() => import('@common/ErrorBoundary'))
const PokemonsViews = lazy(() => import('@containers/PokemonsViews'))
const Seeker = lazy(() => import('@layouts/Accesories/Seeker'))
const Settings = lazy(() => import('@layouts/Accesories/Settings'))
const PlayBackgroundMusic = lazy(() => import('@layouts/Accesories/PlayBackgroundMusic'))

// Context
const PokemonState = lazy(() => import('@context/Pokemon.State'))

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <PokemonMisteryDungeon />
      </ErrorBoundary>
    </Suspense>
  )
}

export default App

const toastOptions = {
  duration: 4000,
  className: 'press-start-2p',
  style: {
    fontSize: '0.85em',
  },
}

// <------------------------ Extra Components ------------------------>
export const PokemonMisteryDungeon = () => {
  return (
    <PokemonState>
      {/* Ajustes */}
      <Settings />

      {/* Toaster */}
      <Toaster toastOptions={toastOptions} />
      {/* Botón para iniciar música de fondo */}
      <PlayBackgroundMusic />

      <Container id="main-container" maxWidth="sm" className="py-5">
        {/* Logo */}
        <AppLogo />

        {/* Buscador */}
        <Seeker />
      </Container>

      <Container className="pb-5">
        <PokemonsViews />
      </Container>
    </PokemonState>
  )
}
