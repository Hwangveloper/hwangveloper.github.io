import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCheckList, getWeeklyTable, getCharRows, getTodoRows, setCurrentProgress, refreshTodoRows } from './repository';

export const INIT_AND_GET_WOW_TODO_LIST = "wow/INIT_AND_GET_WOW_TODO_LIST";
export const SET_CHECK_PROGRESS = "wow/SET_CHECK_PROGRESS";
export const SET_TABLE_PROGRESS = "wow/SET_TABLE_PROGRESS";

export const initAndgetWowTodoList = createAsyncThunk(
    INIT_AND_GET_WOW_TODO_LIST,
    async () => {
        const todoRows = await getTodoRows();
        const charRows = await getCharRows();

        await refreshTodoRows({todoRows});

        const {columns, rows} = getWeeklyTable({todoRows, charRows});

        return {
            todoRows,
            charRows,
            checkList: getCheckList({todoRows, charRows}),
            weeklyColumns: columns,
            weeklyRows: rows,
        };
    },
);

export const setCheckProgress = createAsyncThunk(
    SET_CHECK_PROGRESS,
    async ({id, charId, playingProgress, currentProgress, todoRows}) => {
        await setCurrentProgress({id, charId, playingProgress, currentProgress, todoRows});
        return {id, charId, playingProgress, currentProgress};
    }
)

export const setTableProgress = createAsyncThunk(
    SET_TABLE_PROGRESS,
    async ({id, charId, playingProgress, currentProgress, todoRows}) => {
        await setCurrentProgress({id, charId, playingProgress, currentProgress, todoRows});
        return {id, charId, playingProgress, currentProgress};
    }
)

const wowSlice = createSlice({
    name: 'wow',
    initialState: {
        todoRows: [],
        charRows: [],
        checkList: [],
        weeklyColumns: [],
        weeklyRows: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(initAndgetWowTodoList.pending, (state) => {
            state.loading = true;
        })
        .addCase(initAndgetWowTodoList.fulfilled, (state, action) => {
            state.loading = false;
            state.todoRows = action.payload.todoRows;
            state.charRows = action.payload.charRows;
            state.checkList = action.payload.checkList;
            state.weeklyColumns = action.payload.weeklyColumns;
            state.weeklyRows = action.payload.weeklyRows;
        })
        .addCase(initAndgetWowTodoList.rejected, (state) => {
            state.loading = false;
            state.todoRows = [];
            state.charRows = [];
            state.checkList = [];
            state.weeklyColumns = [];
            state.weeklyRows = [];
        })
        .addCase(setCheckProgress.pending, (state) => {
            state.loading = true;
        })
        .addCase(setCheckProgress.fulfilled, (state, action) => {
            state.loading = false;
            state.checkList = state.checkList.map((item) => {
                if (item.id === action.payload.id && item.charId === action.payload.charId) {
                    item.playingProgress = action.payload.playingProgress;
                    item.currentProgress = action.payload.currentProgress;
                }
                return item;
            });
        })
        .addCase(setCheckProgress.rejected, (state) => {
            state.loading = false;
        })
        .addCase(setTableProgress.pending, (state) => {
            state.loading = true;
        })
        .addCase(setTableProgress.fulfilled, (state, action) => {
            state.loading = false;
            state.weeklyRows = state.weeklyRows.map((row) => {
                if (row.charId === action.payload.charId) {
                    row[action.payload.id].currentProgress = action.payload.currentProgress;
                    row[action.payload.id].playingProgress = action.payload.playingProgress;
                }
                return row;
            });
        })
        .addCase(setTableProgress.rejected, (state) => {
            state.loading = false;
        })
        ;
    }
});

export default wowSlice.reducer;