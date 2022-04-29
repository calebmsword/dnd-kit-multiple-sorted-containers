import { useSortable } from '@dnd-kit/sortable'
import { Container } from '../Container'
import { animateLayoutChanges } from '../../utilities';
import {CSS} from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';

export function DroppableContainer({
  children,
  columns = 1,
  // disabled,
  id,
  // items,
  // style,
  // ...props
}) {
  // const {
    // active,
    // attributes,
    // isDragging,
    // listeners,
    // over,
    // setNodeRef,
    // transition,
    // transform,
  // } = useSortable({
  //   id,
  //   data: {
  //     type: 'container',
  //     children: items,
  //   },
    // animateLayoutChanges,
  // });
  const { setNodeRef } = useDroppable({ id })

  console.log('DroppableContainer ref:\n',setNodeRef)


  // const isOverContainer = over
  //   ? (id === over.id && active?.data.current?.type !== 'container') ||
  //     items.includes(over.id)
  //   : false;

  return (
    <Container
      // ref={disabled ? undefined : setNodeRef}
      ref={setNodeRef}
      // ref={undefined}
      style={{
        // ...style,
        // transition,
        // transform: CSS.Translate.toString(transform),
        // opacity: isDragging ? 0.5 : undefined,
      }}
      // hover={isOverContainer}
      // handleProps={{
      //   ...attributes,
      //   ...listeners,
      // }}
      columns={columns}
      // {...props}
    >
      {children}
    </Container>
  );
}