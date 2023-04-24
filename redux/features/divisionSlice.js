import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const getDivisionURL = '/division';

const initialState = {
    isLoading: false,
    divisions: [],
    error: false,
    message: ''
}

export const getDivisionData = createAsyncThunk('division/getDivisionData', async (AxiosInstance, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.get(getDivisionURL);
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue({
            data: {
                message: error.response === undefined ? error.message : error.response.data.message
            }
        })
    }
})

const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getDivisionData.pending, (state, { payload }) => {
            state.isLoading = true
            state.divisions = []
        }),
        builder.addCase(getDivisionData.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.divisions = payload.entries
            state.error = false
        }),
        builder.addCase(getDivisionData.rejected, (state, { payload }) => {
            console.log(payload);
            state.isLoading = false
            state.divisions = []
            state.error = true
            state.message = payload.data.message
        })
    }
})

export default divisionSlice.reducer;