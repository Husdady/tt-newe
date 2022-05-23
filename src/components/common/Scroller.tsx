// React
import React from 'react'

// Hooks
import useMounted from '@hooks/useMounted'

// Interfaces
import { ScrollerProps } from '@interfaces'

// Components
import Button from '@common/Button'
import Pagination from './Pagination'

const Scroller: React.FC<ScrollerProps> = ({ next, limit, dataLength, onLoadMore, loadMoreButton }) => {
  const [hasMore, setHasMore] = React.useState<boolean>(true)

  // Ocultar botón que carga más items
  const hideLoadMoreButton = React.useCallback(() => setHasMore(false), [])

  // Botón que carga más items
  const LoadMoreButton = React.useCallback(() => {
    if (!hasMore) return null

    return <Button {...loadMoreButton} onClick={onLoadMore} backgroundColor={loadMoreButton?.backgroundColor} />
  }, [hasMore, next as string])

  useMounted(() => {
    const needHideLoadMoreButton = next === null || dataLength >= limit

    if (needHideLoadMoreButton) {
      hideLoadMoreButton()
    } else {
      !hasMore && setHasMore(true)
    }
  }, [next, dataLength])

  return (
    <React.Fragment>
      {/* Botón para cargar más items */}
      <LoadMoreButton />

      {/* Paginación */}
      {!hasMore && <Pagination allItemsAreUploaded={next === null} />}
    </React.Fragment>
  )
}

export default React.memo(Scroller)
