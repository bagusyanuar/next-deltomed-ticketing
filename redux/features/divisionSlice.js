import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getDivisionURL = '/division';

const initialState = {
    isLoading: false,
    isLoadingCreate: false,
    divisions: [],
    error: false,
    success: false,
    message: ''
}

export const getData = createAsyncThunk('division/getData', async ({ AxiosInstance, limit, offset }, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.get(`${getDivisionURL}?limit=${limit}&offset=${offset}`);
        return response.data
    } catch (error) {
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
        resetError: (state) => {
            state.error = false
        },
        resetSuccess: (state) => {
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state, { payload }) => {
            state.isLoading = true
        }),
            builder.addCase(getData.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.isLoading = false
                state.divisions = payload.data
                state.error = false
            }),
            builder.addCase(getData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.divisions = []
                state.error = true
                state.message = payload.data.message
            }),
            builder.addCase(createData.pending, (state, { payload }) => {
                state.isLoadingCreate = true;
                state.error = false
                state.success = false
            }),
            builder.addCase(createData.fulfilled, (state, { payload }) => {
                state.isLoadingCreate = false;
                state.error = false
                state.success = true
            }),
            builder.addCase(createData.rejected, (state, { payload }) => {
                state.isLoadingCreate = false;
                state.error = true
                state.success = false
            })
    }
})

export const { resetError, resetSuccess } = divisionSlice.actions

export default divisionSlice.reducer;