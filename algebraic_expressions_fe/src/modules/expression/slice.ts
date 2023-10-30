import {createSlice} from '@reduxjs/toolkit';

import {ExpressionSlice} from './types';

import {DEFAULT_INIT_PAGINATION, failure, idle, loading, success} from '~/store/redux-utils';
import {createExpressionThunk, getExpressionThunk} from "~/modules/expression/thunks.ts";

const initialState: ExpressionSlice = {

    createExpressionRqst: idle(),
    getExpressionRqst: idle(),
    expressionPagination: DEFAULT_INIT_PAGINATION,
    nextAvailable: false

};

const slice = createSlice({
    name: 'expression',
    initialState,
    reducers: {
        resetCreateExpressionAction: state => {
            state.createExpressionRqst = idle();
        },
        resetGetExpressionAction: state => {
            state.getExpressionRqst = idle();
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createExpressionThunk.pending, state => {
                state.createExpressionRqst = loading(state.createExpressionRqst);
            })
            .addCase(createExpressionThunk.fulfilled, (state) => {
                state.createExpressionRqst = success();
            })
            .addCase(createExpressionThunk.rejected, (state, action) => {
                state.createExpressionRqst = failure(state.createExpressionRqst, action.payload);
            })
            .addCase(getExpressionThunk.pending, state => {
                state.getExpressionRqst = loading(state.getExpressionRqst);
            })
            .addCase(getExpressionThunk.fulfilled, (state, action) => {
                const {pagination, refresh, nextAvailable} = action.meta
                const data = action.payload;
                state.getExpressionRqst = success(refresh ? data : [
                    ...(state.getExpressionRqst?.data ?? []),
                    ...data]);

                state.expressionPagination = pagination;
                state.nextAvailable = nextAvailable;
            })
            .addCase(getExpressionThunk.rejected, (state, action) => {
                state.getExpressionRqst = failure(state.getExpressionRqst, action.payload);
            })

    }
});

const expressionReducer = slice.reducer;
const {
    resetCreateExpressionAction,
    resetGetExpressionAction
} = slice.actions;

export {
    expressionReducer,
    resetCreateExpressionAction,
    resetGetExpressionAction
};
