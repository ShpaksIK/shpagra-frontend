import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login ', async (_, thunkAPI) => {});

export const register = createAsyncThunk('auth/register ', async (_, thunkAPI) => {});

export const getMyProfile = createAsyncThunk('auth/getmyprofile ', async (_, thunkAPI) => {});
