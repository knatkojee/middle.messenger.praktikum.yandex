import Block from '../../core/block';
import { Button } from '../Button';
import { FormField } from '../FormField';

type BlurProps = {
  name: string;
  hash?: Object;
  data: {
    root: {
      label: string;
      inputType: string;
      inputValue: string;
      name: string;
      className: string;
    };
  };
  loc?: {
    start: {
      line: number;
      column: number;
    };
    end: {
      line: number;
      column: number;
    };
  };
};

type FormFieldType = {
  label: string;
  inputType: string;
  inputValue: string;
  invalid?: boolean;
  errorMessage?: string;
  name?: string;
  onBlur?: (val: BlurProps) => void;
};

type FormWrapperProps = {
  primaryText: string;
  secondaryText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  fields: FormFieldType[];
  title: string;
  showSecondaryButton?: boolean;
};

export default class FormWrapper extends Block {
  constructor(props: FormWrapperProps) {
    super('div', {
      ...props,
      className: 'form-container',
      PrimaryButton: new Button({
        label: props.primaryText,
        onClick: props.onPrimaryClick,
        isSecondary: false,
        type: 'submit',
      }),
      SecondaryButton: new Button({
        label: props.secondaryText,
        onClick: props.onSecondaryClick,
        isSecondary: true,
        type: 'button',
      }),
      formFields: props.fields.map(
        (props: any) =>
          new FormField({
            ...props,
          })
      ),
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
  public render(): string {
    return `
    <form class="form" id="form">
        <h1 class="form-title">{{ title }}</h1>

        {{#each formFields}}
            {{{ this }}}
        {{/each}}

        <div class="buttons-container">

        {{{ PrimaryButton }}}

        {{#if showSecondaryButton}}
            {{{ SecondaryButton }}}
        {{/if}}

        </div>
    </form>
    `;
  }
}
