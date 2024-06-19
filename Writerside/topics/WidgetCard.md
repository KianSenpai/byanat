# WidgetCard Component Documentation

## Overview
The `WidgetCard` component is a React component that provides draggable and resizable card functionality using `react-dnd` for drag-and-drop interactions and `react-resizable` for resizing. This component is ideal for dynamic, interactive UIs where users can rearrange and resize cards.

## Imports
- `dnd-core`: Types for drag-and-drop functionality.
- `ReactNode, useRef, useState, CSSProperties`: React hooks and types.
- `useDrag, useDrop`: Hooks from `react-dnd` for implementing drag-and-drop.
- `ResizableBox`: Component from `react-resizable` for resizing.
- `HandleIcon`: Custom icon for the drag handle.

## Props
### `IWidgetCard` Interface
- **`id`** (number): Unique identifier for the card.
- **`children`** (ReactNode): Content to be displayed inside the card.
- **`index`** (number): Position index of the card.
- **`title`** (string, optional): Title of the card.
- **`subtitle`** (string, optional): Subtitle of the card.
- **`moveCard`** (function): Function to handle moving the card.

### `DragItem` Interface
- **`index`** (number): Position index of the dragged item.
- **`id`** (number): Unique identifier for the dragged item.
- **`type`** (string): Type of the dragged item.

## Component Usage
```jsx
import { Identifier, XYCoord } from 'dnd-core';
import { ReactNode, useRef, useState, CSSProperties } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { HandleIcon } from '../../../assets/icons.tsx';

interface IWidgetCard {
    id: number;
    children: ReactNode;
    index: number;
    title?: string;
    subtitle?: string;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    id: number;
    type: string;
}

export default function WidgetCard({
    id,
    index,
    moveCard,
    children,
    title,
    subtitle,
}: IWidgetCard) {
    const ref = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: 'card',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (
                (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
                (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
            ) {
                return;
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => ({ id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity: CSSProperties['opacity'] = isDragging ? 0.4 : 1;
    drop(ref);
    drag(handleRef);

    const [dimensions, setDimensions] = useState({ width: 200, height: 100 });

    const onResize = (_: unknown, { size }: { size: { width: number; height: number } }) => {
        setDimensions({ width: size.width, height: size.height });
    };

    return (
        <ResizableBox
            width={dimensions.width}
            height={dimensions.height}
            onResize={onResize}
            minConstraints={[150, 50]}
            maxConstraints={[500, 300]}
            draggableOpts={{ grid: [25, 25] }}
        >
            <div
                ref={ref}
                style={{ opacity }}
                className="h-full w-full rounded-2xl bg-white px-7 py-6 shadow-md"
                data-handler-id={handlerId}
            >
                <div className="flex flex-col">
                    <div className="mb-5">
                        <div className="flex items-center justify-between">
                            <span className="font-bold">{title || ''}</span>
                            <div ref={handleRef} className="cursor-move">
                                <HandleIcon />
                            </div>
                        </div>
                        {subtitle && (
                            <span className="text-xs text-slate-400">
                                {subtitle}
                            </span>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </ResizableBox>
    );
}