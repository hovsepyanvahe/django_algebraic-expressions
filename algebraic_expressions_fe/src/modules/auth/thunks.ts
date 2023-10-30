import {createAsyncThunk} from '@reduxjs/toolkit';


import {AppHttpError, AuthApi, AuthStorage, SignInParams, SignInResponse, SignUpParams, SignUpResponse} from '~/data';

export const signInThunk = createAsyncThunk<
    SignInResponse,
    SignInParams,
    { rejectValue: AppHttpError }
>('signInThunk', async (params, {rejectWithValue}) => {
    try {
        const {token} = await AuthApi.signIn(params);
        await AuthStorage.saveAccessToken(token);
        return {token}


    } catch (e: unknown) {
        const err = e as AppHttpError;
        return rejectWithValue(err);
    }
});


export const signUpThunk = createAsyncThunk<
    SignUpResponse,
    SignUpParams,
    { rejectValue: AppHttpError }
>('signUpThunk', async (params, {rejectWithValue}) => {
    try {
        return await AuthApi.signUp(params);


    } catch (e: unknown) {
        const err = e as AppHttpError;
        return rejectWithValue(err);
    }
});
