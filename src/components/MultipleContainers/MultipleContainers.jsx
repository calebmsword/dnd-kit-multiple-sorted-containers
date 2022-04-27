import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal, unstable_batchedUpdates} from 'react-dom';
import {
  // CancelDrop,
  closestCenter,
  // closestCorners,
  pointerWithin,
  rectIntersection,
  // CollisionDetection,
  DndContext,
  DragOverlay,
  // DropAnimation,
  defaultDropAnimation,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  // Modifiers,
  // useDroppable,
  // UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  // KeyboardCoordinateGetter,
} from '@dnd-kit/core';
import {
  // AnimateLayoutChanges,
  SortableContext,
  // useSortable,
  arrayMove,
  // defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  // SortingStrategy,
  horizontalListSortingStrategy,
  // rectSortingStrategy
} from '@dnd-kit/sortable';
// import {CSS} from '@dnd-kit/utilities';
import {coordinateGetter as multipleContainersCoordinateGetter} from './multipleContainersKeyboardCoordinates';

import {Item} from '../Item';
import {Container} from '../Container'

import {createRange} from '../../utilities';

import { DroppableContainer } from '../DroppableContainer'

import { SortableItem } from '../SortableItem'

import { getColor } from '../../utilities';

// import { Trash } from '../Trash';

import Split from 'react-split';

import './MultipleContainers.css'

import { characterList, findCharacterById, characters } from '../../entities/characters';

const dropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

export const TRASH_ID = 'void';
const PLACEHOLDER_ID = 'placeholder';
// const empty = [];



export function MultipleContainers({
  adjustScale = false,
  itemCount = 3,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  // trashable = false,
  vertical = false,
  scrollable,
}) {
  const [items, setItems] = useState(   
    () =>
      initialItems ?? {
        unplaced: characterList.map(item => item.id.toString()),
        // unsure: [],
        // minus6: [],
        // minus5point5: [],
        // minus5: [],
        // minus4point5: [],
        // minus4: [],
        // minus3point5: [],
        // minus3: [],
        // minus2point5: [],
        minus2: [],
        // minus1point5: [],
        minus1: [],
        // minus0point5: [],
        even: [],
        // plus0point5: [],
        plus1: [],
        // plus1point5: [],
        plus2: [],
        // plus2point5: [],
        // plus3: [],
        // plus3point5: [],
        // plus4: [],
        // plus4point5: [],
        // plus5: [],
        // plus5point5: [],
        // plus6: [],
        // A: createRange(itemCount, (index) => `A${index + 1}`),
        // B: createRange(itemCount, (index) => `B${index + 1}`),
        // C: createRange(itemCount, (index) => `C${index + 1}`),
        // D: createRange(itemCount, (index) => `D${index + 1}`),
        // E: createRange(itemCount, (index) => `D${index + 1}`),
        // A: characterList.map(item => item.id.toString()),
        // B: [],
      }
  );
  
  const [containers, setContainers] = useState(Object.keys(items));
  const [activeId, setActiveId] = useState(null);
  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;
  
  
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();
  
  const [leftPanelWidth, setLeftPanelWidth] = useState()
  const [rightPanelWidth, setRightPanelWidth] = useState()
  
  const [leftPanelColumns, setLeftPanelColumns] = useState()
  const [rightPanelColumns, setRightPanelColumns] = useState()

  // const [tierIsShowing, setTierIsShowing] = useState( () => {
  //   const result = {}
  //   for (const containerLabel in items ) {
  //     if (['unplaced', 'minus2', 'minus1', 'even', 'plus1', 'plus2'].some( str => str.includes(containerLabel))) {
  //       result[containerLabel] = true
  //     } else {
  //       result[containerLabel] = false
  //     }
  //   }
  //   return result
  // })

  // const handleRemove = (containerId) => {
  //   setTierIsShowing({
  //     ...tierIsShowing,
  //     [containerId]: false
  //   })
  // }

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
        // if (overId === TRASH_ID) {
        //   // If the intersecting droppable is the trash, return early
        //   // Remove this if you're not using trashable functionality in your app
        //   return intersections;
        // }

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

  const getIndex = (id) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
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

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  const onGutterDrag = () => {
    setLeftPanelWidth(leftPanelRef.current?.offsetWidth)
    setRightPanelWidth(rightPanelRef.current?.offsetWidth)
  }

  const determinePanelColumns = (panelRef) => {
    if (!panelRef.current?.offsetWidth) return;
    const width = panelRef.current?.offsetWidth
    const itemWidth = wrapperStyle().width
    const border = 1 // MAGIC NUMBER WARNING! should grab from DroppableContainer css somehow
    const margin = 0 // MAGIC NUMBER WARNING! should grab directly from DroppableContainer css somehow
    const paddingLeft = 10 // MAGIC NUMBER WARNING! should grab directly from DroppableContainer css somehow
    const paddingRight = 10 // MAGIC NUMBER WARNING! should grab directly from DroppableContainer css somehow
    const gridGap = 5 // MAGIC NUMBER WARNING! should grab directly from DroppableContainer css somehow
    const scrollbarWidth = 0 // MAGIC NUMBER WARNING!
    const fixedWidth = width - 2*border - 2*margin - paddingLeft - paddingRight - scrollbarWidth
    return Math.floor(fixedWidth/(itemWidth + 2*gridGap))
  }

  const updatePanelWidths = () => {
    setLeftPanelColumns(determinePanelColumns(leftPanelRef))
    setRightPanelColumns(determinePanelColumns(rightPanelRef))
  }

  useEffect( () => {
    updatePanelWidths()
  }, [leftPanelWidth, rightPanelWidth])
  
  useEffect( () => {
    window.addEventListener('resize', updatePanelWidths)
    return () => window.removeEventListener('resize', updatePanelWidths);
  }, [updatePanelWidths])


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

        if (!overId || overId === TRASH_ID || active.id in items) {
          return;
        }

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

        if (overId === TRASH_ID) {
          setItems((items) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (id) => id !== activeId
            ),
          }));
          setActiveId(null);
          return;
        }

        if (overId === PLACEHOLDER_ID) {
          const newContainerId = getNextContainerId();

          unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setItems((items) => ({
              ...items,
              [activeContainer]: items[activeContainer].filter(
                (id) => id !== activeId
              ),
              [newContainerId]: [active.id],
            }));
            setActiveId(null);
          });
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
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
      autoScroll={false}
    >
      <Split 
        style={{
          display:'flex', 
          flexDirection:'row', 
          height: '100vh',
          width: '100wh',
        }} 
        gutterSize={10}
        onDrag={onGutterDrag}
      >
        <div
          ref={leftPanelRef}
          style={{
            // display: 'inline-grid',
            boxSizing: 'border-box',
            // padding: 20,
            gridAutoFlow: vertical ? 'row' : 'column',
            height: '100%',
          }}
        >
          <div 
            className='header'
            style={{
              height: '100px',
              backgroundColor: '#264040',
              color: 'white',
              // textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div>back button</div>
            <img width='100' src='https://dynamic.brandcrowd.com/asset/logo/c3cf1bd1-4261-4d85-a6c6-52dbce75799d/logo-search-grid-1x?v=637678103961270000' />
            <div style={{margin: '0px 5px'}}>Options</div>
            <div style={{margin: '0px 5px'}}>Add Tier</div>
          </div>
          <div 
            style={{
              overflowY: 'auto',
              height: 'calc(100vh - 100px)'
            }}
          >
            {/* <SortableContext
              items={[...containers, PLACEHOLDER_ID]}
              strategy={
                vertical
                  ? verticalListSortingStrategy
                  : horizontalListSortingStrategy
              }
            > */}
              {containers.map((containerId, index) => {
                if (index === 0) return;
                {/* if (!tierIsShowing[containerId]) return; */}
                return (
                  <DroppableContainer
                    key={containerId}
                    id={containerId}
                    label={minimal ? undefined : `Column ${containerId}`}
                    columns={leftPanelColumns}
                    items={items[containerId]}
                    scrollable={scrollable}
                    style={containerStyle}
                    unstyled={minimal}
                    onRemove={() => handleRemove(containerId)}
                  >
                    <SortableContext items={items[containerId]} strategy={strategy}>
                      {items[containerId].map((value, index) => {
                        return (
                          <SortableItem
                            disabled={isSortingContainer}
                            key={value}
                            id={value}
                            index={index}
                            handle={handle}
                            style={getItemStyles}
                            wrapperStyle={wrapperStyle}
                            renderItem={renderItem}
                            containerId={containerId}
                            getIndex={getIndex}
                          />
                        );
                      })}
                    </SortableContext>
                  </DroppableContainer>
                )
              })}
              {/* {minimal ? undefined : (
                <DroppableContainer
                  id={PLACEHOLDER_ID}
                  disabled={isSortingContainer}
                  items={empty}
                  onClick={handleAddColumn}
                  placeholder
                >
                  + Add column
                </DroppableContainer>
              )} */}
            {/* </SortableContext> */}
          </div>
          
          
        </div>
        <div 
          ref={rightPanelRef}
          style={{
            // display: 'inline-grid',
            boxSizing: 'border-box',
            // padding: 20,
            gridAutoFlow: vertical ? 'row' : 'column',
            height: '100%',
          }}
        >
          <div 
            // className='header2'
            style={{
              height: '50px',
              backgroundColor: 'DarkSlateGray',
              color: 'white',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <input type='text' placeholder='search bar'/> <button>sort</button>
          </div>
          <div
            // className='unplacedCharacters'
            style={{
              overflowY: 'auto',
              height: 'calc(100vh - 50px)'
              // height: '700px',
            }}
          >
            <DroppableContainer
              key={containers.at(0)}
              id={containers.at(0)}
              label={minimal ? undefined : `Column ${containers.at(0)}`}
              columns={rightPanelColumns}
              items={items[containers.at(0)]}
              scrollable={scrollable}
              style={containerStyle}
              unstyled={minimal}
              onRemove={() => handleRemove(containers.at(0))}
            >
              <SortableContext items={items[containers.at(0)]} strategy={strategy}>
                {items[containers.at(0)].map((value, index) => {
                  return (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={value}
                      id={value}
                      index={index}
                      handle={handle}
                      style={getItemStyles}
                      wrapperStyle={wrapperStyle}
                      renderItem={renderItem}
                      containerId={containers.at(0)}
                      getIndex={getIndex}
                    />
                  );
                })}
              </SortableContext>
            </DroppableContainer>
          </div>
          
        </div>
        
      </Split>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
      {/* {trashable && activeId && !containers.includes(activeId) ? (
        <Trash id={TRASH_ID} />
      ) : null} */}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id) {
    return (
      <Item
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id),
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        color={getColor(id)}
        wrapperStyle={wrapperStyle({index: 0})}
        renderItem={renderItem}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(containerId) {
    return (
      <Container
        label={`Column ${containerId}`}
        columns={containerId === 'A' ? rightPanelColumns : leftPanelColumns}
        style={{
          height: '100%',
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((item, index) => (
          <Item
            key={item}
            value={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            color={getColor(item)}
            wrapperStyle={wrapperStyle({index})}
            renderItem={renderItem}
          />
        ))}
      </Container>
    );
  }

  function handleRemove(containerID) {
    setContainers((containers) =>
      containers.filter((id) => id !== containerID)
    );
  }

  function handleAddColumn() {
    const newContainerId = getNextContainerId();

    unstable_batchedUpdates(() => {
      setContainers((containers) => [...containers, newContainerId]);
      setItems((items) => ({
        ...items,
        [newContainerId]: [],
      }));
    });
  }

  function getNextContainerId() {
    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  }
}
