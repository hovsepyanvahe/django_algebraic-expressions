import {useCreateExpression, useGetExpression} from "~/modules/expression";
import {Box, Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";

export const CreateExpression = () => {

    const {create,createExpressionRqst,resetCreateExpressionRqst} = useCreateExpression()
    const {getExpression} = useGetExpression()

    const [expression, setExpression] = useState('')

    const handleSubmit = () => {
        create({expression})
    }

    const handleExpressionChange = (event: any) => {
        setExpression(event.target.value)
    }

    useEffect(() => {
        if(createExpressionRqst.state === 'success'){
            setExpression('')
            resetCreateExpressionRqst()
            getExpression(true)
        }
    }, [createExpressionRqst.state]);

    return <Box  display="flex" flexDirection="row" alignItems="center">
        <TextField label="Expression" variant="outlined"  value={expression} onChange={handleExpressionChange}/>
        <Box padding={2}>
        <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </Box>
    </Box>;
}
