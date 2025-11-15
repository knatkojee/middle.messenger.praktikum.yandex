import {
  ActionButton,
  Aside,
  Avatar,
  Button,
  FormFieldProfile,
  InfoRow,
  Modal,
} from '../../components';
import type { FormFieldType } from '../../components/FormWrapper/FormWrapper';
import type { InfoRowProps } from '../../components/InfoRow/InfoRow';
import Block from '../../core/block';
import { connect } from '../../utils/connect';
import { validateForm } from '../../utils/validation';
import { withRouter } from '../../utils/withRouter';
import profileTemplate from './profileTemplate.hbs?raw';
import editDataTemplate from './EditDataTemplate.hbs?raw';
import editPasswordTemplate from './EditPasswordTemplate.hbs?raw';
import type Router from '../../core/router';
import * as authServices from '../../services/auth';

type ProfilePageProps = {
  title: string;
  labelOk: string;
  labelCancel: string;
  body: string;
  currentView: 'profile' | 'change_data' | 'change_password';
  router: Router;
};

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    const { currentView = 'profile' } = props;
    const infoRows = [
      {
        label: 'Почта',
        value: 'pochta@yandex.ru',
      },
      {
        label: 'Логин',
        value: 'ivanivanov',
      },
      {
        label: 'Имя',
        value: 'Иван',
      },
      {
        label: 'Фамилия',
        value: 'Иванов',
      },
      {
        label: 'Имя в чате',
        value: 'Иван',
      },
      {
        label: 'Телефон',
        value: '+7 (909) 967 30 30',
      },
    ] as InfoRowProps[];

    const editPasswordFields = [
      {
        label: 'Старый пароль',
        inputType: 'password',
        inputValue: 'oldPassword',
        name: 'password_old',
        onBlur: e => validateForm((this.children.editFields as Block[])[0], e),
      },
      {
        label: 'Пароль',
        inputType: 'password',
        inputValue: 'password-new-222',
        name: 'password',
        onBlur: e => validateForm((this.children.editFields as Block[])[1], e),
      },
      {
        label: 'Пароль (ещё раз)',
        inputType: 'password',
        inputValue: 'password-new-222',
        name: 'password_repeat',
        onBlur: e => validateForm((this.children.editFields as Block[])[2], e),
      },
    ] as FormFieldType[];

    const editDataFields = [
      {
        label: 'Почта',
        inputType: 'email',
        inputValue: 'pochta@yandex.ru',
        name: 'email',
        onBlur: e => validateForm((this.children.editFields as Block[])[0], e),
      },
      {
        label: 'Логин',
        inputType: 'text',
        inputValue: 'ivanivanov',
        name: 'login',
        onBlur: e => validateForm((this.children.editFields as Block[])[1], e),
      },
      {
        label: 'Имя',
        inputType: 'text',
        inputValue: 'Иван',
        name: 'first_name',
        onBlur: e => validateForm((this.children.editFields as Block[])[2], e),
      },
      {
        label: 'Фамилия',
        inputType: 'text',
        inputValue: 'Иванов',
        name: 'second_name',
        onBlur: e => validateForm((this.children.editFields as Block[])[3], e),
      },
      {
        label: 'Имя в чате',
        inputType: 'text',
        inputValue: 'Иван',
        name: 'display_name',
        onBlur: e => validateForm((this.children.editFields as Block[])[4], e),
      },
      {
        label: 'Телефон',
        inputType: 'tel',
        inputValue: '+7 (909) 967 30 30',
        name: 'phone',
        onBlur: e => validateForm((this.children.editFields as Block[])[5], e),
      },
    ] as FormFieldType[];

    super('main', {
      ...props,
      className: 'profile-container',
      Aside: new Aside({
        onButtonBackClick: () => {
          window.history.back();
        },
      }),
      currentView: currentView,
      showModal: false,
      infoRows: infoRows.map(
        el =>
          new InfoRow({
            label: el.label,
            value: el.value,
          })
      ),
      Modal: new Modal({
        title: 'Загрузите файл',
        labelCancel: true,
        onSubmit: e => {
          e.preventDefault();

          if (e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            console.log(data);
          }

          this.setProps({
            showModal: false,
          });
        },
        ButtonOk: new Button({
          label: 'Go',
          type: 'submit',
        }),
        ButtonCancel: new Button({
          label: 'No',
          type: 'button',
          isSecondary: true,
          onClick: () => {
            this.setProps({
              showModal: false,
            });
          },
        }),
      }),
      Avatar: new Avatar({
        onClick: (e: PointerEvent) => {
          e.preventDefault();

          this.setProps({
            showModal: true,
          });
        },
      }),
      ButtonChangeData: new ActionButton({
        label: 'Изменить данные',
        onClick: () => {
          this.setProps({
            currentView: 'change_data',
          });
        },
      }),
      ButtonChangePassword: new ActionButton({
        label: 'Изменить пароль',
        onClick: () => {
          this.setProps({
            currentView: 'change_password',
          });
        },
      }),
      ButtonLogout: new ActionButton({
        label: 'Выйти',
        red: true,
        onClick: () => {
          authServices.logout();
        },
      }),

      // data edit

      EditDataButton: new Button({
        label: 'Сохранить',
        onClick: () => {},
        isSecondary: false,
        type: 'submit',
      }),
      editDataFields: editDataFields.map(props => {
        return new FormFieldProfile({
          ...props,
        });
      }),

      // password edit

      EditPasswordButton: new Button({
        label: 'Сохранить',
        onClick: () => {},
        isSecondary: false,
        type: 'submit',
      }),
      editPasswordFields: editPasswordFields.map(props => {
        return new FormFieldProfile({
          ...props,
        });
      }),
    });
  }

  render(): string {
    if (this.props.currentView === 'change_data') {
      return editDataTemplate;
    }
    if (this.props.currentView === 'change_password') {
      return editPasswordTemplate;
    }
    return profileTemplate;
  }
}

const mapStateToProps = (state: any) => {
  console.log(state);

  return {
    isLoading: state.isLoading,
    loginError: state.loginError,
  };
};

export default connect(mapStateToProps)(withRouter(ProfilePage));
