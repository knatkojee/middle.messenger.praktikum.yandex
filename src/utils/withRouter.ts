export function withRouter(WrappedBlock: any) {
  return class extends WrappedBlock {
    constructor(props: any) {
      super({ ...props, router: window.router });
    }
  };
}
