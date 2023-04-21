import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const getDivisionURL = '/division';

const initialState = {
    isLoading: false,
    divisions: []
}

export const getDivisionData = createAsyncThunk('division/getDivisionData', async (arg, { rejectWithValue }) => {
    try {
        const response = await axios.get(getDivisionURL);
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
    }
    // return fetch(getDivisionURL).then((resp) => resp.json()).catch((err) => console.log(err));
})

const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getDivisionData.pending, (state, { payload }) => {
            state.isLoading = true
        })
    }
})

export default divisionSlice.reducer;