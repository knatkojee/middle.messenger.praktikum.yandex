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
import editPasswordTemplate from './EditPasswordTemplate.hbs?raw';
import type Router from '../../core/router';
import * as authServices from '../../services/auth';
import * as userServices from '../../services/user';
import type { StoreProps } from '../../core/Store';
import type { UserDTO, UserUpdateRequest } from '../../api/type';

type ProfilePageProps = {
  title: string;
  labelOk: string;
  labelCancel: string;
  body: string;
  currentView: 'profile' | 'change_data' | 'change_password';
  router: Router;
  userData?: InfoRowProps[];
};

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    const { currentView = 'profile' } = props;

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
      infoRows: [],
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
        // onClick: e => {
        //   e.preventDefault();

        //   console.log(e.target);
        // },
        isSecondary: false,
        type: 'submit',
      }),
      editDataFields: [],

      // password edit

      EditPasswordButton: new Button({
        label: 'Сохранить',
        onClick: () => {},
        isSecondary: false,
        type: 'submit',
      }),
      editPasswordFields: [],

      // form submit

      events: {
        submit: e => {
          e.preventDefault();
          e.stopImmediatePropagation();

          console.log(this.children.editDataFields);
          console.log(this.children.editPasswordFields);

          // TODO this.children.editDataFields = []
          const validationResult = validateForm(this.children.editDataFields, e);

          console.log(validationResult);

          // TODO условие на то что сейчас редактируется
          // if (validationResult) {
          //   console.log(validationResult);

          //   userServices.changeUser(validationResult as UserUpdateRequest);
          // }
        },
      },
    });

    this.getUserData();
  }

  async getUserData() {
    await authServices.me();
  }

  render(): string {
    if (this.props.isLoading) {
      return `<h1>loading</h1>`;
    }

    if (this.props.currentView === 'change_data') {
      const editDataComponents = (this.props.userData as FormFieldType[]).map((el, idx) => {
        return new FormFieldProfile({
          label: el.label,
          inputType: el.inputType,
          inputValue: this.props.userData[idx].value,
          name: el.name,
          onBlur: e => validateForm((this.children.editDataFields as Block[])[idx], e),
        });
      });

      this.children.userData = editDataComponents;

      return `
      {{{Aside}}}

      <section class='profile-section'>
        {{{Avatar}}}

        <form action='#'>
          <div class='profile-info'>

            ${editDataComponents
              .map((_, index) => `<div data-id='${editDataComponents[index].id}'></div>`)
              .join('')}


            <div class='buttons-container'>
              {{{EditDataButton}}}
            </div>
          </div>
        </form>
      </section>

      {{#if showModal}}
        {{{Modal}}}
      {{/if}}

      `;
    }

    if (this.props.currentView === 'change_password') {
      const editPasswordFields = [
        {
          label: 'Старый пароль',
          inputType: 'password',
          name: 'oldPassword',
          onBlur: e => validateForm((this.children.editPasswordFields as Block[])[0], e),
        },
        {
          label: 'Пароль',
          inputType: 'password',
          name: 'newPassword',
          onBlur: e => validateForm((this.children.editPasswordFields as Block[])[1], e),
        },
        {
          label: 'Пароль (ещё раз)',
          inputType: 'password',
          name: 'repeatPassword',
          onBlur: e => validateForm((this.children.editPasswordFields as Block[])[2], e),
        },
      ] as FormFieldType[];

      const editPasswordComponents = editPasswordFields.map((el, idx) => {
        return new FormFieldProfile({
          label: el.label,
          inputType: el.inputType,
          name: el.name,
          onBlur: e => validateForm((this.children.editPasswordFields as Block[])[idx], e),
        });
      });

      this.children.userData = editPasswordComponents;

      return `
      {{{Aside}}}

      <section class='profile-section'>
        {{{Avatar}}}

        <form action='#'>
          <div class='profile-info'>

             ${editPasswordComponents
               .map((_, index) => `<div data-id='${editPasswordComponents[index].id}'></div>`)
               .join('')}

            <div class='buttons-container'>
              {{{EditPasswordButton}}}
            </div>
          </div>
        </form>
      </section>

      {{#if showModal}}
        {{{Modal}}}
      {{/if}}

      `;
    }

    const infoRowsComponents = ((this.props.userData ?? []) as InfoRowProps[]).map(
      el =>
        new InfoRow({
          label: el.label,
          value: el.value,
        })
    ) as InfoRow[];

    this.children.userData = infoRowsComponents;

    return `
    {{{Aside}}}

    <section class='profile-section'>
      {{{Avatar}}}

      <h1 class='profile-name'>{{profileName}}</h1>

      <div class='profile-info'>

        ${infoRowsComponents
          .map((_, index) => `<div data-id='${infoRowsComponents[index].id}'></div>`)
          .join('')}

        <div class='action-buttons'>

          <div class='action-button-row'>
            {{{ButtonChangeData}}}
            <div class='action-divider'></div>
          </div>

          <div class='action-button-row'>
            {{{ButtonChangePassword}}}
            <div class='action-divider'></div>
          </div>

          <div class='action-button-row'>
            {{{ButtonLogout}}}
          </div>

        </div>
      </div>
    </section>

    {{#if showModal}}
      {{{Modal}}}
    {{/if}}
    `;
  }
}

const mapStateToProps = (state: StoreProps) => {
  return {
    isLoading: state.isLoading,
    apiRequestError: state.apiRequestError,
    profileName: state.user?.display_name,
    userData: [
      {
        label: 'Почта',
        value: state.user?.email,
        inputType: 'email',
        name: 'email',
      },
      {
        label: 'Логин',
        value: state.user?.login,
        inputType: 'text',
        name: 'login',
      },
      {
        label: 'Имя',
        value: state.user?.first_name,
        inputType: 'text',
        name: 'first_name',
      },
      {
        label: 'Фамилия',
        value: state.user?.second_name,
        inputType: 'text',
        name: 'second_name',
      },
      {
        label: 'Имя в чате',
        value: state.user?.display_name,
        inputType: 'text',
        name: 'display_name',
      },
      {
        label: 'Телефон',
        value: state.user?.phone,
        inputType: 'tel',
        name: 'phone',
      },
    ],
  };
};

export default connect(mapStateToProps)(withRouter(ProfilePage));
