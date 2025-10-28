/* eslint-disable @typescript-eslint/no-explicit-any */
// Используем any для context, так как структура детей динамическая и TypeScript не может её заранее знать.
export const validateFioField = (e: FocusEvent, context: any, index: number) => {
  const val = (e.target as HTMLInputElement)?.value;
  const nameRegex = /^[A-ZА-Я][a-zа-я-]*$/;

  let error = '';
  let isInvalid = false;

  if (!nameRegex.test(val)) {
    error =
      'Допустимы латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис';
    isInvalid = true;
  }
  context.children.FormWrapper.children.formFields[index].setProps({
    isInvalid,
    errorMessage: error,
  });
};

export const validateLoginField = (e: FocusEvent, context: any, index: number) => {
  const val = (e.target as HTMLInputElement)?.value;
  const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;

  let error = '';
  let isInvalid = false;

  if (!loginRegex.test(val)) {
    error =
      'Логин может содержать от 3 до 20 символов, латиницу, цифры (но не состоять из них), дефис и нижнее подчёркивание';
    isInvalid = true;
  }
  context.children.FormWrapper.children.formFields[index].setProps({
    isInvalid,
    errorMessage: error,
  });
};

export const validateEmail = (e: FocusEvent, context: any, index: number) => {
  const val = (e.target as HTMLInputElement)?.value;
  const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

  let error = '';
  let isInvalid = false;

  if (!emailRegex.test(val)) {
    error = 'Введите корректный адрес электронной почты';
    isInvalid = true;
  }

  context.children.FormWrapper.children.formFields[index].setProps({
    isInvalid,
    errorMessage: error,
  });
};

export const validatePhone = (e: FocusEvent, context: any, index: number) => {
  const val = (e.target as HTMLInputElement)?.value;
  const phoneRegex = /^\+?\d{10,15}$/;

  let error = '';
  let isInvalid = false;

  if (!phoneRegex.test(val)) {
    error = 'Введите корректный телефон';
    isInvalid = true;
  }

  context.children.FormWrapper.children.formFields[index].setProps({
    isInvalid,
    errorMessage: error,
  });
};

export const validatePassword = (e: FocusEvent, context: any, index: number) => {
  const val = (e.target as HTMLInputElement)?.value;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;

  let error = '';
  let isInvalid = false;

  if (!passwordRegex.test(val)) {
    error = 'Пароль должен содержать верхний и нижний регистр, цифру';
    isInvalid = true;
  }

  if (val.length < 8) {
    error = 'Пароль должен содержать более восьми символов';
    isInvalid = true;
  }

  context.children.FormWrapper.children.formFields[index].setProps({
    isInvalid,
    errorMessage: error,
  });
};

export const validateMessage = (e: FocusEvent, context: any, index: number) => {
  const val = (e.target as HTMLInputElement)?.value;
  const messageRegex = /.+/;

  let error = '';
  let isInvalid = false;

  if (!messageRegex.test(val)) {
    error = 'Сообщение не может быть пустым';
    isInvalid = true;
  }

  context.children.FormWrapper.children.formFields[index].setProps({
    isInvalid,
    errorMessage: error,
  });
};
