import {BrowserRouter, Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";
import {lazy, Suspense, useEffect, useState} from "react";
import {AuthStorage} from "~/data";
import {createTheme, ThemeProvider} from '@mui/material'
import {red} from "@mui/material/colors";
import {Provider} from "react-redux";
import {store} from "~/store";

const SignIn = lazy(() =>
    import("../pages/SignIn").then((module) => ({default: module.SignIn})),
);

const SignUp = lazy(() =>
    import("../pages/SignUp").then((module) => ({default: module.SignUp})),
);
const Home = lazy(() =>
    import("../pages/Home").then((module) => ({default: module.Home})),
);

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
});


export const App = () => {
    return <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthGuard/>}>
                        <Route path="/sign-in" element={<Suspense>
                            <SignIn/>
                        </Suspense>}/>

                        <Route path="/sign-up" element={<Suspense>
                            <SignUp/>
                        </Suspense>
                        }/>
                    </Route>
                        <Route element={<AppLayout/>}>
                        <Route path="/" element={<Suspense>
                            <Home/>
                        </Suspense>
                        }/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
}



const AuthGuard = () => {
    const location = useLocation()
    const isAuthenticated = useIsAuthenticated()

    if (typeof isAuthenticated === "undefined") {
        return null;
    }
    if (!isAuthenticated && !['/sign-in', '/sign-up'].some((route) => route === location.pathname)) {
        return <Navigate to="/sign-in"/>;
    }

    if (isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return <Outlet/>;

}


const useIsAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        (async () => {
            const token = await AuthStorage.getAccessToken()
            setIsAuthenticated(!!token)
        })()
    }, [])
    return isAuthenticated
}

const AppLayout = () => {
    const isAuthenticated = useIsAuthenticated()

    if (typeof isAuthenticated === "undefined") {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in"/>;
    }

    return <Outlet/>;
}
