import Block from '../../core/block';
import { Input } from '../Input';

type FormFieldProfileProps = {
  label: string;
  name: string;
  inputType: string;
  inputValue: string;
  errorMessage?: string;
  isInvalid?: boolean;
  onBlur?: (e: FocusEvent) => void;
};

export default class FormFieldProfile extends Block {
  constructor(props: FormFieldProfileProps) {
    super('div', {
      ...props,
      className: 'form-field',
      label: props.label,
      isInvalid: props.isInvalid,
      errorMessage: props.errorMessage,
      Input: new Input({
        className: 'info-value info-input',
        name: props.name,
        inputType: props.inputType,
        inputValue: props.inputValue,
        onBlur: props.onBlur,
      }),
    });
  }

  public render(): string {
    return `
            <div class="info-row-wrapper">
              <div class="info-row {{#if isInvalid}}error-state{{/if}}">
                <label for="{{ name }}" class="info-label">{{label}}</label>
                {{{ Input }}}
              </div>
              {{#if isInvalid}}
                <div class="error-message text-right">{{errorMessage}}</div>
              {{/if}}
              <div class="action-divider"></div>
            </div>
        `;
  }
}
