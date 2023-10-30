import {API} from '../api';
import {CreateExpressionParams, CreateExpressionResponse, Expression, Pagination} from "~/data";


export class ExpressionApi {

    static async createExpression(params: CreateExpressionParams): Promise<CreateExpressionResponse> {
        const {data} = await API.post('/user/expression/', params);
        return data;
    }

    static async getExpression(params: Pagination): Promise<{
        results: Expression[],
        count: number,
        next: string | null,
    }> {
        const {data} = await API.get('/user/expressions-history', params);
        return data;
    }
}
