import React from 'react';
import classNames from 'classnames';

// import {Handle, Remove} from './components';

import styles from './Item.module.css';

export const Item = React.memo(
  React.forwardRef(
    (
      {
        // color,
        // dragOverlay,
        dragging,
        // disabled,
        // fadeIn,
        // handle,
        // height,
        index,
        listeners,
        // onRemove,
        // renderItem,
        // sorting,
        // style,
        transition,
        transform,
        value,
        // wrapperStyle,
        // ...props
      },
      ref
    ) => {
      // useEffect(() => {
      //   // if (!dragOverlay) {
      //   //   return;
      //   // }

      //   document.body.style.cursor = 'grabbing';

      //   return () => {
      //     document.body.style.cursor = '';
      //   };
      // }, [dragOverlay]);
      return (
          // renderItem ? (
      //   renderItem({
      //     // dragOverlay: Boolean(dragOverlay),
      //     dragging: Boolean(dragging),
      //     sorting: Boolean(sorting),
      //     index,
      //     fadeIn: Boolean(fadeIn),
      //     listeners,
      //     ref,
      //     style,
      //     transform,
      //     transition,
      //     value,
      //   })
      // ) : (
        <li
          className={classNames(
            // styles.Wrapper,
            // fadeIn && styles.fadeIn,
            // sorting && styles.sorting,
            // dragOverlay && styles.dragOverlay
            styles.Item,
            dragging && styles.dragging,
          )}
          style={
            {
              // ...wrapperStyle,
              height: '50px',
              width: '50px',
              // transition: [transition, wrapperStyle?.transition]
              // transition: [transition]
              //   // .filter(Boolean)
              //   .join(', ')
              // transition: 'transform 400ms ease',
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
              // '--color': color,
            } 
          }
          ref={ref}
          data-cypress='draggable-item'
          {...listeners}
          tabIndex={0}
        >
          {/* <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              // handle && styles.withHandle,
              // dragOverlay && styles.dragOverlay,
              // disabled && styles.disabled,
              // color && styles.color
            )}
            // style={style}
            data-cypress="draggable-item"
            // {...(!handle ? listeners : undefined)}
            {...listeners}
            // {...props}
            tabIndex={0}
          > */}
            {value}
            {/* <span className={styles.Actions}>
              {onRemove ? (
                <Remove className={styles.Remove} onClick={onRemove} />
              ) : null}
              {handle ? <Handle {...listeners} /> : null}
            </span> */}
          {/* </div> */}
        </li>
      );
    }
  )
);