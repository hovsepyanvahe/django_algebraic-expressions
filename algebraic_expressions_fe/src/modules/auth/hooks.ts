import {useAppDispatch, useAppSelector} from "~/store/hooks.ts";
import {SignInParams, SignUpParams} from "~/data";
import {signInThunk, signUpThunk} from "~/modules/auth/thunks.ts";
import {signInRqstSelector, signUpRqstSelector} from "~/modules/auth/selectors.ts";
import {resetSignInRqstAction, resetSignUpRqstAction} from "~/modules/auth/slice.ts";

export const useSignIn = () => {
    const d = useAppDispatch();
    const signInRqst = useAppSelector(signInRqstSelector);

    const signIn = (params: SignInParams) => {
        d(signInThunk(params));
    }

    const resetSignInRqst = () => {
        d(resetSignInRqstAction());
    }

    return {
        signIn,
        signInRqst,
        resetSignInRqst
    }
}


export const useSignUp = () => {
    const d = useAppDispatch();
    const signUpRqst = useAppSelector(signUpRqstSelector);

    const signUp = (params: SignUpParams) => {
        d(signUpThunk(params));
    }

    const resetSignUpRqst = () => {
        d(resetSignUpRqstAction());
    }

    return {
        signUpRqst,
        signUp,
        resetSignUpRqst
    }
}
