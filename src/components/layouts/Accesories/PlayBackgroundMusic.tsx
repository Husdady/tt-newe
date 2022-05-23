// React
import { FC, useState, useCallback } from 'react'

// Librarys
import Button from '@material-ui/core/Button'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'

// Types
import { ActivePlayIconProps } from '@interfaces'

// Utils
import { playBgMusic, pauseBgMusic, playClickEffect } from '@utils/sounds'

const buttonStyle = {
  top: '3em',
  right: '3em',
  color: 'var(--bs-yellow)',
  backgroundColor: 'var(--bg-opacity-dark)',
}

const PlayBackgroundMusic = () => {
  const [isPlay, setPlay] = useState<boolean>(false)

  // Iniciar música de fondo
  const handlePlayBackgroundMusic = useCallback(() => {
    setPlay(true)
    playClickEffect()
    playBgMusic()
  }, [])

  // Pausar música de fondo
  const handlePauseBackgroundMusic = useCallback(() => {
    setPlay(false)
    pauseBgMusic()
  }, [])

  // Evento 'click' en botón
  const handleClick = useCallback(() => {
    if (isPlay) {
      return handlePauseBackgroundMusic()
    }

    handlePlayBackgroundMusic()
  }, [isPlay])

  return (
    <Button style={buttonStyle} onClick={handleClick} variant="contained" className="play-background-music text-capitalize position-absolute scale" startIcon={<ActiveIcon isPlay={isPlay} />}>
      {!isPlay ? 'Play' : 'Pause'} Background Music
    </Button>
  )
}

export default PlayBackgroundMusic

// <------------------------ Extra Components ------------------------>
const ActiveIcon: FC<ActivePlayIconProps> = ({ isPlay }) => {
  if (!isPlay) {
    return <PlayCircleFilledIcon />
  }

  return <PauseCircleFilledIcon />
}
