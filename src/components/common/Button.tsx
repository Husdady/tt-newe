// React
import React from 'react'

// Librarys
import Button from '@material-ui/core/Button'

// Interfaces
import { ButtonProps } from '@interfaces'

// Utils
import { classnames } from '@utils/Helper'

const CustomButton: React.FC<ButtonProps> = ({ type, title, titleStyle, titleClasses, style, className, textColor, backgroundColor, onClick, loading, attributes, startIcon, endIcon }) => {
  const [isLoading, setLoading] = React.useState<boolean>(false)

  // Mostrar loading
  const showLoading = React.useCallback(() => setLoading(true), [])

  // Ocultar loading
  const hideLoading = React.useCallback(() => setLoading(false), [])

  // Definir las clases del botón
  const buttonClasses = React.useMemo(() => {
    return classnames(['scale text-capitalize', className as string])
  }, [])

  // Definir los estilos del botón
  const buttonStyle = React.useMemo(
    () => ({
      ...style,
      color: textColor,
      backgroundColor: backgroundColor,
    }),
    [],
  )

  // Comprobar si el botón debe deshabilitarse
  const buttonDisabled = React.useMemo(() => {
    return loading ? isLoading : attributes?.disabled
  }, [isLoading, loading])

  // Evento 'click' en el botón
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      return onClick({
        event: event,
        showLoading: showLoading,
        hideLoading: hideLoading,
      })
    },
    [isLoading],
  )

  // Renderizar titulo del boton
  const renderTitle = React.useMemo(() => {
    if (!title) return

    return (
      <span className={titleClasses} style={titleStyle}>
        {title}
      </span>
    )
  }, [])

  // Renderizar contenido del botón
  const content = React.useMemo(() => {
    if (isLoading) {
      return loading
    }

    return renderTitle
  }, [isLoading])

  return (
    <Button
      type={type}
      style={buttonStyle}
      onClick={handleClick}
      className={buttonClasses}
      disabled={buttonDisabled}
      endIcon={!isLoading && endIcon}
      startIcon={!isLoading && startIcon}
      {...attributes}
    >
      {content}
    </Button>
  )
}

export default React.memo(CustomButton)
