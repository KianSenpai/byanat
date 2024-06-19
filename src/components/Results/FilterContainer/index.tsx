import update from 'immutability-helper'
import { ReactNode, useEffect, useState } from 'react'
import Filter from '../Filter'
import ToggleBtn from '../../ToggleBtn'

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
    const [cards, setCards] = useState<Item[]>(initialCards)

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: Item[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            })
        )
    }

    return (
        <div className="flex flex-row gap-5">
            {cards.map((card, i) => (
                <Filter
                    key={card.id}
                    index={i}
                    id={card.id}
                    moveCard={moveCard}
                >
                    {card.body}
                </Filter>
            ))}
        </div>
    )
}
