import { Action } from 'redux'
import { Country } from '../../assets/types.ts'

export const SET_FETCHED_DATA = 'SET_FETCHED_DATA'

interface SetFilterAction extends Action<typeof SET_FETCHED_DATA> {
    payload: Country
}

export type FilterAction = SetFilterAction

export const setFilter = (data: Country): SetFilterAction => ({
    type: SET_FETCHED_DATA,
    payload: data,
})
