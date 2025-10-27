import { FormWrapper } from '../../components';
import Block from '../../core/block';
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateFioField,
  validateLoginField,
} from '../../utils/validation';

export default class RegistrationPage extends Block {
  constructor(props: any) {
    super('main', {
      ...props,
      children: props.children,
      FormWrapper: new FormWrapper({
        primaryText: 'Регистрация',
        secondaryText: 'Зарегистрироваться',
        onPrimaryClick: () => {},
        onSecondaryClick: () => {},
        title: 'Вход',
        showSecondaryButton: true,
        fields: [
          {
            label: 'Почта',
            inputType: 'email',
            inputValue: 'pochta@yandex.ru',
            name: 'email',
            onBlur: e => validateEmail(e, this, 0),
          },
          {
            label: 'Логин',
            inputType: 'text',
            inputValue: 'ivanivanov',
            name: 'login',
            onBlur: e => validateLoginField(e, this, 1),
          },
          {
            label: 'Имя',
            inputType: 'text',
            inputValue: 'Иван',
            name: 'first_name',
            onBlur: e => validateFioField(e, this, 2),
          },
          {
            label: 'Фамилия',
            inputType: 'text',
            inputValue: 'Иванов',
            name: 'second_name',
            onBlur: e => validateFioField(e, this, 3),
          },
          {
            label: 'Телефон',
            inputType: 'tel',
            inputValue: '+7 (909) 967 30 30',
            name: 'phone',
            onBlur: e => validatePhone(e, this, 4),
          },
          {
            label: 'Пароль',
            inputType: 'password',
            inputValue: 'password',
            name: 'password',
            onBlur: e => validatePassword(e, this, 5),
          },
          {
            label: 'Пароль (ещё раз)',
            inputType: 'password',
            inputValue: 'password1',
            name: 'password_repeat',
            onBlur: e => validatePassword(e, this, 6),
          },
        ],
      }),
    });
  }

  render(): string {
    return `{{{ FormWrapper }}}`;
  }
}
