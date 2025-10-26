import { Button, FormFieldProfile } from '../../components';
import Block from '../../core/block';

export default class ProfileEditPasswordPage extends Block {
  constructor(props: any) {
    super('main', {
      ...props,
      className: 'profile-container',
      PrimaryButton: new Button({
        label: 'Сохранить',
        onClick: () => {},
        isSecondary: false,
        type: 'submit',
      }),
      editFields: [
        {
          label: 'Старый пароль',
          inputType: 'password',
          inputValue: 'oldPassword',
          name: 'password_old',
        },
        {
          label: 'Пароль',
          inputType: 'password',
          inputValue: 'password-new-222',
          name: 'newPassword',
        },
        {
          label: 'Пароль (ещё раз)',
          inputType: 'password',
          inputValue: 'password-new-222',
          name: 'newPasswordRepeat',
        },
      ].map((props: any) => {
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
