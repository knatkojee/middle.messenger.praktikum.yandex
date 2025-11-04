import Block from '../../core/block';
import { Input } from '../Input';

type MessageFieldProps = {
  isInvalid?: boolean;
  errorMessage?: string;
  onBlur: (e: FocusEvent) => void;
};

export default class MessageField extends Block {
  constructor(props: MessageFieldProps) {
    super('div', {
      ...props,
      className: 'message-input-wrapper',
      isInvalid: props.isInvalid,
      errorMessage: props.errorMessage,
      Input: new Input({
        inputType: 'text',
        inputValue: '',
        name: 'message',
        className: 'message-input',
        onBlur: props.onBlur,
      }),
    });
  }

  public render(): string {
    return `
            {{{Input}}}
            {{#if isInvalid}}
                <div class="error-message">{{errorMessage}}</div>
            {{/if}}
        `;
  }
}
