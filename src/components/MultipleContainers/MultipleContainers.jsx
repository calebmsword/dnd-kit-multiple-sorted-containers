import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  closestCenter,
  pointerWithin,
  rectIntersection,
  DndContext,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
  useSensor,
  MeasuringStrategy,
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';
import { coordinateGetter } from './multipleContainersKeyboardCoordinates';
import Split from 'react-split';

import './MultipleContainers.css'

import { MatchupTiers } from '../MatchupTiers/MatchupTiers';
import { LeftHeader } from '../LeftHeader/LeftHeader';
import { RightHeader } from '../RightHeader/RightHeader';
import { UnplacedCharacters } from '../UnplacedCharacters/UnplacedCharacters';

import { characterList } from '../../entities/characters'
import { RenderDragOverlay } from '../RenderDragOverlay/RenderDragOverlay';

export const MultipleContainers = () => {
  const [items, setItems] = useState(   
    () => ({
      unplaced: characterList.map(item => item.id.toString()),
      minus2: [],
      minus1: [],
      even: [],
      plus1: [],
      plus2: [],
    })
  );

  const [containers, setContainers] = useState(Object.keys(items));
  const [activeId, setActiveId] = useState(null);
  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);  
  
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();
  
  const [leftPanelWidth, setLeftPanelWidth] = useState()
  const [rightPanelWidth, setRightPanelWidth] = useState()
  
  const [leftPanelColumns, setLeftPanelColumns] = useState()
  const [rightPanelColumns, setRightPanelColumns] = useState()

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {

        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              ),
            })[0]?.id;
            
          }
        }

        lastOverId.current = overId;

        return [{id: overId}];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{id: lastOverId.current}] : [];
    },
    [activeId, items]
  );
  const [clonedItems, setClonedItems] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );
  const findContainer = (id) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  // not yet sure what this is for
  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  // update state when panel widths are changed by dragging the gutter
  const onGutterDrag = () => {
    setLeftPanelWidth(leftPanelRef.current?.offsetWidth)
    setRightPanelWidth(rightPanelRef.current?.offsetWidth)
  }

  /**
   * Determine the number of columns to display in a container
   * 
   * @param {*} panelRef : the ref passed to the div representing a panel
   * @returns the number of panels available to containers in that panel
   */
  const determinePanelColumns = (panelRef) => {
    if (!panelRef.current?.offsetWidth) return;
    const width = panelRef.current?.offsetWidth
    const itemWidth = 50 // MAGIC NUMBER WARNING! should grab from css somehow
    const border = 1 // MAGIC NUMBER WARNING! should grab from css somehow
    const margin = 0 // MAGIC NUMBER WARNING! should grab from css somehow
    const paddingLeft = 10 // MAGIC NUMBER WARNING! should grab from css somehow
    const paddingRight = 10 // MAGIC NUMBER WARNING! should grab from css somehow
    const gridGap = 5 // MAGIC NUMBER WARNING! should grab from css somehow
    const scrollbarWidth = 0 // MAGIC NUMBER WARNING! should grab from css somehow
    const fixedWidth = width - 2*border - 2*margin - paddingLeft - paddingRight - scrollbarWidth
    return Math.floor(fixedWidth/(itemWidth + 2*gridGap))
  }
  
  const updatePanelWidths = () => {
    setLeftPanelColumns(determinePanelColumns(leftPanelRef))
    setRightPanelColumns(determinePanelColumns(rightPanelRef))
  }

  // onGutterDrag changes the state (leftPanelWidth/rightPanelWidth), on which we should run this effect
  useEffect( () => {
    updatePanelWidths()
  }, [leftPanelWidth, rightPanelWidth])
  
  // update panel widths whenver we resize the window; to do this, stick an event listener for 'resize' on component mount
  useEffect( () => {
    window.addEventListener('resize', updatePanelWidths)
    return () => window.removeEventListener('resize', updatePanelWidths);
  }, [updatePanelWidths]) // you get a warning if you don't put updatePanelWidths in the dependency array

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({active}) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({active, over}) => {
        const overId = over?.id;

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (item) => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                ),
              ],
            };
          });
        }
      }}
      onDragEnd={({active, over}) => {
        if (active.id in items && over?.id) {
          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (!overId) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems((items) => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ),
            }));
          }
        }

        setActiveId(null);
      }}
      onDragCancel={onDragCancel}
    >
      <Split 
        className='test'
        style={{
          display:'flex', 
          flexDirection:'row', 
          height: '100vh',
          width: '100wh',
        }} 
        gutterSize={10}
        onDrag={onGutterDrag}
      >
        <div ref={leftPanelRef}
          style={{
            boxSizing: 'border-box',
            gridAutoFlow: 'row',
            height: '100%',
          }}
        >
          <LeftHeader />
          <MatchupTiers 
            containers={containers}
            leftPanelColumns={leftPanelColumns}
            items={items}
          />
        </div>

          
        <div ref={rightPanelRef}
          style={{
            boxSizing: 'border-box',
            gridAutoFlow: 'row',
            height: '100%',
          }}
        >
          <RightHeader />
          <UnplacedCharacters 
            containerId={containers[0]}
            items={items}
            columns={rightPanelColumns}
          />
        </div>
        
      </Split>
      
      { /* Displays the translucent "ghost" card when dragging an item */ }
      <RenderDragOverlay activeId={activeId}/>
    </DndContext>
  );
}
