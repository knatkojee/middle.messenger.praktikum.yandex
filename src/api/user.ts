import { HOST } from '../constants';
import { HTTPTransport, type HTTPResponse } from '../core/httpTransport';
import type { UserDTO, UserUpdateRequest } from './type';

const userApi = new HTTPTransport(`${HOST}/user`);

export default class UserApi {
  async changeUser(data: UserUpdateRequest): Promise<HTTPResponse<UserDTO>> {
    return userApi.put<UserDTO>('/profile', data);
  }
}
