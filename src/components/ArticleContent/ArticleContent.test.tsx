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

    expect(component.exists()).toBe(true);
    expect(component.hasClass('content')).toBe(true);
    expect(component.prop('dangerouslySetInnerHTML').__html).toBe(post.html);
  });
});
