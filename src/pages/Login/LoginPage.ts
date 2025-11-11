import { FormWrapper } from '../../components';
import { ROUTER } from '../../constants';
import Block from '../../core/block';
import type Router from '../../core/router';
import { connect } from '../../utils/connect';
import { validateForm } from '../../utils/validation';
import { withRouter } from '../../utils/withRouter';

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
        onPrimaryClick: () => {
          props.router.go(ROUTER.chats);
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
            inputValue: 'ivanivansov',
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
            inputValue: 'Password123',
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

// TODO any
const mapStateToProps = (state: any) => {
  return {
    isLoading: state.isLoading,
    loginError: state.loginError,
  };
};

export default connect(mapStateToProps)(withRouter(LoginPage));
