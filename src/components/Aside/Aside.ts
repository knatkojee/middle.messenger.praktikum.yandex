import Block from '../../core/block';
import { BackButton } from '../BackButton';

type AsideProps = {
  onButtonBackClick: () => void;
};

export default class Aside extends Block {
  constructor(props: AsideProps) {
    super('aside', {
      ...props,
      className: 'sidebar',
      BackButton: new BackButton({
        onClick: props.onButtonBackClick,
      }),
    });
  }

  render(): string {
    return `
           {{{ BackButton }}}
        `;
  }
}
