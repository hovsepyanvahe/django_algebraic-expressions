import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    AppHttpError,
    CreateExpressionParams,
    CreateExpressionResponse,
    Expression,
    ExpressionApi,
    Pagination
} from "~/data";


export const createExpressionThunk = createAsyncThunk<
    CreateExpressionResponse,
    CreateExpressionParams,
    { rejectValue: AppHttpError }
>('createExpressionThunk', async (params, {rejectWithValue}) => {
    try {
        return await ExpressionApi.createExpression(params);

    } catch (e: unknown) {
        const err = e as AppHttpError;
        return rejectWithValue(err);
    }
});


export const getExpressionThunk = createAsyncThunk<
    Expression[],
    { pagination: Pagination, refresh: boolean },
    {
        rejectValue: AppHttpError,
        fulfilledMeta: {
            pagination: Pagination
            refresh: boolean,
            nextAvailable:boolean
        }
    }
>('getExpressionThunk', async (params, {rejectWithValue, fulfillWithValue}) => {
    try {
        const {pagination, refresh} = params;
        const data = await ExpressionApi.getExpression(pagination);
        return fulfillWithValue(data.results, {pagination, refresh,nextAvailable:!!data.next});
    } catch (e: unknown) {
        const err = e as AppHttpError;
        return rejectWithValue(err);
    }
});
