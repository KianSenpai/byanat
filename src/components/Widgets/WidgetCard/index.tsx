import type { Identifier, XYCoord } from 'dnd-core'
import { ReactNode, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ResizableBox } from 'react-resizable'
import 'react-resizable/css/styles.css' // Import resizable styles

export interface CardProps {
    id: any
    children: ReactNode
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

export default function WidgetCard({
    id,
    index,
    moveCard,
    children,
}: CardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.4 : 1
    drop(ref)
    drag(handleRef)

    const handleStyle = {
        backgroundColor: 'green',
        width: '1rem',
        height: '1rem',
        display: 'inline-block',
        marginRight: '0.75rem',
        cursor: 'move',
    }

    const [width, setWidth] = useState(200)
    const [height, setHeight] = useState(100)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const onResize = (e, { size }) => {
        setWidth(size.width)
        setHeight(size.height)
    }

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className="w-fit rounded-2xl bg-white p-2.5 shadow-md"
            data-handler-id={handlerId}
        >
            <ResizableBox
                width={width}
                height={height}
                onResize={onResize}
                minConstraints={[150, 50]}
                maxConstraints={[500, 300]}
                draggableOpts={{ enableUserSelectHack: false }}
            >
                <div ref={handleRef} style={handleStyle} />
                {children}
            </ResizableBox>
        </div>
    )
}
