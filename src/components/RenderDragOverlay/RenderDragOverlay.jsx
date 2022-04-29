import { createPortal } from 'react-dom'
import { DragOverlay, defaultDropAnimation } from '@dnd-kit/core'

import { CharacterCard } from '../CharacterCard';

const dropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

export const RenderDragOverlay = ({ activeId }) => {
  return (
    createPortal(
      <DragOverlay adjustScale={false} dropAnimation={dropAnimation}>  
        {activeId
          ? <CharacterCard id={activeId} />
          : null}
      </DragOverlay>,
      document.body
    )
  )
}