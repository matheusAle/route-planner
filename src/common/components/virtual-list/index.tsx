import React from 'react'
import {
  DropResult,
  Droppable,
  Draggable,
  DragDropContext,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
} from 'react-beautiful-dnd'
import 'react-virtualized/styles.css'
import {getPositionForIndex} from './helpers'

export interface ListRowProps<T>
  extends Pick<DraggableProvided, 'dragHandleProps'> {
  item: T
  isDragging: boolean
  index: number
}

interface VirtualListProps<T> {
  data: T[]
  itemRender(props: ListRowProps<T>): React.ReactElement
  sorted?(item: T, order: number): void
  idPredicate(i: T): string
  orderPredicate(i: T): number
}

export const VirtualList = <T,>({
  data,
  itemRender: ItemRender,
  sorted = () => void 0,
  idPredicate,
  orderPredicate,
}: VirtualListProps<T>) => {
  function onDragEnd(result: DropResult) {
    const orders = data.map(orderPredicate)
    const order = getPositionForIndex(orders, result.destination?.index || 0)
    sorted(data[result.source.index], order)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((item, index) => (
              <Draggable
                draggableId={idPredicate(item)}
                key={idPredicate(item)}
                index={index}
              >
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot,
                ) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex py-2"
                  >
                    <ItemRender
                      item={item}
                      isDragging={snapshot.isDragging}
                      dragHandleProps={provided.dragHandleProps}
                      index={index}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
