import { expect } from 'chai';
import Handlebars from 'handlebars';

describe('Handlebars', () => {
  it('should compile simple template', () => {
    const template = Handlebars.compile('<div>{{name}}</div>');
    const result = template({ name: 'Test' });
    expect(result).to.equal('<div>Test</div>');
  });

  it('should handle missing variables', () => {
    const template = Handlebars.compile('<div>{{name}}</div>');
    const result = template({});
    expect(result).to.equal('<div></div>');
  });

  it('should handle conditionals', () => {
    const template = Handlebars.compile('{{#if show}}<div>Visible</div>{{/if}}');
    
    const resultTrue = template({ show: true });
    expect(resultTrue).to.equal('<div>Visible</div>');
    
    const resultFalse = template({ show: false });
    expect(resultFalse).to.equal('');
  });

  it('should handle loops', () => {
    const template = Handlebars.compile('{{#each items}}<li>{{this}}</li>{{/each}}');
    const result = template({ items: ['a', 'b', 'c'] });
    expect(result).to.equal('<li>a</li><li>b</li><li>c</li>');
  });

  it('should handle nested objects', () => {
    const template = Handlebars.compile('<div>{{user.name}}</div>');
    const result = template({ user: { name: 'John' } });
    expect(result).to.equal('<div>John</div>');
  });

  it('should escape HTML by default', () => {
    const template = Handlebars.compile('<div>{{content}}</div>');
    const result = template({ content: '<script>alert("xss")</script>' });
    expect(result).to.include('&lt;script&gt;');
  });

  it('should not escape with triple braces', () => {
    const template = Handlebars.compile('<div>{{{content}}}</div>');
    const result = template({ content: '<span>HTML</span>' });
    expect(result).to.equal('<div><span>HTML</span></div>');
  });
});
