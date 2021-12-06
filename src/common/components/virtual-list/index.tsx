import React, { useState } from 'react';
import { reorder } from './helpers';
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

export interface ListRowItem {
  id: string;
}

export interface ListRowProps<T> {
  item: T;
  isDragging: boolean;
  index: number;
}

interface VirtualListProps<T> {
  data: T[];
  itemRender(props: ListRowProps<T>): React.ReactElement;
}

export const VirtualList = <T extends ListRowItem>({
  data,
  itemRender: ItemRender,
}: VirtualListProps<T>) => {
  const [items, setItems] = useState(() => data);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    if (result.source.index === result.destination.index) {
      return;
    }

    const newQuotes = reorder(
      items,
      result.source.index,
      result.destination.index,
    );
    setItems(newQuotes);
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
              item={items[rubric.source.index]}
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
                rowCount={items.length}
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
                    draggableId={items[index].id}
                    key={items[index].id}
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
                          item={items[index]}
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
