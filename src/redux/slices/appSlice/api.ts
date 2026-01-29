import { createAsyncThunk } from '@reduxjs/toolkit';

export const testFetch = createAsyncThunk('app/fetchTest', async (_, thunkAPI) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    const data = await response.json();

    console.log(data);
    return { data: data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'Неизвестная ошибка');
  }
});
