import React from 'react';
import styles from './ArticleDate.module.css';
import dayjs from 'dayjs';

interface Props {
  date: string;
}

const ArticleDate: React.FC<Props> = ({ date }: Props) => (
  <time className={styles.date} dateTime={`${date}`}>
    {dayjs(date).format('MMMM D, YYYY')}
  </time>
);

export default ArticleDate;
