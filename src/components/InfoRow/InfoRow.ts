import Block from '../../core/block';

type InfoRowProps = {
  label: string;
  value: string;
};

export default class InfoRow extends Block {
  constructor(props: InfoRowProps) {
    super('div', {
      ...props,
      className: 'info-row-wrapper',
      label: props.label,
      value: props.value,
    });
  }

  render(): string {
    return `
            <div class="info-row">
                <span class="info-label">{{label}}</span>
                <span class="info-value">{{value}}</span>
            </div>
            <div class="action-divider"></div>
        `;
  }
}
