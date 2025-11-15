import { FormWrapper } from '../../components';
import { ROUTER } from '../../constants';
import Block from '../../core/block';
import type Router from '../../core/router';
import { connect } from '../../utils/connect';
import { validateForm } from '../../utils/validation';
import { withRouter } from '../../utils/withRouter';
import * as authServices from '../../services/auth';
import type { LoginData } from '../../types';
import type { StoreProps } from '../../core/Store';

type LoginPageProps = {
  router: Router;
};

class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super('main', {
      ...props,
      FormWrapper: new FormWrapper({
        primaryText: 'Авторизоваться',
        secondaryText: 'Нет аккаунта?',
        onFormSubmit: data => {
          authServices.login(data as LoginData);
        },
        onSecondaryClick: () => {
          props.router.go(ROUTER.registration);
        },
        title: 'Вход',
        showSecondaryButton: true,
        fields: [
          {
            label: 'Логин',
            inputType: 'text',
            inputValue: 'yar',
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
            inputValue: 'asdQWE123',
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
    return `
      {{#if isLoading}}
        <h1>spinner</h1>
      {{/if}}

      {{{ FormWrapper }}}
     `;
  }
}

const mapStateToProps = (state: StoreProps) => {
  return {
    isLoading: state.isLoading,
    apiRequestError: state.apiRequestError,
  };
};

export default connect(mapStateToProps)(withRouter(LoginPage));
