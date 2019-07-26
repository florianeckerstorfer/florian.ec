import IPageContext from '../../types/IPageContext';
import blogNodeFixture from './blogNodeFixture';

const pageContext: IPageContext = {
  previous: blogNodeFixture.blogNode,
  next: blogNodeFixture.blogNode,
};

export default { pageContext };
