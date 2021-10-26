import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRecord } from '../types/Record';
import { RecordStatus } from '../types/RecordStatus';
import recordApi from '../api/record';

export type RecordsState = Array<IRecord>;

const initialState: RecordsState = [];

export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async () => {
    const resp = await recordApi.get<Array<IRecord>>('/');
    return resp.data;
  }
);

export const addRecord = createAsyncThunk<IRecord, Pick<IRecord, 'name'>>(
  'records/addRecord',
  async ({ name }) => {
    const resp = await recordApi.post<IRecord>('/', {
      name,
      status: RecordStatus.Pending,
      appliedBy: [],
    });
    return resp.data;
  }
);

export const removeRecord = createAsyncThunk<
  { id: string },
  Pick<IRecord, 'id'>
>('records/removeRecord', async ({ id }) => {
  await recordApi.delete('/' + id);
  return { id };
});

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecords.fulfilled, (state, action) => {
        return [...state, ...action.payload];
      })
      .addCase(addRecord.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(removeRecord.fulfilled, (state, action) => {
        return state.filter((record) => record.id !== action.payload.id);
      });
  },
});

// export const {} = recordsSlice.actions;
export default recordsSlice.reducer;
