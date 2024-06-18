import { Country } from '../../assets/types.ts'
import { Reducer } from 'redux'
import { SET_FETCHED_DATA } from '../actions/filterAction.ts'
import { FilterAction } from '../actions/filterAction.ts'

const initialState: Country = {
    code: '',
    name: '',
}

const filterReducer: Reducer<Country, FilterAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SET_FETCHED_DATA:
            return {
                ...state,
                fetchedData: action.payload,
            }
        default:
            return state
    }
}

export default filterReducer
