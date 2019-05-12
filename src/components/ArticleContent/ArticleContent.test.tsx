import React from 'react';
import { shallow } from 'enzyme';
import IBlogPost from '../../types/IBlogPost';
import ArticleContent from './ArticleContent';

const post: IBlogPost = {
  frontmatter: {
    category: 'FB',
    slug: 'foo',
    date: '2019-04-19',
    title: 'Foo',
  },
  html: 'foo bar',
};

describe('ArticleContent', () => {
  it('should render', () => {
    const component = shallow(<ArticleContent post={post} />);
    const content = component.find('div');

    expect(content.exists()).toBe(true);
    expect((content.prop('dangerouslySetInnerHTML') as any).__html).toBe(
      post.html
    );
  });
});
