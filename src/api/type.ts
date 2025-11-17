export type APIError = {
  reason: string;
};

export type SignUpResponse = {
  id: number;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type UserDTOFromState = {
  label: string;
  value: string;
  inputType: string;
  name: string;
};

export type UserUpdateRequest = Omit<Partial<UserDTO>, 'id'>;
export type UserUpdatePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

export type CreateUser = Omit<UserDTO, 'avatar' | 'display_name' | 'id'> & {
  password: string;
};

export type CreateChat = {
  title: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

type LastMessage = {
  user: UserDTO;
  time: string;
  content: string;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: LastMessage | null;
};
