import type { Identifier, XYCoord } from 'dnd-core'
import { CSSProperties, ReactNode, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import 'react-resizable/css/styles.css'
import { HandleIcon } from '../../../../assets/icons.tsx'

interface IWidgetCard {
    id: number
    children: ReactNode
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: number
    type: string
}

export default function FieldCard({
    id,
    index,
    moveCard,
    children,
}: IWidgetCard) {
    const ref = useRef<HTMLDivElement>(null)
    const handleRef = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'card',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) return

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (
                (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
                (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
            ) {
                return
            }

            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'card',
        item: () => ({ id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity: CSSProperties['opacity'] = isDragging ? 0.4 : 1
    drop(ref)
    drag(handleRef)

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className="flex w-full items-center gap-4"
            data-handler-id={handlerId}
        >
            <div ref={handleRef} className="cursor-move">
                <HandleIcon />
            </div>
            {children}
        </div>
    )
}
