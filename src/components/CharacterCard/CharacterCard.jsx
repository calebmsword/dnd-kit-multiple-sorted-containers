import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import classNames from 'classnames';
import styles from './CharacterCard.module.css'

export const CharacterCard = React.memo( ({ id, index }) => {
  const {
    setNodeRef,
    listeners,
    isDragging,
    transform,
    transition
  } = useSortable({ id })

  return (
    <li
      ref={setNodeRef}
      className={classNames(
        styles.CharacterCard,
        isDragging && styles.dragging
      )}
      style={{
        transition,
        '--translate-x': transform
          ? `${Math.round(transform.x)}px`
          : undefined,
        '--translate-y': transform
          ? `${Math.round(transform.y)}px`
          : undefined,
        '--scale-x': transform?.scaleX
          ? `${transform.scaleX}`
          : undefined,
        '--scale-y': transform?.scaleY
          ? `${transform.scaleY}`
          : undefined,
        '--index': index,
      }}
      data-cypress='draggable-item'
      {...listeners}
    >
      {id /* once we use images, we will make li a self-closing tag */} 
    </li>
  );
})