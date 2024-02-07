import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSpreadsheet } from "../../libs/googlesheet";

export const GET_SHEET_LIST = "home/GET_SHEET_LIST";
export const GET_TODO_LIST = "home/GET_TODO_LIST";

export const getSheetList = createAsyncThunk(
    GET_SHEET_LIST,
    async () => {
        const spreadsheet = await getSpreadsheet();
        const sheetsByIdElement = spreadsheet.sheetsById[0];
        const rows = await sheetsByIdElement.getRows();
        return rows;
    },
);

export const getTodoList = createAsyncThunk(
    GET_TODO_LIST,
    async (sheetId, sheetName) => {
        const spreadsheet = await getSpreadsheet();
        const sheetsByIdElement = spreadsheet.sheetsById[sheetId];
        const rows = await sheetsByIdElement.getRows();
        const data = {title: sheetName, data: rows}
        return data;
    },

);

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        sheetList: [],
        todoList: [],
        loading: 'idle',
    },
    reducers: {},
    extraReducers: {
        [getSheetList.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getSheetList.fulfilled.type]: (state, action) => {
            state.loading = true;
            state.sheetList = action.payload;
            state.todoList = [];
        },
        [getSheetList.rejected.type]: (state, action) => {
            state.loading = false;
            state.sheetList = [];
            state.todoList = [];
            console.log(action);
        },
        [getTodoList.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getTodoList.fulfilled.type]: (state, action) => {
            state.loading = true;
            state.todoList.concat(action.payload);
        },
        [getTodoList.rejected.type]: (state, action) => {
            state.loading = false;
            state.todoList = [];
            console.log(action);
        },
    }
});

export default homeSlice.reducer;