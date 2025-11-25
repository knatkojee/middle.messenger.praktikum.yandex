import { ROUTER } from '../../constants';
import Block from '../../core/block';
import { withRouter } from '../../utils/withRouter';

class ProfileLink extends Block {
  constructor() {
    super('button', {
      className: 'profile-link',
      events: {
        click: () => window.router.go(ROUTER.profile),
      },
    });
  }

  render(): string {
    return 'Профиль';
  }
}

export default withRouter(ProfileLink);
