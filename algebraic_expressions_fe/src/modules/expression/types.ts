import {RequestSliceState} from '~/store/types';
import {Expression, Pagination} from "~/data";


export interface ExpressionSlice {
  getExpressionRqst: RequestSliceState<Expression[]>;
  createExpressionRqst: RequestSliceState;
  expressionPagination: Pagination;
  nextAvailable: boolean;
}
