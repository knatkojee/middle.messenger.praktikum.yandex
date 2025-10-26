import Block from '../../core/block';

export default class FormFieldProfile extends Block {
  constructor(props: any) {
    super('div', {
      ...props,
      className: 'form-field',
      name: props.name,
      label: props.label,
      inputType: props.inputType,
      inputValue: props.inputValue,
    });
  }

  public render(): string {
    return `
            <div class="info-row-wrapper">
              <div class="info-row">
                <label for="{{ name }}" class="info-label">{{label}}</label>
                <input 
                  autocomplete="false" 
                  type="{{ inputType }}" 
                  name="{{ name }}" 
                  id="{{ name }}" 
                  class="info-value info-input" 
                  value="{{ inputValue }}" 
                />
              </div>
              <div class="action-divider"></div>
            </div>
        `;
  }
}
