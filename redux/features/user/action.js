import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosInstance } from '../../../lib/api'

const path = '/user'

export const getData = createAsyncThunk('user/getData', async ({ token, limit, offset }, { rejectWithValue }) => {
    try {
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
        const response = await AxiosInstance.get(`${path}?limit=${limit}&offset=${offset}`);
        console.log(response.data);
        return response.data
    } catch (error) {
        return rejectWithValue({
            data: {
                message: error.response === undefined ? error.message : error.response.data.message
            }
        })
    }
})

export const create = createAsyncThunk('user/create', async ({ token, data }, { rejectWithValue }) => {
    try {
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
        const response = await AxiosInstance.post(path, data);
        return response.data
    } catch (error) {
        return rejectWithValue({
            data: {
                message: error.response === undefined ? error.message : error.response.data.message
            }
        })
    }
})

export const patch = createAsyncThunk('user/patch', async ({ token, id, data }, { rejectWithValue }) => {
    try {
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
        const response = await AxiosInstance.patch(`${path}/${id}`, data)
        return response.data
    } catch (error) {
        return rejectWithValue({
            data: {
                message: error.response === undefined ? error.message : error.response.data.message
            }
        })
    }
})

export const destroy = createAsyncThunk('user/destroy', async ({ token, id }, { rejectWithValue }) => {
    try {
        AxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
        const response = await AxiosInstance.delete(`${path}/${id}/delete`)
        return response.data
    } catch (error) {
        return rejectWithValue({
            data: {
                message: error.response === undefined ? error.message : error.response.data.message
            }
        })
    }
})