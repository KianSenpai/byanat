import { configureStore } from '@reduxjs/toolkit'
import fetchedDataReducer from './reducers/fetchedDataReducer'

const store = configureStore({
    reducer: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        fetchedData: fetchedDataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export default store
