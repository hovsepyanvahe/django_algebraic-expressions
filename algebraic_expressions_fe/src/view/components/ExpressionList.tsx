import {useAllExpression, useGetExpression, useNextAvailable} from "~/modules/expression";
import {useEffect} from "react";
import {Box, Link} from "@mui/material";
import moment from "moment";

export const ExpressionList = () => {
    const {getExpressionRqst, getExpression} = useGetExpression()

    const expression = useAllExpression()
    const nextAvailable = useNextAvailable()
    
    useEffect(() => {
        getExpression(true)
    }, []);

    const loading = getExpressionRqst.state === 'loading'

    const onPrev = () => {
        getExpression(true,'prev')
    }

    const onNext = () => {
        getExpression(true,'next')
    }
    return <Box marginTop={16} justifyContent="center">
        Expressions History
        <ul style={{
            maxHeight:'50vh',
            overflowY:'scroll',

        }}>
            {loading && <li>Loading...</li>}
            {expression.length === 0 && !loading && <li>No expressions found</li>}
            {expression.map((expression) => (
                <li key={expression.id}>
                    <p>Expression: {expression.expression}</p>
                    <p> Result: {expression.result}</p>
                    <p> Date: {moment(expression.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>

                </li>
            ))}
        </ul>
        <Box display="flex" flexDirection="row" columnGap={8}  padding={8} >
            {expression.length !== 0  && <Link onClick={onPrev}>Prev</Link>}
            {nextAvailable && <Link onClick={onNext}>Next</Link>}
        </Box>
    </Box>
}
