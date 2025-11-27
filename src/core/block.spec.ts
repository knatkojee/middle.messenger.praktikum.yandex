import { expect } from 'chai';
import Block from './block';

class TestComponent extends Block {
  render() {
    return '<div class="test">{{title}}</div>';
  }
}

describe('Block Component', () => {
  let component: TestComponent;

  beforeEach(() => {
    component = new TestComponent('div', { title: 'Test Title' });
  });

  it('should create component instance', () => {
    expect(component).to.be.instanceOf(Block);
  });

  it('should have props', () => {
    expect(component.props.title).to.equal('Test Title');
  });

  it('should have unique id', () => {
    const component2 = new TestComponent('div', {});
    expect(component.id).to.not.equal(component2.id);
  });

  it('should update props', () => {
    component.setProps({ title: 'New Title' });
    expect(component.props.title).to.equal('New Title');
  });

  it('should render template', () => {
    const rendered = component.render();
    expect(rendered).to.include('test');
  });

  it('should show and hide element', () => {
    document.body.appendChild(component.getContent()!);
    
    component.hide();
    expect(component.getContent()!.style.display).to.equal('none');
    
    component.show();
    expect(component.getContent()!.style.display).to.equal('block');
  });
});
