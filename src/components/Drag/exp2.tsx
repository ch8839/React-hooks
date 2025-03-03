import React, { useState, useContext, useMemo, useRef } from "react";
import { HolderOutlined } from "@ant-design/icons";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface Item {
  id: number;
  text: string;
}

interface DraggableTagProps {
  tag: Item;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const commonStyle: React.CSSProperties = {
  padding: "20px",
  border: "1px solid white",
  transition: "unset", // Prevent element from shaking after drag
};

const Tag: React.FC<any> = React.forwardRef(({ tag, style }, ref: any) => {
  // setNodeRef控制参与拖拽的节点，setActivatorNodeRef控制触发拖拽的节点
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <div style={style} ref={ref}>
      <span style={{ cursor: "move" }} ref={setActivatorNodeRef} {...listeners}>
        <HolderOutlined />
      </span>
      {tag.text}
    </div>
  );
});

const DraggableTag: React.FC<DraggableTagProps> = (props) => {
  const { tag } = props;
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({ id: tag.id });

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        // transform: `translateX(${transform.x}px)`, // 只在水平方向移动
        transition: isDragging ? "unset" : transition, // Improve performance/visual effect when dragging
      }
    : commonStyle;

  return (
    <RowContext.Provider value={contextValue}>
      <Tag {...props} ref={setNodeRef} style={style} />
    </RowContext.Provider>
  );
};

export const DragExp2: React.FC<any> = (props) => {
  const [items, setItems] = useState([
    { id: 1, text: "Tag 1" },
    { id: 2, text: "Tag 2" },
    { id: 3, text: "Tag 3" },
  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      setItems((data) => {
        const oldIndex = data.findIndex((item) => item.id === active.id);
        const newIndex = data.findIndex((item) => item.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <div style={{ display: "flex", gap: "20px" }}>
          {items.map<React.ReactNode>((item) => (
            <DraggableTag tag={item} key={item.id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
