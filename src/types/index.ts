export type LoginData = {
  login: string;
  password: string;
};

export type RegisterData = {
  email: string;
  first_name: string;
  login: string;
  password: string;
  password_repeat: string;
  phone: string;
  second_name: string;
};

export type SubmitData = { [k: string]: FormDataEntryValue };
