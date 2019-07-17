import React, { ReactElement } from 'react';
import IBlogPost from '../../types/IBlogPost';
import Content from '../Content/Content';

interface Props {
  post: IBlogPost;
}

const ArticleContent: React.FC<Props> = ({ post }: Props): ReactElement => (
  <Content>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Content>
);

export default ArticleContent;
