import * as React from 'react';
import styles from './H1.module.css';

interface IProps {
  children: React.ReactNode;
}

function H1({ children }: IProps) {
  return <h1 className={styles.h1}>{children}</h1>;
}

export default H1;
