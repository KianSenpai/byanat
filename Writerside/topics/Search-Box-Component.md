# Search Box Component

The `SearchBox` component provides a user interface for selecting filters and searching for cities. It comprises two main sections: a dropdown for selecting filters and an autocomplete input for searching cities.

## Imports

```typescript
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import {
    AutoComplete,
    AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { SearchIcon } from '../../../assets/icons'
import { City } from '../../../assets/types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { setFilter } from '../../../store/slices/filterSlice'
import { setSelectedCity } from '../../../store/slices/citySlice'
```

## DropdownSection Component

The `DropdownSection` component renders a dropdown menu for selecting filters.

```typescript
const DropdownSection = () => {
    const dispatch = useDispatch<AppDispatch>()
    const selectedFilter = useSelector(
        (state: RootState) => state.filter.selectedFilter
    )

    const groupedFilters = [
        {
            label: 'Type',
            items: [
                {
                    label: 'Entire Studio Apartment',
                    value: 'Entire Studio Apartment',
                },
                { label: 'Entire Home', value: 'Entire Home' },
                {
                    label: 'Share with Super Host',
                    value: 'Share with Super Host',
                },
            ],
        },
        {
            label: 'Rating',
            items: [
                { label: 'Less than 3', value: '3' },
                { label: 'Between 3 and 4', value: '4' },
                { label: 'More than 4', value: '5' },
            ],
        },
    ]

    const groupedItemTemplate = (option: { label: string }) => (
        <div className="align-items-center flex">
            <div>{option.label}</div>
        </div>
    )

    const handleChange = (e: { value: string }) => {
        dispatch(setFilter(e.value))
    }

    return (
        <Dropdown
            value={selectedFilter}
            onChange={handleChange}
            options={groupedFilters}
            optionLabel="label"
            optionGroupLabel="label"
            optionGroupChildren="items"
            optionGroupTemplate={groupedItemTemplate}
            className="max-w-[150px] md:w-[250px]"
        />
    )
}
```

- **selectedFilter**: The currently selected filter, retrieved from the Redux store.
- **groupedFilters**: The filter options grouped by categories such as "Type" and "Rating".
- **groupedItemTemplate**: Template for rendering each grouped item.
- **handleChange**: Dispatches the selected filter to the Redux store.

## SearchSection Component

The `SearchSection` component provides an autocomplete input for searching and selecting cities.

```typescript
const SearchSection = () => {
    const dispatch = useDispatch()
    const selectedCity = useSelector(
        (state: RootState) => state.city.selectedCity
    )

    const cities: City[] = [
        { name: 'Dubai', code: 'DXB' },
        { name: 'Muscat', code: 'MSC' },
        { name: 'Tehran', code: 'TEH' },
    ]

    const [filteredCities, setFilteredCities] = useState<City[] | undefined>(
        undefined
    )

    const search = (event: AutoCompleteCompleteEvent) => {
        let _filteredCountries: City[]

        if (!event.query.trim().length) {
            _filteredCountries = [...cities]
        } else {
            _filteredCountries = cities.filter((city) =>
                city.name.toLowerCase().includes(event.query.toLowerCase())
            )
        }

        setFilteredCities(_filteredCountries)
    }

    const handleCityChange = (e: { value: City[] }) => {
        if (e.value.length > 0) {
            const lastSelectedCity = e.value[e.value.length - 1]
            dispatch(setSelectedCity([lastSelectedCity]))
        }
    }

    return (
        <AutoComplete
            field="name"
            multiple
            value={selectedCity}
            suggestions={filteredCities}
            completeMethod={search}
            onChange={handleCityChange}
            className="w-full min-w-full"
            pt={{ root: { overflow: 'scroll', width: '100%' } }}
        />
    )
}
```

- **selectedCity**: The currently selected city, retrieved from the Redux store.
- **cities**: List of available cities to search.
- **filteredCities**: The list of cities filtered based on the search query.
- **search**: Filters the cities based on the user's search query.
- **handleCityChange**: Dispatches the selected city to the Redux store.

## Main Component

The `SearchBox` component combines the `DropdownSection` and `SearchSection` components and adds a search button.

```typescript
export default function SearchBox() {
    return (
        <div className="cy-searchbox flex h-14 w-full lg:w-[600px]">
            <div className="flex w-full rounded-l-md border-y border-l border-slate-300">
                <DropdownSection />
                <SearchSection />
            </div>
            <Button
                aria-label="Search"
                className="flex h-14 w-14 items-center justify-center rounded-l-none bg-[#5E81F4]"
            >
                <SearchIcon />
            </Button>
        </div>
    )
}
```

- Combines the `DropdownSection` and `SearchSection` components.
- Includes a search button with an icon.

## Redux Integration

This component relies on Redux for state management. Ensure that the `filterSlice` and `citySlice` are properly set up in your Redux store.

## Dependencies

- `primereact/dropdown`
- `primereact/autocomplete`
- `primereact/button`
- Redux setup with `react-redux`