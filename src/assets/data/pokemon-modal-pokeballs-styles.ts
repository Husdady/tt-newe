const bgModal = require('@assets/img/bg-pokemon-store.webp')

export const defaultBgColor = {
  backgroundColor: 'rgba(0, 0, 0, .65)',
}

export const wrapperStyle = {
  zIndex: 100,
  backgroundColor: 'rgba(0, 0, 0, .73)',
}

export const sectionStyle = {
  zIndex: 400,
}

export const titleStyle = {
  color: 'var(--bs-yellow)',
}

export const descriptionStyle = {
  fontSize: '.75em',
  color: 'var(--bg-gray-100)',
}

export const closeModalStyle = {
  ...descriptionStyle,
  right: 0,
  zIndex: 9999,
}

export const boxStyle = {
  width: 400,
  outline: 'none',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 4,
  bgcolor: 'background.paper',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundImage: `url(${bgModal})`,
}
