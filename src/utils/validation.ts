import type Block from '../core/block';

const validators = {
  email: (val: string) => {
    const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
    return emailRegex.test(val) ? '' : 'Введите корректный адрес электронной почты';
  },
  password: (val: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    return passwordRegex.test(val) ? '' : 'Введите корректный пароль';
  },
  newPassword: (val: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    return passwordRegex.test(val) ? '' : 'Введите корректный пароль';
  },
  oldPassword: (val: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    return passwordRegex.test(val) ? '' : 'Введите корректный пароль';
  },
  repeatPassword: (val: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    return passwordRegex.test(val) ? '' : 'Введите корректный пароль';
  },
  phone: (val: string) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(val) ? '' : 'Введите корректный телефон';
  },
  login: (val: string) => {
    const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;
    return loginRegex.test(val) ? '' : 'Введите корректный логин';
  },
  first_name: (val: string) => {
    const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё]*$/;
    return nameRegex.test(val)
      ? ''
      : 'Допустимы латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис';
  },
  second_name: (val: string) => {
    const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё]*$/;
    return nameRegex.test(val)
      ? ''
      : 'Допустимы латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис';
  },
  display_name: (val: string) => {
    const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё]*$/;
    return nameRegex.test(val)
      ? ''
      : 'Допустимы латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис';
  },
  message: (val: string) => {
    const messageRegex = /.+/;
    return messageRegex.test(val) ? '' : 'Сообщение не может быть пустым';
  },
};

const validate = (field: Block) => {
  console.log(field);

  const input = field.getContent()?.querySelector('input');
  let isInputValid = true;

  if (input) {
    const value = input.value;
    const fieldName = input.name;

    const error = validators[fieldName as keyof typeof validators]?.(value);

    if (error) {
      isInputValid = false;
      field.setProps({
        isInvalid: true,
        errorMessage: error,
      });
    } else {
      field.setProps({
        isInvalid: false,
        errorMessage: '',
      });
    }
  }

  return isInputValid;
};

export const validateForm = (formElements: Block | Block[], event: SubmitEvent | FocusEvent) => {
  let isFormValid = true;

  if (Array.isArray(formElements)) {
    if (formElements.map(validate).includes(false)) {
      isFormValid = false;
    }
  } else {
    if (!validate(formElements)) {
      isFormValid = false;
    }
  }

  if (event instanceof SubmitEvent && event.target instanceof HTMLFormElement) {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (isFormValid) {
      return data;
    } else {
      throw new Error('Форма содержит ошибки');
    }
  }

  return;
};
