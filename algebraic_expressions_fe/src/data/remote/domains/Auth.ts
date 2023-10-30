import {API} from '../api';
import {
    SignInParams,
    SignInResponse,
    SignUpParams,
    SignUpResponse
} from '../models';

export class AuthApi {

    static async signIn(params: SignInParams): Promise<SignInResponse> {
        const {data} = await API.postPublic('/user/login/', params);
        return data;
    }

    static async signUp(params: SignUpParams): Promise<SignUpResponse> {
        const {data} = await API.postPublic('/user/register/', params);
        return data;
    }
}
