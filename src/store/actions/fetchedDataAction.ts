import { Action } from 'redux'
import { GeoJSONResponse } from '../../assets/types.ts'

export const SET_FETCHED_DATA = 'SET_FETCHED_DATA'

interface SetFetchedDataAction extends Action<typeof SET_FETCHED_DATA> {
    payload: GeoJSONResponse
}

export type FetchedDataAction = SetFetchedDataAction

export const setFetchedData = (
    data: GeoJSONResponse
): SetFetchedDataAction => ({
    type: SET_FETCHED_DATA,
    payload: data,
})
