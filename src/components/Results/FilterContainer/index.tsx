import { ReactNode, useEffect, useState } from 'react'
import ToggleBtn from '../../ToggleBtn'
import { Pane, SortablePane } from 'react-sortable-pane'

interface Item {
    id: number
    body: ReactNode
}

interface IFilterContainer {
    onChange: (e: string) => void
}

export default function FilterContainer({ onChange }: IFilterContainer) {
    const [selectedFilter, setSelectedFilter] = useState('')

    useEffect(() => {
        onChange(selectedFilter)
    }, [selectedFilter])

    const initialCards: Item[] = [
        {
            id: 1,
            body: (
                <ToggleBtn
                    text="Price"
                    onClick={() => setSelectedFilter('price')}
                    isSelected={selectedFilter === 'price'}
                />
            ),
        },
        {
            id: 2,
            body: (
                <ToggleBtn
                    text="Name"
                    onClick={() => setSelectedFilter('name')}
                    isSelected={selectedFilter === 'name'}
                />
            ),
        },
    ]

    return (
        <SortablePane
            direction="horizontal"
            className="mb-8 h-fit w-full"
            margin={16}
        >
            {initialCards.map((card) => (
                <Pane
                    key={card.id}
                    resizable={{ x: false, y: false, xy: false }}
                >
                    {card.body}
                </Pane>
            ))}
        </SortablePane>
    )
}
