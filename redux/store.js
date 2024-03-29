import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import counter from './features/counterSlice'
import division from './features/divisionSlice'
import location from './features/location/slice'
import user from './features/user/slice'

const combinedReducer = combineReducers({
    counter,
    division,
    location,
    user
})
export const store = configureStore({
    reducer: {
        reducer: combinedReducer
    }
})

export default store

// export const makeStore = () => {
//     configureStore({
//         reducer: combinedReducer,
//         devTools: true
//     })
// }

// export const wraper = createWrapper(makeStore);