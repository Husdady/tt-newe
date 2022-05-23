// Sounds
const bgMusic = require('@assets/sounds/bg-music.mp3')
const clickEffect = require('@assets/sounds/click-effect.wav')
const invokingEffect = require('@assets/sounds/invoking-effect.mp3')
const pokemonCatchedSoundEffect = require('@assets/sounds/pokemon-catched-sound-effect.mp3')
const pokemonInBallSoundEffect = require('@assets/sounds/pokemon-in-pokeball-sound-effect.wav')
const pokemonNotCatchedSoundEffect = require('@assets/sounds/pokemon-not-catched-sound-effect.wav')
const pokemonAlreadyCatchedSoundEffect = require('@assets/sounds/pokemon-already-catched-sound-effect.wav')

const audioBgMusic = new Audio(bgMusic)
const clickEff = new Audio(clickEffect)
const invokingEff = new Audio(invokingEffect)
const pkInBallEff = new Audio(pokemonInBallSoundEffect)
const pkCatchedEff = new Audio(pokemonCatchedSoundEffect)
const pkNotCatchedEff = new Audio(pokemonNotCatchedSoundEffect)
const pkAlreadyCatchedEff = new Audio(pokemonAlreadyCatchedSoundEffect)

// Iniciar música de fondo
export function playBgMusic() {
  audioBgMusic.loop = true
  audioBgMusic.play()
}

// Pausar música de fondo
export function pauseBgMusic() {
  audioBgMusic.loop = false
  audioBgMusic.pause()
}

// Iniciar efecto de sonido click
export function playClickEffect() {
  clickEff.play()
}

// Iniciar efecto de sonido de pokemon capturado
export function playInvokingEffect() {
  invokingEff.play()
}

// Iniciar efecto de sonido cuando un pokemon está dentro de la pokebola
export function playPkInBallEffect() {
  pkInBallEff.loop = true
  pkInBallEff.play()
}

// Pausar efecto de sonido cuando un pokemon está dentro de la pokebola
export function pausePkInBallEffect() {
  pkInBallEff.loop = false
  pkInBallEff.pause()
}

// Iniciar efecto de sonido cuando un pokemon es capturado
export function playPkCatchedEffect() {
  pkCatchedEff.play()
}

// Iniciar efecto de sonido cuando un pokemon no es capturado
export function playPkNotCatchedEffect() {
  pkNotCatchedEff.play()
}

// Iniciar efecto de sonido cuando un pokemon ya está capturado
export function playPkAlreadyCatchedEffect() {
  pkAlreadyCatchedEff.play()
}
