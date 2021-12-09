import React from 'react';
import {
  DropResult,
  Droppable,
  Draggable,
  DragDropContext,
  DraggableProvided,
  DraggableStateSnapshot,
  DraggableRubric,
  DroppableProvided,
} from 'react-beautiful-dnd';
import 'react-virtualized/styles.css';
import { WindowScroller, List } from 'react-virtualized';
import ReactDOM from 'react-dom';
import { getPositionForIndex } from './helpers';

export interface ListRowItem {
  id: string;
  order: number
}

export interface ListRowProps<T> {
  item: T;
  isDragging: boolean;
  index: number;
}

interface VirtualListProps<T> {
  data: T[];
  itemRender(props: ListRowProps<T>): React.ReactElement;
  sorted?(item: T, order: number): void;
}

export const VirtualList = <T extends ListRowItem>({
  data,
  itemRender: ItemRender,
  sorted = () => void 0
}: VirtualListProps<T>) => {

  function onDragEnd(result: DropResult) {
    const orders = data.map(item => item.order);
    const order = getPositionForIndex(orders, result.destination?.index || 0)
    sorted(data[result.source.index], order);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(
          provided: DraggableProvided,
          snapshot: DraggableStateSnapshot,
          rubric: DraggableRubric,
        ) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="flex py-2"
          >
            <ItemRender
              isDragging={snapshot.isDragging}
              item={data[rubric.source.index]}
              index={rubric.source.index}
            />
          </div>
        )}
      >
        {(droppableProvided: DroppableProvided) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <List
                autoHeight
                rowCount={data.length}
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowHeight={100}
                estimatedRowSize={100}
                autoWidth
                width={10000}
                className="p-5"
                ref={ref => {
                  // react-virtualized has no way to get the list's ref that I can so
                  // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                  if (ref) {
                    // eslint-disable-next-line react/no-find-dom-node
                    const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);
                    if (whatHasMyLifeComeTo instanceof HTMLElement) {
                      droppableProvided.innerRef(whatHasMyLifeComeTo);
                    }
                  }
                }}
                rowRenderer={({ index, style }) => (
                  <Draggable
                    draggableId={data[index].id}
                    key={data[index].id}
                    index={index}
                  >
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot,
                    ) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...style,
                          ...provided.draggableProps.style,
                        }}
                        ref={provided.innerRef}
                        className="flex py-2"
                      >
                        <ItemRender
                          item={data[index]}
                          isDragging={snapshot.isDragging}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                )}
              />
            )}
          </WindowScroller>
        )}
      </Droppable>
    </DragDropContext>
  );
};
