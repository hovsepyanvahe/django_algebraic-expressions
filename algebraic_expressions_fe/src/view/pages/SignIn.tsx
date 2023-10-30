import {Box, Button, Link, TextField} from "@mui/material";
import {useSignIn} from "~/modules/auth";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const SignIn = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const {signIn, signInRqst} = useSignIn()

    const handleSubmit = () => {
        signIn({username, password})
    }

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    const handleSignUp = () => {
        navigate('/sign-up')
    }

    useEffect(() => {
        if (signInRqst.state === 'success') {
            navigate('/')
        }
    }, [signInRqst.state]);

    return <Box display="flex" rowGap={2} flex={1} justifyContent="center" alignItems="center" flexDirection="column"
                width="100vw" height="100vh">
        <TextField label="Username" variant="outlined" onChange={handleUsernameChange}/>
        <TextField label="Password" variant="outlined" type="password" onChange={handlePasswordChange}/>
        <Button variant="contained" onClick={handleSubmit}>Login</Button>
        <Link onClick={handleSignUp}>Sign up</Link>
    </Box>
}
