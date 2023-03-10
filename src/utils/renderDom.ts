import { Block } from './Block';

export function renderDom(rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('root not found');
  }
  root.innerHTML = '';

  root.append(component.getContent()!);
}
