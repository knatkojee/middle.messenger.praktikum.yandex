import { FormWrapper } from '../../components';
import Block from '../../core/block';
import { validateLoginField, validatePassword } from '../../utils/validation';

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
            inputValue: 'ivanivanov',
            name: 'login',
            onBlur: e => validateLoginField(e, this, 0),
          },
          {
            label: 'Пароль',
            inputType: 'password',
            inputValue: 'password',
            name: 'password',
            onBlur: e => validatePassword(e, this, 1),
          },
        ],
      }),
    });
  }

  render(): string {
    return `{{{ FormWrapper }}}`;
  }
}
