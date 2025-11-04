import Block from '../../core/block';
import type { FormFieldType } from '../FormWrapper/FormWrapper';
import { Input } from '../Input';

export default class FormField extends Block {
  constructor(props: FormFieldType) {
    super('div', {
      ...props,
      label: props.label,
      isInvalid: props.isInvalid,
      errorMessage: props.errorMessage,
      Input: new Input({
        name: props.name,
        inputType: props.inputType,
        inputValue: props.inputValue ?? '',
        onBlur: props.onBlur,
      }),
    });
  }

  public render(): string {
    return `
        <div class="form-field {{#if isInvalid}}error-state{{/if}}">
            <label for={{name}} class="field-label">{{label}}</label>
            {{{ Input }}}
            <div class="field-underline"></div>
            {{#if isInvalid}}
                <div class="error-message">{{errorMessage}}</div>
            {{/if}}
        </div>
        `;
  }
}
