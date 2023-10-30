import {Box, Link} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout"
import {useNavigate} from "react-router-dom";
import {AuthStorage} from "~/data";
import {CreateExpression} from "~/view/components/CreateExpression";
import {ExpressionList} from "~/view/components/ExpressionList.tsx";

export const Home = () => {
    const navigate = useNavigate()

    const handleLogOut = async () => {
        navigate('/sign-in')
        await AuthStorage.signOut()
    }

    return <Box>
        <Box display="flex" flexDirection="row" style={{
            position: 'fixed',
            top: 10,
            left: 10,
        }}>
            <CreateExpression/>

        </Box>
        <ExpressionList/>
        <Link style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
        }} onClick={handleLogOut}><LogoutIcon/></Link>
    </Box>
}
