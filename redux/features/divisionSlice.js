import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getDivisionURL = '/division';

//state type is one of FETCH, CREATE, PATCH, DELETE default on FETCH
const initialState = {
    type: 'FETCH',
    isLoading: false,
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

export const patchData = createAsyncThunk('division/patchData', async ({ AxiosInstance, id, data }, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.patch(`${getDivisionURL}/${id}`, data)
        return response.data
    } catch (error) {
        return rejectWithValue({
            data: {
                message: error.response === undefined ? error.message : error.response.data.message
            }
        })
    }
})

export const deleteData = createAsyncThunk('division/deleteData', async ({ AxiosInstance, id }, { rejectWithValue }) => {
    try {
        const response = await AxiosInstance.delete(`${getDivisionURL}/${id}/delete`)
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
        },
        sortData: (state, { payload }) => {
            state.divisions = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state, { payload }) => {
            state.isLoading = true
            state.error = false
            state.success = false
            state.type = 'FETCH'
        }),
            builder.addCase(getData.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.divisions = payload.data
                state.error = false
                state.success = true
                state.message = payload.data.message
            }),
            builder.addCase(getData.rejected, (state, { payload }) => {
                state.isLoading = false
                state.divisions = []
                state.error = true
                state.success = false
                state.message = payload.data.message
            }),
            builder.addCase(createData.pending, (state, { payload }) => {
                state.type = 'CREATE'
                state.isLoading = true;
                state.error = false
                state.success = false
            }),
            builder.addCase(createData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = false
                state.success = true
            }),
            builder.addCase(createData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = true
                state.success = false
            }),
            builder.addCase(patchData.pending, (state, { payload }) => {
                state.type = 'CREATE'
                state.isLoading = true;
                state.error = false
                state.success = false
            }),
            builder.addCase(patchData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = false
                state.success = true
            }),
            builder.addCase(patchData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = true
                state.success = false
            }),
            builder.addCase(deleteData.pending, (state, { payload }) => {
                state.type = 'DELETE'
                state.isLoading = true;
                state.error = false
                state.success = false
            }),
            builder.addCase(deleteData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = false
                state.success = true
            }),
            builder.addCase(deleteData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = true
                state.success = false
            })
    }
})

export const { resetError, resetSuccess, sortData } = divisionSlice.actions

export default divisionSlice.reducer;