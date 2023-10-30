import { RootState } from '~/store/types';

export const signInRqstSelector = (s: RootState) => s.auth.signInRqst;
export const signUpRqstSelector = (s: RootState) => s.auth.signUpRqst;
