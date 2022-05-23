// React
import React from 'react'

// Components
import Image from '@common/Image'

// Interfaces
import { EmptyProps } from '@interfaces'

const emptyStyle = {
  borderRadius: '.5em',
  backgroundColor: 'var(--bg-opacity-dark)',
}

const Empty:React.FC<EmptyProps> = ({ image, title, message, children }) => {
	return (
		<div className="d-flex h-100 py-5 align-items-center justify-content-center  flex-column text-muted text-center shadow-opacity-dark" style={emptyStyle}>
      {/* Imagen */}
      <Image url={image} alt="empty-content" />
      <h4 className="text-secondary mt-4 mb-3 press-start-2p">{title}</h4>
      <p className="col-10 mx-auto press-start-2p">{message}</p>
      {children}
    </div>
	)
}

export default Empty
