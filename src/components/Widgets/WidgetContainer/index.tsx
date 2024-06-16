import update from 'immutability-helper'
import { ReactNode, useCallback, useState } from 'react'
import WidgetCard from '../WidgetCard'

interface Item {
    id: number
    body: ReactNode
    title?: string
    subtitle?: string
}

export default function WidgetContainer() {
    const [cards, setCards] = useState<Item[]>([
        {
            id: 1,
            body: <div>hello</div>,
            title: 'P&L',
            subtitle: 'Total profit growth of 25%',
        },
        {
            id: 2,
            body: <div>hello</div>,
            title: 'Current Plan',
            subtitle: 'Information and usages of your current plan',
        },
        {
            id: 3,
            body: <div>hello</div>,
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

    const renderCard = useCallback((card: Item, index: number) => {
        return (
            <WidgetCard
                key={card.id}
                index={index}
                id={card.id}
                moveCard={moveCard}
                title={card.title}
                subtitle={card.subtitle}
            >
                {card.body}
            </WidgetCard>
        )
    }, [])

    return (
        <div className="flex flex-col gap-5">
            {cards.map((card, i) => renderCard(card, i))}
        </div>
    )
}
