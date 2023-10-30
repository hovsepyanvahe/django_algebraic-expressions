import {createSlice} from '@reduxjs/toolkit';

import {signInThunk, signUpThunk} from './thunks';
import {AuthSlice} from './types';

import {failure, idle, loading, success} from '~/store/redux-utils';

const initialState: AuthSlice = {

    signInRqst: idle(),
    signUpRqst: idle(),

};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetSignInRqstAction: state => {
            state.signInRqst = idle();
        },
        resetSignUpRqstAction: state => {
            state.signUpRqst = idle();
        },
    },
    extraReducers: builder => {
        builder
            .addCase(signInThunk.pending, state => {
                state.signInRqst = loading(state.signInRqst);
            })
            .addCase(signInThunk.fulfilled, (state) => {
                state.signInRqst = success();
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.signInRqst = failure(state.signInRqst, action.payload);
            })
            .addCase(signUpThunk.pending, state => {
                state.signUpRqst = loading(state.signUpRqst);
            })
            .addCase(signUpThunk.fulfilled, (state) => {
                state.signUpRqst = success();
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.signUpRqst = failure(state.signUpRqst, action.payload);
            })

    }
});

const authReducer = slice.reducer;
const {
    resetSignInRqstAction,
    resetSignUpRqstAction
} = slice.actions;

export {
    authReducer,
    resetSignInRqstAction,
    resetSignUpRqstAction
};
