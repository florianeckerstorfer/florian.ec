import React, { ReactElement } from 'react';

import dayjs from 'dayjs';
import styles from './ArticleDate.module.css';

interface Props {
  date: string;
}

const ArticleDate: React.FC<Props> = ({ date }: Props): ReactElement => (
  <time className={styles.date} dateTime={`${date}`}>
    {dayjs(date).format('MMMM D, YYYY')}
  </time>
);

export default ArticleDate;
