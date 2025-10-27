import { Button, FormFieldProfile } from '../../components';
import type { FormFieldType } from '../../components/FormWrapper/FormWrapper';
import Block from '../../core/block';

export default class ProfileEditPage extends Block {
  constructor() {
    super('main', {
      className: 'profile-container',
      PrimaryButton: new Button({
        label: 'Сохранить',
        onClick: () => {},
        isSecondary: false,
        type: 'submit',
      }),
      editFields: (
        [
          {
            label: 'Почта',
            inputType: 'email',
            inputValue: 'pochta@yandex.ru',
            name: 'email',
            onBlur: e => {
              const val = (e.target as HTMLInputElement)?.value;
              const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;

              let error = '';
              let isInvalid = false;

              if (!emailRegex.test(val)) {
                error = 'Введите корректный адрес электронной почты';
                isInvalid = true;
              }

              this.children.editFields[0].setProps({
                isInvalid,
                errorMessage: error,
              });
            },
          },
          {
            label: 'Логин',
            inputType: 'text',
            inputValue: 'ivanivanov',
            name: 'login',
            onBlur: e => {
              const val = (e.target as HTMLInputElement)?.value;
              const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;

              let error = '';
              let isInvalid = false;

              if (!loginRegex.test(val)) {
                error =
                  'Логин может содержать от 3 до 20 символов, латиницу, цифры (но не состоять из них), дефис и нижнее подчёркивание';
                isInvalid = true;
              }

              this.children.editFields[1].setProps({
                isInvalid,
                errorMessage: error,
              });
            },
          },
          {
            label: 'Имя',
            inputType: 'text',
            inputValue: 'Иван',
            name: 'first_name',
            onBlur: e => {
              const val = (e.target as HTMLInputElement)?.value;
              const nameRegex = /^[A-ZА-Я][a-zа-я-]*$/;

              let error = '';
              let isInvalid = false;

              if (!nameRegex.test(val)) {
                error =
                  'Допустимы латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис';
                isInvalid = true;
              }

              this.children.editFields[2].setProps({
                isInvalid,
                errorMessage: error,
              });
            },
          },
          {
            label: 'Фамилия',
            inputType: 'text',
            inputValue: 'Иванов',
            name: 'second_name',
            onBlur: e => {
              const val = (e.target as HTMLInputElement)?.value;
              const nameRegex = /^[A-ZА-Я][a-zа-я-]*$/;

              let error = '';
              let isInvalid = false;

              if (!nameRegex.test(val)) {
                error =
                  'Допустимы латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис';
                isInvalid = true;
              }

              this.children.editFields[3].setProps({
                isInvalid,
                errorMessage: error,
              });
            },
          },
          {
            label: 'Имя в чате',
            inputType: 'text',
            inputValue: 'Иван',
            name: 'display_name',
            onBlur: e => {
              const val = (e.target as HTMLInputElement)?.value;
              const nameRegex = /^[A-ZА-Я][a-zа-я-]*$/;

              let error = '';
              let isInvalid = false;

              if (!nameRegex.test(val)) {
                error =
                  'Допустимы латиница или кириллица, первая буква заглавная, без пробелов и цифр, допустим дефис';
                isInvalid = true;
              }

              this.children.editFields[4].setProps({
                isInvalid,
                errorMessage: error,
              });
            },
          },
          {
            label: 'Телефон',
            inputType: 'tel',
            inputValue: '+7 (909) 967 30 30',
            name: 'phone',
            onBlur: e => {
              const val = (e.target as HTMLInputElement)?.value;
              const phoneRegex = /^\+?\d{10,15}$/;

              let error = '';
              let isInvalid = false;

              if (!phoneRegex.test(val)) {
                error = 'Введите корректный телефон';
                isInvalid = true;
              }

              this.children.editFields[5].setProps({
                isInvalid,
                errorMessage: error,
              });
            },
          },
        ] as FormFieldType[]
      ).map((props: any) => {
        return new FormFieldProfile({
          ...props,
        });
      }),
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const data = Object.fromEntries(formData);

          console.log(data);
        },
      },
    });
  }

  render(): string {
    return `
        <aside class="sidebar">
          <button class="back-button" aria-label="Go back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <circle
                cx="14"
                cy="14"
                r="14"
                transform="rotate(-180 14 14)"
                fill="#3369F3"
              />
              <rect
                x="20"
                y="14.8"
                width="11"
                height="1.6"
                transform="rotate(-180 20 14.8)"
                fill="white"
              />
              <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6" />
            </svg>
          </button>
        </aside>

        <section class="profile-section">
          {{> Avatar}}

          <form action="#">
            <div class="profile-info">

              {{#each editFields}}
                {{{ this }}}
              {{/each}}

              <div class="buttons-container">
                {{{ PrimaryButton }}}
              </div>
            </div>
          </form>
        </section>
    `;
  }
}
