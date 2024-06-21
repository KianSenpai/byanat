# Widget Container Component

The `WidgetContainer` component renders a list of draggable and resizable widgets in a vertical pane.

## Imports

```typescript
import { ReactNode, useCallback } from 'react'
import WidgetCard from '../WidgetCard'
import { Pane, SortablePane } from 'react-sortable-pane'
```

## Interface

```typescript
interface Item {
    id: number
    body: ReactNode
    title?: string
    subtitle?: string
}
```

- **Item**: Defines the structure of each card.
    - `id`: Unique identifier for the card (number).
    - `body`: Content of the card (ReactNode).
    - `title` (optional): Title of the card (string).
    - `subtitle` (optional): Subtitle of the card (string).

## Initial Cards

```typescript
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
```

- **initialCards**: Array of card objects to be rendered initially.

## Main Component

```javascript
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
```

- **WidgetContainer**: Main component rendering the sortable pane with the cards.
    - Uses `useCallback` to memoize the card rendering logic.
    - Maps over `initialCards` to render each card using the `renderCard` function.

- **Items**: Each item contains an `id`, a `body` (ReactNode), and optionally a `title` and `subtitle`.
- **SortablePane**: Used to create a container that allows sorting of the cards vertically.
- **Pane**: A wrapper for each card, which is resizable vertically.
