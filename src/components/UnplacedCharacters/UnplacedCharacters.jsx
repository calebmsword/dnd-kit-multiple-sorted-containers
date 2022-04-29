import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import classNames from 'classnames'

import styles from './UnplacedCharacters.module.css'
import { CharacterCard } from '../CharacterCard'

export const UnplacedCharacters = ({
  containerId,
  items,
  columns,
}) => {
  const { setNodeRef } = useDroppable({ id: containerId })

  return (
    <div 
      style={{
        overflowY: 'auto',
        height: 'calc(100vh - 50px)'
      }}
    >
      <div
        ref={setNodeRef}
        style={{ '--columns': columns }}
        className={classNames(styles.UnplacedContainer)}
      > 
        <ul>
          <SortableContext 
            items={items[containerId]} 
            strategy={rectSortingStrategy}
          >
            {items[containerId].map( (value, index) => {
              return (
                <CharacterCard key={value} id={value} index={index} />
              );
            })}
          </SortableContext>
        </ul>
      </div>
    </div>
  )
}