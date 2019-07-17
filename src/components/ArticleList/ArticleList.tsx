import React, { ReactElement } from 'react';
import IBlogEdge from '../../types/IBlogEdge';
import styles from './ArticleList.module.css';
import ArticleListItem from './ArticleListItem';

interface Props {
  articles: IBlogEdge[];
}

const ArticleList: React.FC<Props> = ({ articles }: Props): ReactElement => (
  <ul className={styles.list}>
    {articles.map(({ node }) => (
      <ArticleListItem key={node.frontmatter.slug} article={node} />
    ))}
  </ul>
);

export default ArticleList;
