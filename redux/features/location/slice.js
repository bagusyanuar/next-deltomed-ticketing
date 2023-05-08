import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData, create } from './action'


const initialState = {
    type: 'FETCH',
    isLoading: false,
    singleData: null,
    data: [],
    error: false,
    success: false,
    message: ''
}

const slice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        sort: (state, { payload }) => {
            state.data = payload
        },
        reset: (state, { payload }) => {
            console.log(payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = true
            state.success = false
            state.error = false
        }).addCase(getData.fulfilled, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = false
            state.success = true
            state.error = false
            state.data = action.payload.data
        }).addCase(getData.rejected, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = false
            state.success = false
            state.error = true
        }).addCase(create.pending, (state, action) => {
            state.type = 'CREATE'
            state.isLoading = true;
            state.error = false
            state.success = false
        }).addCase(create.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false
            state.success = true
        }).addCase(create.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true
            state.success = false
        })
    }
})

export const { sort, reset } = slice.actions

export default slice.reducer;