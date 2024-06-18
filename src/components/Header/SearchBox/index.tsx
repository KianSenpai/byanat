import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import {
    AutoComplete,
    AutoCompleteCompleteEvent,
} from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { SearchIcon } from '../../../assets/icons.tsx'
import { Country } from '../../../assets/types.ts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { setFilter } from '../../../store/slices/filterSlice.ts'

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
        />
    )
}

const SearchSection = () => {
    const countries: Country[] = [
        { name: 'Dubai', code: '' },
        { name: 'Muscat', code: '' },
        { name: 'Tehran', code: '' },
    ]

    const [selectedCountries, setSelectedCountries] = useState<
        Country | undefined
    >(undefined)
    const [filteredCountries, setFilteredCountries] = useState<
        Country[] | undefined
    >(undefined)

    const search = (event: AutoCompleteCompleteEvent) => {
        let _filteredCountries: Country[]

        if (!event.query.trim().length) {
            _filteredCountries = [...countries]
        } else {
            _filteredCountries = countries.filter((country) =>
                country.name.toLowerCase().includes(event.query.toLowerCase())
            )
        }

        setFilteredCountries(_filteredCountries)
    }

    return (
        <AutoComplete
            field="name"
            multiple
            value={selectedCountries}
            suggestions={filteredCountries}
            completeMethod={search}
            onChange={(e) => setSelectedCountries(e.value)}
            pt={{ root: { overflow: 'scroll', width: '100%' } }}
        />
    )
}

export default function SearchBox() {
    return (
        <div className="flex h-14 w-[600px]">
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
