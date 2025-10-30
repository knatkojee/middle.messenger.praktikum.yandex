import { FormWrapper } from '../../components';
import Block from '../../core/block';
import { validateForm } from '../../utils/validation';

export default class RegistrationPage extends Block {
  constructor() {
    super('main', {
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
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[0],
                event
              ),
          },
          {
            label: 'Логин',
            inputType: 'text',
            inputValue: 'ivanivanov',
            name: 'login',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[1],
                event
              ),
          },
          {
            label: 'Имя',
            inputType: 'text',
            inputValue: 'Иван',
            name: 'first_name',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[2],
                event
              ),
          },
          {
            label: 'Фамилия',
            inputType: 'text',
            inputValue: 'Иванов',
            name: 'second_name',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[3],
                event
              ),
          },
          {
            label: 'Телефон',
            inputType: 'tel',
            inputValue: '+7 (909) 967 30 30',
            name: 'phone',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[4],
                event
              ),
          },
          {
            label: 'Пароль',
            inputType: 'password',
            inputValue: 'password',
            name: 'password',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[5],
                event
              ),
          },
          {
            label: 'Пароль (ещё раз)',
            inputType: 'password',
            inputValue: 'password1',
            name: 'password_repeat',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[6],
                event
              ),
          },
        ],
      }),
    });
  }

  render(): string {
    return `{{{ FormWrapper }}}`;
  }
}
