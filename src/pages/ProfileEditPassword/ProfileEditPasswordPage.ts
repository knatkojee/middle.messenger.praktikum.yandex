import { Button, FormFieldProfile } from '../../components';
import type { FormFieldType } from '../../components/FormWrapper/FormWrapper';
import Block from '../../core/block';
import { validateForm } from '../../utils/validation';

export default class ProfileEditPasswordPage extends Block {
  constructor() {
    const formFields = [
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

    super('main', {
      className: 'profile-container',
      PrimaryButton: new Button({
        label: 'Сохранить',
        onClick: () => {},
        isSecondary: false,
        type: 'submit',
      }),
      editFields: formFields.map(props => {
        return new FormFieldProfile({
          ...props,
        });
      }),
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          e.stopImmediatePropagation();

          const validationResult = validateForm(this.children.editFields, e);

          console.log(validationResult);
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
