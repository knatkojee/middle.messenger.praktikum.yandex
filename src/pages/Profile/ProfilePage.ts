import { Avatar, Button, InfoRow, Modal } from '../../components';
import type { InfoRowProps } from '../../components/InfoRow/InfoRow';
import Block from '../../core/block';

type ProfilePageProps = {
  title: string;
  labelOk: string;
  labelCancel: string;
  body: string;
};

export default class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
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

    super('main', {
      ...props,
      className: 'profile-container',
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
                    fill="var(--main-color)"
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
                {{{ Avatar }}}

                <h1 class="profile-name">{{ profileName }}</h1>

                <div class="profile-info">
                    {{{ infoRows }}}

                    <div class="action-buttons">
                        {{> ActionButton text="Изменить данные" withDivider=true}}
                        {{> ActionButton text="Изменить пароль" withDivider=true}}
                        {{> ActionButton text="Выйти" red=true}}
                    </div>
                </div>
            </section>


            {{#if showModal}} 
                {{{ Modal }}}
            {{/if}}
        `;
  }
}
