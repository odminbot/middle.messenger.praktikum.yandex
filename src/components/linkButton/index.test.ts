import { expect } from 'chai';
import sinon from 'sinon';
import { Link } from './index';
import Router from '../../utils/Router';

describe('LinkButton Component', () => {
  it('should render', () => {
    new Link({ href: '/' });
  });

  it('element should return anchor', () => {
    const link = new Link({ href: '/' });
    const { element } = link;

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it('should go to passed route on click', () => {
    const link = new Link({ href: '/' });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
