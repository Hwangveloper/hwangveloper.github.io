import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTodoList, setCurrentProgress } from './repository';

export const GET_PROJECT_LIST = "projects/GET_PROJECT_LIST";
export const SET_PROJECT_PROGRESS = "projects/SET_PROJECT_PROGRESS";

export const getProjectList = createAsyncThunk(
    GET_PROJECT_LIST,
    async () => {
        return await getTodoList();
    },
);

export const setProjectProgress = createAsyncThunk(
    SET_PROJECT_PROGRESS,
    async ({id, currentProgress}) => {
        await setCurrentProgress({id, currentProgress});
        return {id, currentProgress};
    }
)

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        todoList: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProjectList.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProjectList.fulfilled, (state, action) => {
            state.loading = false;
            state.todoList = action.payload;
        })
        .addCase(getProjectList.rejected, (state) => {
            state.loading = false;
            state.todoList = [];
        })
        .addCase(setProjectProgress.pending, (state) => {
            state.loading = true;
        })
        .addCase(setProjectProgress.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.todoList = state.todoList.map((item) => {
                if (item.id === action.payload.id) {
                    item.currentProgress = action.payload.currentProgress;
                }
                return item;
            });
        })
        .addCase(setProjectProgress.rejected, (state) => {
            state.loading = false;
        })
        ;
    }
});

export default projectSlice.reducer;