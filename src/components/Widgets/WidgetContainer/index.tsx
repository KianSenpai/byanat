import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import WidgetCard from '../WidgetCard'

export interface Item {
    id: number
    text: string
}

export default function WidgetContainer() {
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
            id: 6,
            text: '???',
        },
        {
            id: 7,
            text: 'PROFIT',
        },
    ])

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: Item[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            })
        )
    }, [])

    const renderCard = useCallback((card: { id: number }, index: number) => {
        return (
            <WidgetCard
                key={card.id}
                index={index}
                id={card.id}
                moveCard={moveCard}
            >
                hi
            </WidgetCard>
        )
    }, [])

    return (
        <div className="flex flex-col gap-3">
            {cards.map((card, i) => renderCard(card, i))}
        </div>
    )
}
