import Block from './block';

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  const content = block.getContent();

  if (content) {
    root!.innerHTML = '';
    root!.appendChild(content);
  }
}

export function render(query: string, block: Block) {
  const root = document.querySelector(query) as Element;

  const content = block.getContent();

  if (content) {
    root.appendChild(content);

    block.dispatchComponentDidMount();
  }

  return root;
}
