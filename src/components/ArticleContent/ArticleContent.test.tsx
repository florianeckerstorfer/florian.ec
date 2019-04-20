import React from 'react';
import { shallow } from 'enzyme';
import IBlogPost from '../../types/IBlogPost';
import ArticleContent from './ArticleContent';

const post: IBlogPost = {
  frontmatter: {
    slug: 'foo',
    date: '2019-04-19',
    title: 'Foo',
  },
  html: 'foo bar',
};

test('ArticleContent should render', () => {
  const component = shallow(<ArticleContent post={post} />);

  expect(component.exists()).toBe(true);
  expect(component.hasClass('content')).toBe(true);
  expect(component.prop('dangerouslySetInnerHTML').__html).toBe(post.html);
});
