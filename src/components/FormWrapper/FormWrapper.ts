import Block from '../../core/block';
import { validateForm } from '../../utils/validation';
import { Button } from '../Button';
import { FormField } from '../FormField';

export type FormFieldType = {
  label: string;
  inputType: string;
  inputValue?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  name: string;
  onBlur?: (e: FocusEvent) => void;
};

export type FormWrapperProps = {
  primaryText: string;
  secondaryText: string;
  onPrimaryClick?: (e: PointerEvent) => void;
  onSecondaryClick: () => void;
  onFormSubmit: (e: any) => void;
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
        props =>
          new FormField({
            ...props,
          })
      ),
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          e.stopImmediatePropagation();

          const validationResult = validateForm(this.children.formFields, e);

          props.onFormSubmit(validationResult);
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
