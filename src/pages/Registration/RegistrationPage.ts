import { FormWrapper } from '../../components';
import { ROUTER } from '../../constants';
import Block from '../../core/block';
import type Router from '../../core/router';
import { connect } from '../../utils/connect';
import { validateForm } from '../../utils/validation';
import { withRouter } from '../../utils/withRouter';

type RegistrationPageProps = {
  router: Router;
};

class RegistrationPage extends Block {
  constructor(props: RegistrationPageProps) {
    super('main', {
      ...props,
      FormWrapper: new FormWrapper({
        primaryText: 'Зарегистрироваться',
        secondaryText: 'Войти',
        onPrimaryClick: () => {
          props.router.go(ROUTER.login);
        },
        onSecondaryClick: () => {
          props.router.go(ROUTER.login);
        },
        title: 'Регистрация',
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

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.isLoading,
    loginError: state.loginError,
  };
};

export default connect(mapStateToProps)(withRouter(RegistrationPage));
