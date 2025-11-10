import { Button } from '../../components';
import { ROUTER } from '../../constants';
import Block from '../../core/block';
import type Router from '../../core/router';
import { withRouter } from '../../utils/withRouter';

type Page404Props = {
  router: Router;
};

class Page404 extends Block {
  constructor(props: Page404Props) {
    super('main', {
      ...props,
      className: 'centring-wrapper',
      HomeButton: new Button({
        type: 'button',
        label: 'На главную',
        onClick: () => props.router.go(ROUTER.login),
      }),
    });
  }

  render(): string {
    return `
        <h1>404</h1>
        {{{ HomeButton }}}
      `;
  }
}

export default withRouter(Page404);
