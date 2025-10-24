import { FormWrapper } from '../../components';
import Block from '../../core/block';

export default class RegistrationPage extends Block {
  constructor(props: any) {
    super('main', {
      ...props,
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
          },
          {
            label: 'Логин',
            inputType: 'text',
            inputValue: 'ivanivanov',
            name: 'login',
          },
          {
            label: 'Имя',
            inputType: 'text',
            inputValue: 'Иван',
            name: 'first_name',
          },
          {
            label: 'Фамилия',
            inputType: 'text',
            inputValue: 'Иванов',
            name: 'second_name',
          },
          {
            label: 'Телефон',
            inputType: 'tel',
            inputValue: '+7 (909) 967 30 30',
            name: 'phone',
          },
          {
            label: 'Пароль',
            inputType: 'password',
            inputValue: 'password',
            invalid: true,
            name: 'password',
          },
          {
            label: 'Пароль (ещё раз)',
            inputType: 'password',
            inputValue: 'password1',
            invalid: true,
            errorMessage: 'Пароли не совпадают',
            name: 'password_repeat',
          },
        ],
      }),
    });
  }

  render(): string {
    return `{{{ FormWrapper }}}`;
  }
}
