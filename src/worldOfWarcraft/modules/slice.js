import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodoList } from './controller';
import { getSpreadsheet } from "../../libs/googlesheet";

export const GET_WOW_TODO_LIST = "wow/GET_WOW_TODO_LIST";

export const getWowTodoList = createAsyncThunk(
    GET_WOW_TODO_LIST,
    async () => {
        console.log('!!!!!!!!!!!!!');
        const spreadsheet = await getSpreadsheet();
        console.log('!!!!!!!!!!!!!');
        const sheetsByIdElement = spreadsheet.sheetsById[0];
        const rows = await sheetsByIdElement.getRows();
        return rows;
    },

);

const wowSlice = createSlice({
    name: 'wow',
    initialState: {
        todoList: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [getWowTodoList.pending.type]: (state, action) => {
            state.loading = true;
        },
        [getWowTodoList.fulfilled.type]: (state, action) => {
            state.loading = true;
            state.todoList.concat(action.payload);
            console.log(action);
        },
        [getWowTodoList.rejected.type]: (state, action) => {
            state.loading = false;
            state.todoList = [];
            console.log(action);
        },
    }
});

export default wowSlice.reducer;