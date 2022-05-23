// React
import { FC, memo } from 'react'

// Librarys
import { LazyLoadImage } from 'react-lazy-load-image-component'

// Types
import { ImageProps } from '@interfaces'

const Image: FC<ImageProps> = ({ url, alt, name, width, height, className, onClick, wrapperClassname }) => {
  const wrapperProps = {
    className: wrapperClassname,
  }

  return <LazyLoadImage src={url} alt={alt} title={name} effect="blur" className={className} width={width} height={height} onClick={onClick} wrapperProps={wrapperProps} />
}

export default memo(Image)
