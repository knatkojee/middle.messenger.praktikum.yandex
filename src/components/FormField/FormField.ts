import Block from '../../core/block';

export default class FormField extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
      className: 'form-field',
      name: props.name,
      label: props.label,
      inputType: props.inputType,
      inputValue: props.inputValue,
      invalid: props.invalid,
      errorMessage: props.errorMessage,
    });
  }

  public render(): string {
    return `
            <label for={{name}} class="field-label">{{label}}</label>
            <input
                type="{{inputType}}"
                class="field-input  {{#if invalid}}error-state{{/if}}"
                value="{{inputValue}}"
                id="{{name}}"
                name="{{name}}"
                autocomplete="false"
            />
            <div class="field-underline"></div>
            {{#if invalid}}
                <div class="error-message">{{errorMessage}}</div>
            {{/if}}
        `;
  }
}
