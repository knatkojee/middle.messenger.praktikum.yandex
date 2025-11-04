import { FormWrapper } from '../../components';
import Block from '../../core/block';
import { validateForm } from '../../utils/validation';

export default class LoginPage extends Block {
  constructor() {
    super('main', {
      FormWrapper: new FormWrapper({
        primaryText: 'Авторизоваться',
        secondaryText: 'Нет аккаунта?',
        onPrimaryClick: () => {},
        onSecondaryClick: () => {},
        title: 'Вход',
        showSecondaryButton: true,
        fields: [
          {
            label: 'Логин',
            inputType: 'text',
            // inputValue: 'ivanivanov',
            name: 'login',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[0],
                event
              ),
          },
          {
            label: 'Пароль',
            inputType: 'password',
            // inputValue: 'password',
            name: 'password',
            onBlur: event =>
              validateForm(
                ((this.children.FormWrapper as Block).children.formFields as Block[])[1],
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
