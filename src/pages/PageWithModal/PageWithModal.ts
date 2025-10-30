import { Modal } from '../../components';
import Block from '../../core/block';

export default class PageWithModal extends Block {
  constructor() {
    super('main', {
      className: 'some-class',
      showModal: true,
      Modal: new Modal({
        labelOk: 'Давай',
        labelCancel: 'Не',
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
