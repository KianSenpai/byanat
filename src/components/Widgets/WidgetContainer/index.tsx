import { ReactNode, useCallback } from 'react'
import WidgetCard from '../WidgetCard'
import { Pane, SortablePane } from 'react-sortable-pane'

interface Item {
    id: number
    body: ReactNode
    title?: string
    subtitle?: string
}

const initialCards: Item[] = [
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
]

export default function WidgetContainer() {
    const renderCard = useCallback((card: Item) => {
        return (
            <Pane
                key={card.id}
                defaultSize={{ width: '100%', height: '32%' }}
                resizable={{ x: false, y: true, xy: false }}
            >
                <WidgetCard title={card.title} subtitle={card.subtitle}>
                    {card.body}
                </WidgetCard>
            </Pane>
        )
    }, [])

    return (
        <SortablePane direction="vertical" className="w-full" margin={16}>
            {initialCards.map((card) => renderCard(card))}
        </SortablePane>
    )
}
