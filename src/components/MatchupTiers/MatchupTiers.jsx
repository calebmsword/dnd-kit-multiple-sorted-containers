import React from 'react'
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import classNames from 'classnames';
import { RemoveButton } from '../RemoveButton';

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
          <SingleMatchupTier
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

export const SingleMatchupTier = ({
  containerId,
  columns,
  items,
  // onRemove, might need to pass a method that has access to parent state
}) => {

  const onRemove = () => {
    // implement 
  }
  
  // hooks can't be called in a callback, so I had to make SingleMatchupTier its own component 
  // or the following hook would have been in the callback on lines 22-31
  const { setNodeRef } = useDroppable({ id: containerId })

  return (
    <div
      ref={setNodeRef}
      style={{ '--columns': columns }}
      className={classNames(styles.MatchupTierContainer)}
    >
      { /* Container Header */ }
      <div className={styles.MatchupTierHeader}>
        {containerId}
        <RemoveButton onClick={onRemove} />
      </div>
      
      { /* Draggable character cards */ }
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
