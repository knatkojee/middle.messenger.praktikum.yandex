import { HOST } from '../constants';
import { HTTPTransport, type HTTPResponse } from '../core/httpTransport';
import type { CreateUser, LoginRequestData, SignUpResponse, UserDTO } from './type';

const authApi = new HTTPTransport(`${HOST}/auth`);

export default class AuthApi {
  async create(data: CreateUser): Promise<HTTPResponse<SignUpResponse>> {
    return authApi.post<SignUpResponse>('/signup', data);
  }

  async login(data: LoginRequestData): Promise<HTTPResponse<void>> {
    return authApi.post<void>('/signin', data);
  }

  async me(): Promise<HTTPResponse<UserDTO>> {
    return authApi.get<UserDTO>('/user');
  }

  async logout(): Promise<HTTPResponse<void>> {
    return authApi.post<void>('/logout');
  }
}
