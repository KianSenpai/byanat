import { Reducer } from 'redux'
import {
    FetchedDataAction,
    SET_FETCHED_DATA,
} from '../actions/fetchedDataAction'
import { FetchedDataState } from '../../assets/types.ts'

const initialState: FetchedDataState = {
    fetchedData: null,
}

const fetchedDataReducer: Reducer<FetchedDataState, FetchedDataAction> = (
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

export default fetchedDataReducer
