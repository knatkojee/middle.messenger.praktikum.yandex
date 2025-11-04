import { Button, Modal } from '../../components';
import Block from '../../core/block';

export default class PageWithModal extends Block {
  constructor() {
    super('main', {
      className: 'some-class',
      showModal: true,
      Modal: new Modal({
        ButtonCancel: new Button({
          label: 'asd',
          type: 'button',
        }),
        ButtonOk: new Button({
          label: 'asd',
          type: 'button',
        }),
        labelCancel: false,
        title: 'Загрузите файл',
        body: 'Выбрать файл на компьютере',
      }),
    });
  }

  render(): string {
    return `
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>
            <h1>Sample text</h1>

            {{#if showModal}} 
                {{{ Modal }}}
            {{/if}}
        `;
  }
}
