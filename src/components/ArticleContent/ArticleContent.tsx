import React, { ReactElement } from 'react';

import Content from '../Content/Content';
import IBlogPost from '../../types/IBlogPost';

interface Props {
  post: IBlogPost;
}

const ArticleContent: React.FC<Props> = ({ post }: Props): ReactElement => (
  <Content>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </Content>
);

export default ArticleContent;
