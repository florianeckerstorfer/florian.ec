import React, { ReactElement } from 'react';
import styles from './Content.module.css';

interface Props {
  children: React.ReactNode;
}

const Content: React.FC<Props> = ({ children }: Props): ReactElement => (
  <div className={styles.content}>{children}</div>
);

export default Content;