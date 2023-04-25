import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const getDivisionURL = '/division';

const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    divisions: [],
    error: false,
    message: ''
}

export const getData = createAsyncThunk('division/getData', async (AxiosInstance, { rejectWithValue }) => {
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

export const createData = createAsyncThunk('division/createData', async ({
    AxiosInstance, data
}, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.post(getDivisionURL, data)
        return response.data
    } catch (error) {
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
        builder.addCase(getData.pending, (state, { payload }) => {
            state.isLoading = true
            state.divisions = []
        }),
            builder.addCase(getData.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.divisions = payload.entries
                state.error = false
            }),
            builder.addCase(getData.rejected, (state, { payload }) => {
                console.log(payload);
                state.isLoading = false
                state.divisions = []
                state.error = true
                state.message = payload.data.message
            }),
            builder.addCase(createData.pending, (state, { payload }) => {
                state.isLoadingCreate = true;
            }),
            builder.addCase(createData.fulfilled, (state, { payload }) => {
                state.isLoadingCreate = false;
            }),
            builder.addCase(createData.rejected, (state, { payload }) => {
                state.isLoadingCreate = false;
            })
    }
})

export default divisionSlice.reducer;