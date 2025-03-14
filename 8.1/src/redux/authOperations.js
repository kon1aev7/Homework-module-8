//https://task-manager-api.goit.global

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://task-manager-api.goit.global',
});



const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = ``;
};

// alex11223344@mail.com
export const registerThunk = createAsyncThunk('auth/register', async (body, thunkAPI) => {
  try {
    const { data } = await api.post('/users/signup', body);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginThunk = createAsyncThunk('auth/login', async (body, thunkAPI) => {
  try {
    const { data } = await api.post('/users/login', body);
    setAuthHeader(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});