import { ReactNode, useCallback } from 'react'
import WidgetCard from '../WidgetCard'
import { Pane, SortablePane } from 'react-sortable-pane'
import { Chart } from 'primereact/chart'

interface Item {
    id: number
    body: ReactNode
    title?: string
    subtitle?: string
}

const initialCards: Item[] = [
    {
        id: 1,
        body: (
            <Chart
                type="doughnut"
                data={{
                    labels: ['Red', 'Blue', 'Yellow'],
                    datasets: [
                        {
                            data: [300, 50, 100],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                            ],
                        },
                    ],
                }}
                options={{
                    cutout: '60%',
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 100,
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'left',
                            labels: { usePointStyle: true },
                        },
                    },
                }}
            />
        ),
        title: 'P&L',
        subtitle: 'Total profit growth of 25%',
    },
    {
        id: 2,
        body: (
            <Chart
                type="polarArea"
                data={{
                    labels: ['Red', 'Blue', 'Yellow'],
                    datasets: [
                        {
                            data: [300, 50, 100],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                            ],
                        },
                    ],
                }}
                options={{
                    cutout: '60%',
                    layout: {
                        padding: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 100,
                        },
                    },
                    plugins: {
                        legend: {
                            position: 'left',
                            labels: { usePointStyle: true },
                        },
                    },
                }}
            />
        ),
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
