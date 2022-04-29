import React from 'react'
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import classNames from 'classnames';
import { Remove } from '../Item/components/Remove'

import styles from './MatchupTiers.module.css'
import { CharacterCard } from '../CharacterCard';

export const MatchupTiers = ({
  containers,
  leftPanelColumns,
  items,
}) => {
  return (
    <div 
      style={{
        overflowY: 'auto',
        height: 'calc(100vh - 100px)'
      }}
    >
      {containers.slice(1,containers.length).map( (containerId) => {
        return (
          <SingleMatchup
            key={containerId}
            containerId={containerId}
            columns={leftPanelColumns}
            items={items}
          />
        )
      })}
    </div>
  )
}


export const SingleMatchup = ({
  containerId,
  columns,
  items,
  // onRemove, might need to pass a method that has access to Parent state
}) => {

  const onRemove = () => {
    // implement 
  }
  const { setNodeRef } = useDroppable({ id: containerId })

  return (
    <div
        ref={setNodeRef}
        style={{ '--columns': columns }}
        className={classNames(styles.Container)}
      >
        {
        // ================================================================= 
        // Container Header
        // =================================================================
        }
        <div className={styles.Header}>
          {containerId}
          <div className={styles.Actions}>
            <Remove onClick={onRemove} />
          </div>
        </div>
        
        {
        // ================================================================= 
        // Character cards shown in the container
        // =================================================================
        }
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
  )
}

// export function Remove() {
//   return <div>Remove</div>
// }