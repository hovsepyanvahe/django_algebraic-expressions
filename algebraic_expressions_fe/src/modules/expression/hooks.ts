import {useAppDispatch, useAppSelector} from "~/store/hooks.ts";
import {CreateExpressionParams} from "~/data";
import {
    createExpressionRqstSelector,
    expressionPaginationSelector,
    getExpressionRqstSelector, nextAvailableSelector
} from "~/modules/expression/selectors.ts";
import {resetCreateExpressionAction, resetGetExpressionAction} from "~/modules/expression/slice.ts";
import {createExpressionThunk, getExpressionThunk} from "~/modules/expression/thunks.ts";
import {DEFAULT_INIT_PAGINATION, handleNextPage, handlePrevPage} from "~/store/redux-utils.ts";

export const useCreateExpression = () => {
    const d = useAppDispatch();
    const createExpressionRqst = useAppSelector(createExpressionRqstSelector);

    const create = (params: CreateExpressionParams) => {
        d(createExpressionThunk(params));
    }

    const resetCreateExpressionRqst = () => {
        d(resetCreateExpressionAction());
    }

    return {
        create,
        createExpressionRqst,
        resetCreateExpressionRqst
    }
}


export const useGetExpression = () => {
    const d = useAppDispatch();
    const getExpressionRqst = useAppSelector(getExpressionRqstSelector);
    const pagination = useExpressionPagination();

    const getExpression = (refresh: boolean, position?: 'next' | "prev") => {
        if (position === 'prev' && pagination.offset === 0) return;
        let pag = DEFAULT_INIT_PAGINATION;

        if (position === 'next') {
            pag = handleNextPage(position !== 'next', pagination)
        } else if (position === 'prev') {
            pag = handlePrevPage(pagination)

        }

        d(getExpressionThunk({pagination: pag, refresh}));
    }

    const resetGetExpressionRqst = () => {
        d(resetGetExpressionAction());
    }

    return {
        getExpressionRqst,
        getExpression,
        resetGetExpressionRqst
    }
}

export const useAllExpression = () => useAppSelector(getExpressionRqstSelector)?.data ?? [];

export const useExpressionPagination = () => useAppSelector(expressionPaginationSelector);

export const useNextAvailable = () => useAppSelector(nextAvailableSelector);
