import Block from '../../core/block';
import type { StoreProps } from '../../core/store';
import { connect } from '../../utils/connect';
import { InputModal } from '../InputModal';
import { OptionsButton } from '../OptionsButton';

export type ChatHeaderProps = {
  title: string;
  pic?: string;
};

class ChatHeader extends Block {
  constructor(props: ChatHeaderProps) {
    super('header', {
      ...props,
      className: 'chat-header',
      title: props.title,
      pic: props.pic,
      OptionsButton: new OptionsButton({}),
    });
  }

  render(): string {
    const InputModalComponent = new InputModal({
      isOpen: (this.props.isModalOpen as boolean) ?? false,
      text: (this.props.modalText as string) ?? '',
      onCancel: () => {
        this.setProps({
          isModalOpen: false,
        });
      },
      onSubmit: this.props.onModalSubmit as () => void,
      selectedChat: this.props.selectedChat as number | undefined,
    });

    this.children.InputModal = InputModalComponent;

    return `
        <div class='active-user-info'>
          <div class='active-user-avatar'></div>
          <h2 class='active-user-name'>{{ title }}</h2>
        </div>
        <div class='header-button-wrapper'>
          {{{ OptionsButton }}}
        </div>

        {{#if isModalOpen}}
          <div data-id="${InputModalComponent.id}">
        {{/if}}
        `;
  }
}

const mapPropsToState = (state: StoreProps) => {
  return {
    isModalOpen: state.inputModal?.isOpen,
    modalText: state.inputModal?.text,
    onModalSubmit: state.inputModal?.onSubmit,
    selectedChat: state.selectedChat,
  };
};

export default connect(mapPropsToState)(ChatHeader);
