import {Box, Button, Link, TextField} from "@mui/material";
import {useSignUp} from "~/modules/auth";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const {signUp,signUpRqst,resetSignUpRqst} = useSignUp()

    const handleSubmit = () => {
        signUp({username, password, email})
    }

    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value)
    }

    const handleSignIn = () => {
        navigate('/sign-in')
    }

    useEffect(() => {
        if(signUpRqst.state === 'success'){
            navigate('/sign-in')
            resetSignUpRqst()
        }

    }, [signUpRqst.state]);

    return <Box display="flex" rowGap={2} flex={1} justifyContent="center" alignItems="center" flexDirection="column"
                width="100vw" height="100vh">
        <TextField label="Username" variant="outlined" onChange={handleUsernameChange}/>
        <TextField label="Email" variant="outlined" onChange={handleEmailChange}/>
        <TextField label="Password" variant="outlined" type="password" onChange={handlePasswordChange}/>
        <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
        <Link onClick={handleSignIn}>Sign in</Link>
    </Box>
}
