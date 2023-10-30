import { RequestSliceState } from '~/store/types';


export interface AuthSlice {
  signInRqst: RequestSliceState;
  signUpRqst: RequestSliceState;
}
