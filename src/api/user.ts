import { HOST } from '../constants';
import { HTTPTransport, type HTTPResponse } from '../core/httpTransport';
import type { UserDTO, UserUpdateAvatarRequest, UserUpdatePasswordRequest, UserUpdateRequest } from './type';

const userApi = new HTTPTransport(`${HOST}/user`);

export default class UserApi {
  async changeUser(data: UserUpdateRequest): Promise<HTTPResponse<UserDTO>> {
    return userApi.put<UserDTO>('/profile', data);
  }

  async changeUserPassword(data: UserUpdatePasswordRequest): Promise<HTTPResponse<string>> {
    return userApi.put<string>('/password', data);
  }

  async changeUserAvatar(data: UserUpdateAvatarRequest): Promise<HTTPResponse<string>> {
    const formData = new FormData();
    formData.append('avatar', data.avatar);
    return userApi.put<string>('/profile/avatar', formData);
  }
}
