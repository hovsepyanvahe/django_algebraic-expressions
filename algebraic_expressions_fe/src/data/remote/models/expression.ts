export type CreateExpressionParams = {
    expression: string;
};


export type  CreateExpressionResponse = {
    result: string,
}


export type  Expression = {
    id: string,
    expression: string,
    result: string,
    created_at: Date
}
