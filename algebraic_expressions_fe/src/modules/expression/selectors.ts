import { RootState } from '~/store/types';

export const expressionPaginationSelector = (state: RootState) => state.expression.expressionPagination;

export const createExpressionRqstSelector = (state: RootState) => state.expression.createExpressionRqst;

export const getExpressionRqstSelector = (state: RootState) => state.expression.getExpressionRqst;

export const nextAvailableSelector = (state: RootState) => state.expression.nextAvailable;
