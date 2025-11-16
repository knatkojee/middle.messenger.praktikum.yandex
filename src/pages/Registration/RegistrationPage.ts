import { FormWrapper } from '../../components';
import { ROUTER } from '../../constants';
import Block from '../../core/block';
import type Router from '../../core/router';
import { connect } from '../../utils/connect';
import { validateForm } from '../../utils/validation';
import * as authServices from '../../services/auth';
import { withRouter } from '../../utils/withRouter';
import type { RegisterData } from '../../types';
import type { StoreProps } from '../../core/Store';

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
        onSecondaryClick: () => {
          props.router.go(ROUTER.login);
        },
        onFormSubmit: data => {
          authServices.register(data as RegisterData);
        },
        title: 'Регистрация',
        showSecondaryButton: true,
        fields: [
          {
            label: 'Почта',
            inputType: 'email',
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
            name: 'repeatPassword',
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

const mapStateToProps = (state: StoreProps) => {
  return {
    isLoading: state.isLoading,
    apiRequestError: state.apiRequestError,
  };
};

export default connect(mapStateToProps)(withRouter(RegistrationPage));
