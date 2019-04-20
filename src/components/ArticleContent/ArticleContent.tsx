import React from 'react';
import IBlogPost from '../../types/IBlogPost';
import styles from './ArticleContent.module.css';

interface IProps {
  post: IBlogPost;
}

function ArticleContent({ post }: IProps) {
  return (
    <div
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  );
}

export default ArticleContent;
